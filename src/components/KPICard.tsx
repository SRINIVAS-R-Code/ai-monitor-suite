import { TrendingUp, TrendingDown } from "lucide-react";
import { KPI } from "@/types";

interface KPICardProps extends KPI {
  variant?: "default" | "primary" | "success" | "warning";
}

const KPICard = ({ title, value, trend, icon, variant = "default" }: KPICardProps) => {
  const variantStyles = {
    default: "bg-card border-border",
    primary: "bg-primary/5 border-primary/20",
    success: "bg-success/5 border-success/20",
    warning: "bg-warning/5 border-warning/20",
  };

  return (
    <div className={`
      p-6 rounded-xl border shadow-custom-md transition-smooth
      hover:shadow-custom-lg hover:-translate-y-1
      ${variantStyles[variant]}
    `}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && (
          <div className="p-2 rounded-lg bg-primary/10">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold text-foreground">{value}</h3>
        
        {trend && (
          <div className={`
            flex items-center gap-1 text-sm font-medium
            ${trend.direction === "up" ? "text-success" : "text-destructive"}
          `}>
            {trend.direction === "up" ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;
