import { useMemo, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { format, parseISO, startOfDay, subDays, eachDayOfInterval, isWithinInterval, differenceInDays } from "date-fns";
import { Calendar, Image as ImageIcon, TrendingUp, TrendingDown, Minus, BarChart3 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { toPng } from "html-to-image";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Lead {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  velocity_score: number | null;
  velocity_grade: string | null;
  financial_risk: number | null;
  data_architecture: string | null;
  created_at: string;
}

interface LeadAnalyticsProps {
  leads: Lead[];
}

type DateRange = { from: Date | undefined; to: Date | undefined };

const DATE_PRESETS = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
  { label: "Last year", days: 365 },
];

const GRADE_COLORS: Record<string, string> = {
  A: "hsl(142, 76%, 36%)",
  B: "hsl(199, 89%, 48%)",
  C: "hsl(45, 93%, 47%)",
  D: "hsl(25, 95%, 53%)",
  F: "hsl(0, 84%, 60%)",
};

const ARCHITECTURE_COLORS: Record<string, string> = {
  centralized: "hsl(262, 83%, 58%)",
  decentralized: "hsl(199, 89%, 48%)",
  hybrid: "hsl(142, 76%, 36%)",
};

const RISK_RANGES = [
  { name: "$0-50K", min: 0, max: 50000 },
  { name: "$50K-100K", min: 50000, max: 100000 },
  { name: "$100K-250K", min: 100000, max: 250000 },
  { name: "$250K-500K", min: 250000, max: 500000 },
  { name: "$500K+", min: 500000, max: Infinity },
];

const ComparisonCard = ({ 
  title, 
  current, 
  previous, 
  format: formatFn = (v: number) => v.toString() 
}: { 
  title: string; 
  current: number; 
  previous: number; 
  format?: (v: number) => string;
}) => {
  const change = previous > 0 ? ((current - previous) / previous) * 100 : current > 0 ? 100 : 0;
  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <Card className="bg-card/50 border-border/50">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-foreground">{formatFn(current)}</p>
            <div className="flex items-center gap-1">
              {isNeutral ? (
                <Minus className="h-4 w-4 text-muted-foreground" />
              ) : isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={cn(
                "text-sm font-medium",
                isNeutral ? "text-muted-foreground" : isPositive ? "text-green-500" : "text-red-500"
              )}>
                {isNeutral ? "0%" : `${isPositive ? "+" : ""}${change.toFixed(1)}%`}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Previous: {formatFn(previous)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const LeadAnalytics = ({ leads }: LeadAnalyticsProps) => {
  const analyticsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [showComparison, setShowComparison] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 29),
    to: new Date(),
  });

  // Filter leads by date range
  const filteredLeads = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return leads;
    return leads.filter(lead => {
      const leadDate = parseISO(lead.created_at);
      return isWithinInterval(leadDate, { 
        start: startOfDay(dateRange.from!), 
        end: startOfDay(subDays(dateRange.to!, -1)) 
      });
    });
  }, [leads, dateRange]);

  // Leads over time
  const leadsOverTime = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return [];
    
    const days = eachDayOfInterval({ start: dateRange.from, end: dateRange.to });
    
    const countByDay = new Map<string, number>();
    filteredLeads.forEach(lead => {
      const dayKey = format(startOfDay(parseISO(lead.created_at)), 'yyyy-MM-dd');
      countByDay.set(dayKey, (countByDay.get(dayKey) || 0) + 1);
    });
    
    return days.map(day => {
      const key = format(day, 'yyyy-MM-dd');
      return {
        date: format(day, 'MMM d'),
        leads: countByDay.get(key) || 0,
      };
    });
  }, [filteredLeads, dateRange]);

  // Grade distribution
  const gradeDistribution = useMemo(() => {
    const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, F: 0 };
    filteredLeads.forEach(lead => {
      if (lead.velocity_grade && counts.hasOwnProperty(lead.velocity_grade)) {
        counts[lead.velocity_grade]++;
      }
    });
    return Object.entries(counts)
      .map(([grade, count]) => ({ grade, count, fill: GRADE_COLORS[grade] }))
      .filter(item => item.count > 0);
  }, [filteredLeads]);

  // Architecture distribution
  const architectureDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredLeads.forEach(lead => {
      if (lead.data_architecture) {
        counts[lead.data_architecture] = (counts[lead.data_architecture] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([arch, count]) => ({
      name: arch.charAt(0).toUpperCase() + arch.slice(1),
      value: count,
      fill: ARCHITECTURE_COLORS[arch] || "hsl(var(--muted))",
    }));
  }, [filteredLeads]);

  // Risk breakdown
  const riskBreakdown = useMemo(() => {
    return RISK_RANGES.map(range => {
      const count = filteredLeads.filter(lead => {
        const risk = lead.financial_risk || 0;
        return risk >= range.min && risk < range.max;
      }).length;
      return { name: range.name, count };
    }).filter(item => item.count > 0);
  }, [filteredLeads]);

  // Score distribution (histogram)
  const scoreDistribution = useMemo(() => {
    const ranges = [
      { name: "0-20", min: 0, max: 20 },
      { name: "21-40", min: 21, max: 40 },
      { name: "41-60", min: 41, max: 60 },
      { name: "61-80", min: 61, max: 80 },
      { name: "81-100", min: 81, max: 100 },
    ];
    return ranges.map(range => ({
      range: range.name,
      count: filteredLeads.filter(lead => {
        const score = lead.velocity_score || 0;
        return score >= range.min && score <= range.max;
      }).length,
    }));
  }, [filteredLeads]);

  // Previous period data for comparison
  const previousPeriodLeads = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return [];
    const periodDays = differenceInDays(dateRange.to, dateRange.from) + 1;
    const previousStart = subDays(dateRange.from, periodDays);
    const previousEnd = subDays(dateRange.from, 1);
    
    return leads.filter(lead => {
      const leadDate = parseISO(lead.created_at);
      return isWithinInterval(leadDate, { 
        start: startOfDay(previousStart), 
        end: startOfDay(subDays(previousEnd, -1)) 
      });
    });
  }, [leads, dateRange]);

  // Comparison metrics
  const comparisonMetrics = useMemo(() => {
    const currentLeadCount = filteredLeads.length;
    const previousLeadCount = previousPeriodLeads.length;

    const currentAvgScore = filteredLeads.length > 0 
      ? filteredLeads.reduce((sum, l) => sum + (l.velocity_score || 0), 0) / filteredLeads.length
      : 0;
    const previousAvgScore = previousPeriodLeads.length > 0 
      ? previousPeriodLeads.reduce((sum, l) => sum + (l.velocity_score || 0), 0) / previousPeriodLeads.length
      : 0;

    const currentTotalRisk = filteredLeads.reduce((sum, l) => sum + (l.financial_risk || 0), 0);
    const previousTotalRisk = previousPeriodLeads.reduce((sum, l) => sum + (l.financial_risk || 0), 0);

    const currentHighGrade = filteredLeads.filter(l => l.velocity_grade === 'A' || l.velocity_grade === 'B').length;
    const previousHighGrade = previousPeriodLeads.filter(l => l.velocity_grade === 'A' || l.velocity_grade === 'B').length;

    return {
      leadCount: { current: currentLeadCount, previous: previousLeadCount },
      avgScore: { current: Math.round(currentAvgScore), previous: Math.round(previousAvgScore) },
      totalRisk: { current: currentTotalRisk, previous: previousTotalRisk },
      highGradeCount: { current: currentHighGrade, previous: previousHighGrade },
    };
  }, [filteredLeads, previousPeriodLeads]);

  const handlePresetClick = (days: number) => {
    setDateRange({
      from: subDays(new Date(), days - 1),
      to: new Date(),
    });
  };

  const handleExportImage = async () => {
    if (!analyticsRef.current) return;
    
    setIsExporting(true);
    try {
      const dataUrl = await toPng(analyticsRef.current, {
        backgroundColor: '#1a1a2e',
        quality: 1,
        pixelRatio: 2,
      });
      
      const link = document.createElement('a');
      link.download = `lead-analytics-${format(new Date(), 'yyyy-MM-dd')}.png`;
      link.href = dataUrl;
      link.click();
      
      toast({
        title: "Export Complete",
        description: "Analytics report saved as PNG image",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const dateRangeLabel = dateRange.from && dateRange.to
    ? `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`
    : "Select date range";

  if (leads.length === 0) {
    return (
      <Card className="bg-card/50 border-border/50 mb-6">
        <CardContent className="py-12 text-center text-muted-foreground">
          No data available for analytics
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mb-6">
      {/* Controls */}
      <Card className="bg-card/50 border-border/50 mb-6">
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateRangeLabel}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                  <div className="p-3 border-b border-border">
                    <div className="flex flex-wrap gap-2">
                      {DATE_PRESETS.map(preset => (
                        <Button
                          key={preset.days}
                          variant="outline"
                          size="sm"
                          onClick={() => handlePresetClick(preset.days)}
                        >
                          {preset.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                    numberOfMonths={2}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <span className="text-sm text-muted-foreground">
                {filteredLeads.length} leads in range
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="comparison-mode"
                  checked={showComparison}
                  onCheckedChange={setShowComparison}
                />
                <Label htmlFor="comparison-mode" className="text-sm">
                  Compare to previous period
                </Label>
              </div>
              <Button 
                variant="outline" 
                onClick={handleExportImage}
                disabled={isExporting}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                {isExporting ? "Exporting..." : "Export as Image"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Cards */}
      {showComparison && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <ComparisonCard
            title="Total Leads"
            current={comparisonMetrics.leadCount.current}
            previous={comparisonMetrics.leadCount.previous}
          />
          <ComparisonCard
            title="Avg. Score"
            current={comparisonMetrics.avgScore.current}
            previous={comparisonMetrics.avgScore.previous}
          />
          <ComparisonCard
            title="Total Risk"
            current={comparisonMetrics.totalRisk.current}
            previous={comparisonMetrics.totalRisk.previous}
            format={(v) => `$${(v / 1000).toFixed(0)}K`}
          />
          <ComparisonCard
            title="High Grade (A/B)"
            current={comparisonMetrics.highGradeCount.current}
            previous={comparisonMetrics.highGradeCount.previous}
          />
        </div>
      )}

      {/* Charts Grid */}
      <div ref={analyticsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-1">
        {/* Leads Over Time */}
        <Card className="bg-card/50 border-border/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Leads Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={leadsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    allowDecimals={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="leads" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 3 }}
                    activeDot={{ r: 5, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="grade" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    allowDecimals={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Architecture Distribution */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Data Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={architectureDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {architectureDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Risk Breakdown */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Financial Risk Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskBreakdown} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    type="number"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    allowDecimals={false}
                  />
                  <YAxis 
                    type="category"
                    dataKey="name" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    width={80}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--destructive))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Score Distribution */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="range" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    allowDecimals={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeadAnalytics;
