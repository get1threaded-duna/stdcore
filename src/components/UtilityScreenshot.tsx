import { motion } from "framer-motion";
import { 
  FileCheck, 
  GitMerge, 
  Shield, 
  CheckCircle2, 
  AlertCircle,
  Upload,
  Download,
  Clock,
  Zap
} from "lucide-react";

const UtilityScreenshot = () => {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border/40 bg-card/80 backdrop-blur-sm">
      {/* Window Chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-secondary/30">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-error/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-success/60" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs font-mono text-muted-foreground">StandardCore Utility — Bridge Engine v4.0</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Top Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {[
            { label: "Documents Processed", value: "12,847", icon: FileCheck, color: "text-primary" },
            { label: "OIDs Validated", value: "1,234", icon: Shield, color: "text-success" },
            { label: "Migration Progress", value: "94%", icon: GitMerge, color: "text-primary" },
            { label: "Time Elapsed", value: "2h 14m", icon: Clock, color: "text-muted-foreground" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="p-3 rounded-lg bg-secondary/30 border border-border/30"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Processing Pipeline Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {/* Input Panel */}
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <div className="flex items-center gap-2 mb-3">
              <Upload className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Legacy Sources</span>
            </div>
            <div className="space-y-2">
              {[
                { name: "m1/us/cover.pdf", status: "complete" },
                { name: "m2/23-overview.xml", status: "complete" },
                { name: "m3/32-p-body.pdf", status: "processing" },
                { name: "m4/clinical-summary.pdf", status: "pending" },
              ].map((file, i) => (
                <div key={i} className="flex items-center justify-between text-xs p-2 rounded bg-secondary/30">
                  <span className="font-mono text-muted-foreground truncate">{file.name}</span>
                  {file.status === "complete" && <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />}
                  {file.status === "processing" && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    </motion.div>
                  )}
                  {file.status === "pending" && <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* Validation Engine */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Validation Gate</span>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="text-xs font-medium text-success">OID Match Found</span>
                </div>
                <div className="text-xs font-mono text-muted-foreground">
                  2.16.840.1.113883.3.989
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 text-xs">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-success"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-muted-foreground">Zero-Hallucination Active</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded bg-secondary/30">
                  <div className="text-lg font-bold text-success">1,500+</div>
                  <div className="text-xs text-muted-foreground">OID Matrix</div>
                </div>
                <div className="p-2 rounded bg-secondary/30">
                  <div className="text-lg font-bold text-primary">100%</div>
                  <div className="text-xs text-muted-foreground">Binary Match</div>
                </div>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="p-4 rounded-lg bg-success/5 border border-success/20">
            <div className="flex items-center gap-2 mb-3">
              <Download className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-foreground">v4.0 Output</span>
            </div>
            <div className="space-y-2">
              {[
                { name: "ectd-message-v4.xml", status: "ready" },
                { name: "lifecycle-graph.json", status: "ready" },
                { name: "audit-manifest.sig", status: "ready" },
              ].map((file, i) => (
                <div key={i} className="flex items-center justify-between text-xs p-2 rounded bg-secondary/30">
                  <span className="font-mono text-muted-foreground truncate">{file.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-success/10 border border-success/30 text-center">
              <span className="text-xs font-medium text-success">ESG NextGen Ready</span>
            </div>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0 p-3 rounded-lg bg-secondary/20 border border-border/30">
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground">21 CFR Part 11</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">VPC Isolated</span>
            </div>
          </div>
          <span className="text-xs font-mono text-muted-foreground">Last sync: 2s ago</span>
        </div>
      </div>
    </div>
  );
};

export default UtilityScreenshot;
