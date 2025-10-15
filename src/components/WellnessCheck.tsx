import { useState } from "react";
import { Heart, Thermometer, Eye, Brain, Smile, Frown, Meh, Activity } from "lucide-react";

interface WellnessCheckProps {
  className?: string;
}

interface WellnessMetric {
  id: string;
  label: string;
  value: number;
  max: number;
  icon: React.ReactNode;
  color: string;
  status: "good" | "moderate" | "poor";
}

const WellnessCheck = ({ className = "" }: WellnessCheckProps) => {
  const [currentMood, setCurrentMood] = useState<"happy" | "neutral" | "tired">("neutral");

  const wellnessMetrics: WellnessMetric[] = [
    {
      id: "energy",
      label: "Energy Level",
      value: 75,
      max: 100,
      icon: <Activity className="h-4 w-4" />,
      color: "text-success",
      status: "good"
    },
    {
      id: "focus",
      label: "Focus",
      value: 82,
      max: 100,
      icon: <Brain className="h-4 w-4" />,
      color: "text-primary",
      status: "good"
    },
    {
      id: "stress",
      label: "Stress Level",
      value: 35,
      max: 100,
      icon: <Heart className="h-4 w-4" />,
      color: "text-warning",
      status: "moderate"
    },
    {
      id: "sleep",
      label: "Sleep Quality",
      value: 68,
      max: 100,
      icon: <Eye className="h-4 w-4" />,
      color: "text-primary",
      status: "good"
    }
  ];

  const moodOptions = [
    { value: "happy", icon: <Smile className="h-5 w-5" />, label: "Happy" },
    { value: "neutral", icon: <Meh className="h-5 w-5" />, label: "Neutral" },
    { value: "tired", icon: <Frown className="h-5 w-5" />, label: "Tired" }
  ];

  const getOverallWellness = () => {
    const avg = wellnessMetrics.reduce((sum, metric) => sum + metric.value, 0) / wellnessMetrics.length;
    if (avg >= 75) return { status: "Excellent", color: "text-success" };
    if (avg >= 60) return { status: "Good", color: "text-primary" };
    if (avg >= 40) return { status: "Moderate", color: "text-warning" };
    return { status: "Needs Attention", color: "text-destructive" };
  };

  const overall = getOverallWellness();

  return (
    <div className={`bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border border-pink-200 dark:border-pink-800 rounded-xl p-6 shadow-lg ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20">
          <Heart className="h-6 w-6 text-pink-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Wellness Hub</h3>
          <p className="text-sm text-muted-foreground">Monitor your physical and mental well-being</p>
        </div>
      </div>

      {/* Overall Status */}
      <div className="mb-6 p-4 bg-gradient-to-r from-pink-100/50 to-purple-100/50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl border border-pink-200/50 dark:border-pink-800/50">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Overall Wellness Score</span>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${overall.color === 'text-success' ? 'bg-green-500' : overall.color === 'text-primary' ? 'bg-blue-500' : overall.color === 'text-warning' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            <span className={`text-lg font-bold ${overall.color}`}>{overall.status}</span>
          </div>
        </div>
      </div>

      {/* Mood Selection */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Brain className="h-4 w-4 text-purple-500" />
          Current Mood
        </p>
        <div className="grid grid-cols-3 gap-2">
          {moodOptions.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setCurrentMood(mood.value as any)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                currentMood === mood.value
                  ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white border-pink-500 shadow-lg transform scale-105'
                  : 'bg-white/50 dark:bg-gray-800/50 text-muted-foreground border-pink-200 dark:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:border-pink-300'
              }`}
            >
              <div className={currentMood === mood.value ? 'text-white' : 'text-pink-500'}>
                {mood.icon}
              </div>
              <span className="text-xs font-medium">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Wellness Metrics */}
      <div className="space-y-4">
        {wellnessMetrics.map((metric) => (
          <div key={metric.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  metric.status === "good" ? "bg-green-100 dark:bg-green-900/20" :
                  metric.status === "moderate" ? "bg-yellow-100 dark:bg-yellow-900/20" : "bg-red-100 dark:bg-red-900/20"
                }`}>
                  <span className={metric.color}>{metric.icon}</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{metric.label}</span>
              </div>
              <div className="text-right">
                <span className={`text-lg font-bold ${metric.color}`}>{metric.value}%</span>
                <div className={`text-xs ${
                  metric.status === "good" ? "text-green-600" :
                  metric.status === "moderate" ? "text-yellow-600" : "text-red-600"
                }`}>
                  {metric.status === "good" ? "Excellent" : metric.status === "moderate" ? "Good" : "Needs Work"}
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  metric.status === "good" ? "bg-gradient-to-r from-green-400 to-green-500" :
                  metric.status === "moderate" ? "bg-gradient-to-r from-yellow-400 to-yellow-500" : "bg-gradient-to-r from-red-400 to-red-500"
                }`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-pink-200 dark:border-pink-800">
        <div className="grid grid-cols-2 gap-3">
          <button className="px-4 py-3 text-sm bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Log Wellness
          </button>
          <button className="px-4 py-3 text-sm border-2 border-pink-200 dark:border-pink-700 text-pink-600 dark:text-pink-400 rounded-xl hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-200 font-medium">
            View History
          </button>
        </div>
      </div>
    </div>
  );
};

export default WellnessCheck;