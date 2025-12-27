interface FactCardProps {
  title: string;
  text: string;
  index: number;
}

const FactCard = ({ title, text, index }: FactCardProps) => {
  return (
    <div
      className="p-6 border border-border/40 rounded-lg bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300 opacity-0 animate-slide-up"
      style={{ animationDelay: `${index * 100 + 200}ms`, animationFillMode: 'forwards' }}
    >
      <h3 className="text-xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default FactCard;
