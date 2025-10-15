import { useState } from "react";
import { BarChart3, TrendingUp, Users, Clock, Target, PieChart, LineChart, BarChart, Activity, Calendar, Download } from "lucide-react";
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, BarChart as ReBarChart, Bar, Legend, AreaChart, Area } from 'recharts';
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

// Sample data for analytics
const monthlyAttendanceData = [
  { month: 'Jan', present: 22, late: 2, absent: 1 },
  { month: 'Feb', present: 20, late: 3, absent: 2 },
  { month: 'Mar', present: 23, late: 1, absent: 1 },
  { month: 'Apr', present: 21, late: 2, absent: 2 },
  { month: 'May', present: 24, late: 1, absent: 0 },
  { month: 'Jun', present: 22, late: 2, absent: 1 },
];

const productivityData = [
  { month: 'Jan', productivity: 85, efficiency: 78 },
  { month: 'Feb', productivity: 88, efficiency: 82 },
  { month: 'Mar', productivity: 92, efficiency: 85 },
  { month: 'Apr', productivity: 89, efficiency: 83 },
  { month: 'May', productivity: 94, efficiency: 87 },
  { month: 'Jun', productivity: 91, efficiency: 86 },
];

const departmentData = [
  { name: 'Engineering', value: 35, color: '#6366f1' },
  { name: 'Marketing', value: 25, color: '#10b981' },
  { name: 'Sales', value: 20, color: '#f59e0b' },
  { name: 'HR', value: 12, color: '#ef4444' },
  { name: 'Finance', value: 8, color: '#8b5cf6' },
];

const weeklyTrendData = [
  { day: 'Mon', hours: 8.2, tasks: 12 },
  { day: 'Tue', hours: 8.5, tasks: 15 },
  { day: 'Wed', hours: 7.8, tasks: 11 },
  { day: 'Thu', hours: 8.7, tasks: 16 },
  { day: 'Fri', hours: 8.1, tasks: 13 },
];

const Analytics = ({ onLogout, onNavigate, isDarkMode, toggleTheme }: { onLogout: () => void; onNavigate?: (page: string) => void; isDarkMode?: boolean; toggleTheme?: () => void }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="user" activePage="analytics" onNavigate={onNavigate} userName="Srinivas" />

      <div className="flex-1">
        <Navbar userName="Srinivas" onLogout={onLogout} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onNavigate={onNavigate} />

        <main className="p-6 space-y-6">
          {/* Analytics Header */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Advanced Analytics</h1>
                  <p className="text-muted-foreground">Deep insights into attendance patterns, productivity, and team performance</p>
                </div>
              </div>
              <div className="flex gap-3">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as any)}
                  className="px-4 py-2 rounded-lg border border-border bg-card text-foreground"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Report
                </button>
              </div>
            </div>
          </div>

          {/* Search & Key Metrics Cards */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-6">
              <input
                type="text"
                placeholder="Search analytics, reports..."
                className="flex-1 px-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Search
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-green-500/10">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Attendance Rate</p>
                  <p className="text-2xl font-bold text-foreground">94.2%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-500">+2.1% from last month</span>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <Activity className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Productivity</p>
                  <p className="text-2xl font-bold text-foreground">89.5%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-blue-500">+3.2% from last month</span>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Team Size</p>
                  <p className="text-2xl font-bold text-foreground">127</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-purple-500">+5 new members</span>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-orange-500/10">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Hours/Day</p>
                  <p className="text-2xl font-bold text-foreground">8.3h</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-orange-500">+0.2h from last month</span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Attendance Trends */}
            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <LineChart className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Monthly Attendance Trends</h2>
                  <p className="text-sm text-muted-foreground">Present, late, and absent days over time</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="present" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="late" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="absent" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Department Distribution */}
            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <PieChart className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Department Distribution</h2>
                  <p className="text-sm text-muted-foreground">Employee distribution across departments</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie
                    data={departmentData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>

            {/* Productivity Trends */}
            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-green-500/10">
                  <BarChart className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Productivity & Efficiency</h2>
                  <p className="text-sm text-muted-foreground">Monthly productivity and efficiency metrics</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <ReBarChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="productivity" fill="#10b981" name="Productivity %" />
                  <Bar dataKey="efficiency" fill="#6366f1" name="Efficiency %" />
                </ReBarChart>
              </ResponsiveContainer>
            </div>

            {/* Weekly Performance */}
            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-orange-500/10">
                  <Activity className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Weekly Performance</h2>
                  <p className="text-sm text-muted-foreground">Hours worked and tasks completed this week</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <ReLineChart data={weeklyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="hours" stroke="#f59e0b" strokeWidth={3} name="Hours Worked" />
                  <Line yAxisId="right" type="monotone" dataKey="tasks" stroke="#8b5cf6" strokeWidth={3} name="Tasks Completed" />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights and Recommendations */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-indigo-500/10">
                <Target className="h-6 w-6 text-indigo-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">AI-Powered Insights</h2>
                <p className="text-sm text-muted-foreground">Key findings and recommendations based on your data</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Peak Productivity Hours</h3>
                <p className="text-sm text-green-700 dark:text-green-300">Your team performs best between 10 AM - 2 PM. Consider scheduling important meetings during this window.</p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Attendance Improvement</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">Engineering department shows 96% attendance rate. Marketing could benefit from flexible scheduling.</p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Work-Life Balance</h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">Average overtime has decreased by 15%. Wellness initiatives are showing positive impact.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;