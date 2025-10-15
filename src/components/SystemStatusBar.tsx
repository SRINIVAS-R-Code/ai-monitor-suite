import { Wifi, WifiOff, Server, AlertTriangle, CheckCircle, Activity } from "lucide-react";

interface SystemStatusBarProps {
  className?: string;
}

const SystemStatusBar = ({ className = "" }: SystemStatusBarProps) => {
  const systemMetrics = [
    {
      label: "AI Engine",
      status: "active",
      value: "98.5%",
      icon: <Activity className="h-4 w-4" />
    },
    {
      label: "Camera Network",
      status: "active",
      value: "12/12 online",
      icon: <Wifi className="h-4 w-4" />
    },
    {
      label: "Database",
      status: "active",
      value: "Connected",
      icon: <Server className="h-4 w-4" />
    },
    {
      label: "Face Recognition",
      status: "warning",
      value: "94.2%",
      icon: <AlertTriangle className="h-4 w-4" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-success";
      case "warning":
        return "text-warning";
      case "error":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/10";
      case "warning":
        return "bg-warning/10";
      case "error":
        return "bg-destructive/10";
      default:
        return "bg-muted/50";
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">System Status</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs text-muted-foreground">All systems operational</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {systemMetrics.map((metric, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border ${getStatusBg(metric.status)} border-border/50`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={getStatusColor(metric.status)}>
                {metric.icon}
              </span>
              <span className="text-xs font-medium text-foreground">{metric.label}</span>
            </div>
            <p className={`text-sm font-semibold ${getStatusColor(metric.status)}`}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-border/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <span>Response time: 45ms</span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusBar;