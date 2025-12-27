import { motion } from "framer-motion";

interface FactCardProps {
  title: string;
  text: string;
  index: number;
}

const FactCard = ({ title, text }: FactCardProps) => {
  return (
    <motion.div
      className="p-6 border border-border/40 rounded-lg bg-card/30 backdrop-blur-sm transition-colors duration-300 h-full"
      whileHover={{ 
        borderColor: "hsl(var(--primary) / 0.3)",
        y: -4,
      }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
};

export default FactCard;
