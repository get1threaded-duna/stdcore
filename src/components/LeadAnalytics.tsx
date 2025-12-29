import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";
import { format, parseISO, startOfDay, subDays, eachDayOfInterval } from "date-fns";

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

const LeadAnalytics = ({ leads }: LeadAnalyticsProps) => {
  // Leads over time (last 30 days)
  const leadsOverTime = useMemo(() => {
    const today = startOfDay(new Date());
    const thirtyDaysAgo = subDays(today, 29);
    
    const days = eachDayOfInterval({ start: thirtyDaysAgo, end: today });
    
    const countByDay = new Map<string, number>();
    leads.forEach(lead => {
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
  }, [leads]);

  // Grade distribution
  const gradeDistribution = useMemo(() => {
    const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, F: 0 };
    leads.forEach(lead => {
      if (lead.velocity_grade && counts.hasOwnProperty(lead.velocity_grade)) {
        counts[lead.velocity_grade]++;
      }
    });
    return Object.entries(counts)
      .map(([grade, count]) => ({ grade, count, fill: GRADE_COLORS[grade] }))
      .filter(item => item.count > 0);
  }, [leads]);

  // Architecture distribution
  const architectureDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach(lead => {
      if (lead.data_architecture) {
        counts[lead.data_architecture] = (counts[lead.data_architecture] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([arch, count]) => ({
      name: arch.charAt(0).toUpperCase() + arch.slice(1),
      value: count,
      fill: ARCHITECTURE_COLORS[arch] || "hsl(var(--muted))",
    }));
  }, [leads]);

  // Risk breakdown
  const riskBreakdown = useMemo(() => {
    return RISK_RANGES.map(range => {
      const count = leads.filter(lead => {
        const risk = lead.financial_risk || 0;
        return risk >= range.min && risk < range.max;
      }).length;
      return { name: range.name, count };
    }).filter(item => item.count > 0);
  }, [leads]);

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
      count: leads.filter(lead => {
        const score = lead.velocity_score || 0;
        return score >= range.min && score <= range.max;
      }).length,
    }));
  }, [leads]);

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Leads Over Time */}
      <Card className="bg-card/50 border-border/50 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Leads Over Time (Last 30 Days)</CardTitle>
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
  );
};

export default LeadAnalytics;
