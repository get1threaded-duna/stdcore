import { motion } from "framer-motion";
import { FileWarning, ArrowRight, CheckCircle2, Database } from "lucide-react";

const CaseStudyFlowchart = () => {
  return (
    <motion.div 
      className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, staggerChildren: 0.2 }}
    >
      {/* Node 1: Messy Legacy Files */}
      <motion.div 
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.div 
          className="w-20 h-20 rounded-xl bg-error/10 border border-error/30 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <FileWarning className="w-9 h-9 text-error" />
        </motion.div>
        <div className="text-center">
          <span className="text-sm font-medium text-foreground block">Messy Legacy</span>
          <span className="text-xs text-muted-foreground">v3.2 Files</span>
        </div>
      </motion.div>

      {/* Arrow 1 */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowRight className="w-8 h-8 text-muted-foreground rotate-90 md:rotate-0" />
        </motion.div>
      </motion.div>

      {/* Node 2: StandardCore Bridge */}
      <motion.div 
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div 
          className="w-24 h-20 rounded-xl bg-primary/10 border border-primary/40 flex items-center justify-center relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
        >
          <Database className="w-9 h-9 text-primary relative z-10" />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        <div className="text-center">
          <span className="text-sm font-medium text-primary block">StandardCore</span>
          <span className="text-xs text-muted-foreground">Bridge Engine</span>
        </div>
      </motion.div>

      {/* Arrow 2 */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          <ArrowRight className="w-8 h-8 text-muted-foreground rotate-90 md:rotate-0" />
        </motion.div>
      </motion.div>

      {/* Node 3: Validated XML */}
      <motion.div 
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.div 
          className="w-20 h-20 rounded-xl bg-success/10 border border-success/30 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <CheckCircle2 className="w-9 h-9 text-success" />
        </motion.div>
        <div className="text-center">
          <span className="text-sm font-medium text-foreground block">Validated XML</span>
          <span className="text-xs text-muted-foreground">v4.0 Native</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CaseStudyFlowchart;
