import { Brain, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { AIInsight } from "@/types";

const AIInsights = () => {
  const insights: AIInsight[] = [
    {
      id: 1,
      type: "success",
      message: "Attendance rate improved by 5% this week compared to last week",
      timestamp: "2 hours ago",
      confidence: 95,
    },
    {
      id: 2,
      type: "info",
      message: "Detected unusual pattern: 3 employees consistently arrive 15 mins early",
      timestamp: "5 hours ago",
      confidence: 87,
    },
    {
      id: 3,
      type: "warning",
      message: "Camera #2 accuracy dropped to 94%. Consider recalibration",
      timestamp: "1 day ago",
      confidence: 92,
    },
  ];

  const getInsightIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-warning" />;
      default:
        return <TrendingUp className="h-5 w-5 text-primary" />;
    }
  };

  const getInsightStyle = (type: AIInsight["type"]) => {
    switch (type) {
      case "success":
        return "bg-success/5 border-success/20";
      case "warning":
        return "bg-warning/5 border-warning/20";
      default:
        return "bg-primary/5 border-primary/20";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="p-3 rounded-xl bg-primary/10">
          <Brain className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">AI Insights</h2>
          <p className="text-sm text-muted-foreground">
            Real-time intelligence from your attendance data
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`
              p-5 rounded-xl border shadow-custom-sm transition-smooth
              hover:shadow-custom-md
              ${getInsightStyle(insight.type)}
            `}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{getInsightIcon(insight.type)}</div>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-2">
                  {insight.message}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{insight.timestamp}</span>
                  {insight.confidence && (
                    <>
                      <span>•</span>
                      <span className="font-medium">
                        {insight.confidence}% confidence
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
        <p className="text-sm text-muted-foreground text-center">
          AI model last updated: 2 hours ago • Processing 1.2M+ data points
        </p>
      </div>
    </div>
  );
};

export default AIInsights;
