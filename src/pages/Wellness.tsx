import { useState, useEffect } from "react";
import { Heart, Brain, Activity, Thermometer, Smile, Meh, Frown, TrendingUp, Calendar, Clock, Target, Zap } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const Wellness = ({ onLogout, onNavigate }: { onLogout: () => void; onNavigate?: (page: string) => void }) => {
  const [mood, setMood] = useState<"happy" | "neutral" | "tired">("happy");
  const [energy, setEnergy] = useState(85);
  const [stress, setStress] = useState(20);
  const [focus, setFocus] = useState(78);
  const [sleep, setSleep] = useState(92);
  const [lastCheck, setLastCheck] = useState("");

  useEffect(() => {
    const now = new Date();
    setLastCheck(now.toLocaleString());
  }, []);

  const moodOptions = [
    { value: "happy", icon: <Smile className="h-6 w-6" />, label: "Happy", emoji: "😊" },
    { value: "neutral", icon: <Meh className="h-6 w-6" />, label: "Neutral", emoji: "😐" },
    { value: "tired", icon: <Frown className="h-6 w-6" />, label: "Tired", emoji: "😔" }
  ];

  const getAISuggestion = () => {
    if (energy < 50) return "You seem a bit low on energy today. Take a short walk or stretch break.";
    if (stress > 60) return "High stress detected! Try a few minutes of deep breathing or meditation.";
    if (focus < 60) return "Focus levels are low. Consider taking a short break or getting some fresh air.";
    if (sleep < 70) return "Your sleep quality could be better. Aim for 7-8 hours of quality sleep tonight.";
    return "You're doing great today! Keep up your healthy routine.";
  };

  const getOverallWellness = () => {
    const avg = (energy + (100 - stress) + focus + sleep) / 4;
    if (avg >= 85) return { status: "Excellent", color: "text-green-500", bg: "bg-green-50 dark:bg-green-950/20" };
    if (avg >= 70) return { status: "Good", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" };
    if (avg >= 55) return { status: "Fair", color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/20" };
    return { status: "Needs Attention", color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20" };
  };

  const overall = getOverallWellness();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="user" activePage="wellness" onNavigate={onNavigate} />

      <div className="flex-1">
        <Navbar userName="Srinivas" onLogout={onLogout} />

        <main className="p-6 space-y-6">
          {/* Search Bar */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-4">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search wellness tips, mood logs..."
                className="flex-1 px-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium">
                Search
              </button>
            </div>
          </div>

          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl p-6 border border-pink-500/20">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-pink-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Employee Wellness Center</h1>
                <p className="text-muted-foreground">Monitor and improve your physical and mental well-being</p>
              </div>
            </div>
          </div>

          {/* Overall Wellness Score */}
          <div className={`p-6 rounded-xl border ${overall.bg} border-pink-200 dark:border-pink-800`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Overall Wellness Score</h2>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${overall.color === 'text-green-500' ? 'bg-green-500' : overall.color === 'text-blue-500' ? 'bg-blue-500' : overall.color === 'text-yellow-500' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                <span className={`text-2xl font-bold ${overall.color}`}>{overall.status}</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${
                  overall.status === "Excellent" ? "bg-gradient-to-r from-green-400 to-green-500" :
                  overall.status === "Good" ? "bg-gradient-to-r from-blue-400 to-blue-500" :
                  overall.status === "Fair" ? "bg-gradient-to-r from-yellow-400 to-yellow-500" : "bg-gradient-to-r from-red-400 to-red-500"
                }`}
                style={{ width: `${(energy + (100 - stress) + focus + sleep) / 4}%` }}
              />
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-pink-500/10">
                  <Brain className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Mood</p>
                  <p className="text-2xl font-bold text-foreground">
                    {moodOptions.find(m => m.value === mood)?.emoji}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground capitalize">{mood}</p>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-green-500/10">
                  <Zap className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Energy Level</p>
                  <p className="text-2xl font-bold text-foreground">{energy}%</p>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${energy}%` }} />
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-red-500/10">
                  <Activity className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Stress Level</p>
                  <p className="text-2xl font-bold text-foreground">{stress}%</p>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full transition-all" style={{ width: `${stress}%` }} />
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <Target className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Focus Level</p>
                  <p className="text-2xl font-bold text-foreground">{focus}%</p>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${focus}%` }} />
              </div>
            </div>
          </div>

          {/* AI Wellness Suggestion */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-purple-500/10">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
              <h2 className="text-xl font-bold text-foreground">AI Wellness Insights</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {getAISuggestion()}
            </p>
          </div>

          {/* Quick Mood Check */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-yellow-500/10">
                <Smile className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Quick Mood Check</h2>
                <p className="text-sm text-muted-foreground">How are you feeling right now?</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {moodOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setMood(option.value as any)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                    mood === option.value
                      ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white border-pink-500 shadow-lg transform scale-105'
                      : 'bg-muted/50 text-muted-foreground border-border hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:border-pink-300'
                  }`}
                >
                  <div className={mood === option.value ? 'text-white' : 'text-pink-500'}>
                    {option.icon}
                  </div>
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Wellness Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Wellness Activities</h3>
              <div className="space-y-3">
                <button className="w-full p-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all font-medium">
                  🧘‍♀️ Start Meditation (5 min)
                </button>
                <button className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-medium">
                  🚶‍♂️ Take a Walk Break
                </button>
                <button className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium">
                  💧 Drink Water Reminder
                </button>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Wellness Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Last Checked
                  </span>
                  <span className="font-medium">{lastCheck}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-500" />
                    Energy Level
                  </span>
                  <span className="font-medium">{energy}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-red-500" />
                    Stress Level
                  </span>
                  <span className="font-medium">{stress}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    Focus Level
                  </span>
                  <span className="font-medium">{focus}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-purple-500" />
                    Sleep Quality
                  </span>
                  <span className="font-medium">{sleep}%</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Wellness;