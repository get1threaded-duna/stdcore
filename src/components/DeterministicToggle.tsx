import { useState } from "react";
import { AlertTriangle, CheckCircle, Zap, Bot } from "lucide-react";

const DeterministicToggle = () => {
  const [isValidated, setIsValidated] = useState(true);

  return (
    <div className="w-full max-w-lg mx-auto opacity-0 animate-slide-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
      <div className="border-animated rounded-xl p-6 bg-card/80 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Validation Engine
          </span>
          {/* Toggle Switch */}
          <button
            onClick={() => setIsValidated(!isValidated)}
            className="relative w-48 h-10 rounded-lg bg-secondary/50 border border-border/50 overflow-hidden transition-all duration-300 hover:border-border"
          >
            <div
              className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-md transition-all duration-300 ${
                isValidated
                  ? "left-1 bg-success glow-success"
                  : "left-[calc(50%+2px)] bg-error glow-error"
              }`}
            />
            <div className="relative flex h-full">
              <span
                className={`flex-1 flex items-center justify-center text-xs font-medium transition-colors duration-300 ${
                  isValidated ? "text-success-foreground" : "text-muted-foreground"
                }`}
              >
                Deterministic
              </span>
              <span
                className={`flex-1 flex items-center justify-center text-xs font-medium transition-colors duration-300 ${
                  !isValidated ? "text-error-foreground" : "text-muted-foreground"
                }`}
              >
                Probabilistic
              </span>
            </div>
          </button>
        </div>

        {/* Visualization */}
        <div className="relative h-32 flex items-center justify-between px-4">
          {/* Left Node */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                isValidated
                  ? "bg-success/20 border border-success/40"
                  : "bg-error/20 border border-error/40"
              }`}
            >
              {isValidated ? (
                <Zap className="w-6 h-6 text-success" />
              ) : (
                <Bot className="w-6 h-6 text-error" />
              )}
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {isValidated ? "StandardCore" : "AI Wrapper"}
            </span>
          </div>

          {/* Path SVG */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 120"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Validated Path */}
            <path
              d={isValidated 
                ? "M 70 60 Q 200 20, 330 60" 
                : "M 70 60 Q 200 100, 330 60"
              }
              stroke={isValidated ? "hsl(var(--success))" : "hsl(var(--error))"}
              strokeWidth="2"
              strokeDasharray="8 4"
              className="transition-all duration-500"
              style={{
                filter: isValidated
                  ? "drop-shadow(0 0 8px hsl(var(--success) / 0.5))"
                  : "drop-shadow(0 0 8px hsl(var(--error) / 0.5))",
              }}
            />
            {/* Moving dot */}
            <circle
              r="4"
              fill={isValidated ? "hsl(var(--success))" : "hsl(var(--error))"}
              className="animate-pulse-glow"
            >
              <animateMotion
                dur="2s"
                repeatCount="indefinite"
                path={isValidated 
                  ? "M 70 60 Q 200 20, 330 60" 
                  : "M 70 60 Q 200 100, 330 60"
                }
              />
            </circle>
          </svg>

          {/* Right Node */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                isValidated
                  ? "bg-success/20 border border-success/40"
                  : "bg-error/20 border border-error/40"
              }`}
            >
              {isValidated ? (
                <CheckCircle className="w-6 h-6 text-success" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-error" />
              )}
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {isValidated ? "Validated" : "Unverified"}
            </span>
          </div>
        </div>

        {/* Status Message */}
        <div
          className={`mt-4 p-3 rounded-lg text-center text-sm transition-all duration-300 ${
            isValidated
              ? "bg-success/10 text-success border border-success/20"
              : "bg-error/10 text-error border border-error/20"
          }`}
        >
          {isValidated ? (
            <span className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              100% Traceability • Zero-Hallucination Mapping
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Non-deterministic outputs • Audit risk
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeterministicToggle;
