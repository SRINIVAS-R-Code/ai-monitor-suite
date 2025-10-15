import { useState, useEffect } from "react";
import { Users, TrendingUp, Camera, Shield, Activity, Eye, AlertTriangle, Clock, BarChart3, Wifi, WifiOff, Zap, Monitor, Settings, UserCheck, UserX, Calendar, Target } from "lucide-react";
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, BarChart as ReBarChart, Bar, Legend, AreaChart, Area } from 'recharts';
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import KPICard from "@/components/KPICard";
import AIInsights from "@/components/AIInsights";
import Table from "@/components/Table";
import { Employee, AttendanceRecord } from "@/types";

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigate?: (page: string) => void;
}

const AdminDashboard = ({ onLogout, onNavigate }: AdminDashboardProps) => {
  const [systemUptime, setSystemUptime] = useState(98.5);
  const [activeCameras, setActiveCameras] = useState(4);
  const [totalCameras] = useState(4);
  const [aiAccuracy, setAiAccuracy] = useState(97.8);
  const [totalEmployees] = useState(120);
  const [presentToday, setPresentToday] = useState(110);
  const [alerts, setAlerts] = useState(3);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight variations in metrics
      setSystemUptime(prev => Math.max(95, Math.min(99.9, prev + (Math.random() - 0.5) * 0.1)));
      setAiAccuracy(prev => Math.max(95, Math.min(99.9, prev + (Math.random() - 0.5) * 0.1)));
      setPresentToday(prev => Math.max(100, Math.min(120, prev + Math.floor(Math.random() * 3) - 1)));
      setActiveCameras(prev => Math.max(3, Math.min(4, prev + (Math.random() > 0.95 ? -1 : 0))));
      setAlerts(prev => Math.max(0, Math.min(10, prev + (Math.random() > 0.9 ? 1 : Math.random() > 0.95 ? -1 : 0))));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Sample data for charts
  const attendanceTrend = [
    { day: 'Mon', present: 115, absent: 5 },
    { day: 'Tue', present: 118, absent: 2 },
    { day: 'Wed', present: 112, absent: 8 },
    { day: 'Thu', present: 116, absent: 4 },
    { day: 'Fri', present: 110, absent: 10 },
  ];

  const systemHealth = [
    { name: 'AI Engine', value: 98.5, color: '#10b981' },
    { name: 'Cameras', value: 100, color: '#3b82f6' },
    { name: 'Database', value: 99.2, color: '#8b5cf6' },
    { name: 'Network', value: 97.8, color: '#f59e0b' },
  ];

  const employees: Employee[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      department: "Engineering",
      status: "Checked In",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      department: "HR",
      status: "Checked Out",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      department: "Sales",
      status: "Checked In",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.williams@company.com",
      department: "Marketing",
      status: "On Leave",
    },
  ];

  const todayAttendance: AttendanceRecord[] = [
    {
      id: 1,
      employeeId: 1,
      employeeName: "John Doe",
      timestamp: "09:00 AM",
      status: "Present",
      checkInTime: "09:00 AM",
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: "Jane Smith",
      timestamp: "09:10 AM",
      status: "Present",
      checkInTime: "09:10 AM",
    },
    {
      id: 3,
      employeeId: 3,
      employeeName: "Mike Johnson",
      timestamp: "09:15 AM",
      status: "Late",
      checkInTime: "09:15 AM",
    },
    {
      id: 4,
      employeeId: 4,
      employeeName: "Sarah Williams",
      timestamp: "-",
      status: "Absent",
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" activePage="dashboard" onNavigate={onNavigate} />

      <div className="flex-1">
        <Navbar userName="Admin" onLogout={onLogout} />

        <main className="p-6 space-y-6">
          {/* System Status Header */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Monitor className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Admin Control Center</h1>
                  <p className="text-muted-foreground">Monitor and manage your AI-powered employee monitoring system</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">System Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${systemUptime > 98 ? 'bg-green-500' : systemUptime > 95 ? 'bg-yellow-500' : 'bg-red-500'} animate-pulse`}></div>
                    <span className="text-lg font-semibold text-foreground">
                      {systemUptime > 98 ? 'Optimal' : systemUptime > 95 ? 'Good' : 'Maintenance Needed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Total Employees"
              value={totalEmployees.toString()}
              trend={{ value: 5, direction: "up" }}
              icon={<Users className="h-5 w-5 text-blue-500" />}
              variant="primary"
            />
            <KPICard
              title="Present Today"
              value={`${presentToday}/${totalEmployees}`}
              trend={{ value: Math.round((presentToday/totalEmployees)*100 - 92), direction: presentToday/totalEmployees > 0.92 ? "up" : "down" }}
              icon={<UserCheck className="h-5 w-5 text-green-500" />}
              variant="success"
            />
            <KPICard
              title="AI Accuracy"
              value={`${aiAccuracy.toFixed(1)}%`}
              icon={<Shield className="h-5 w-5 text-purple-500" />}
              variant="primary"
            />
            <KPICard
              title="Active Cameras"
              value={`${activeCameras}/${totalCameras}`}
              icon={<Camera className={`h-5 w-5 ${activeCameras === totalCameras ? 'text-green-500' : 'text-yellow-500'}`} />}
              variant={activeCameras === totalCameras ? "success" : "warning"}
            />
          </div>

          {/* System Health & Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search & Quick Actions */}
            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Quick Search</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Search employees, cameras..."
                  className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <div className="grid grid-cols-2 gap-2">
                  <button className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                    Search
                  </button>
                  <button className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
                    Advanced
                  </button>
                </div>
              </div>
            </div>
            {/* System Health Chart */}
            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Activity className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="text-lg font-bold text-foreground">System Health</h3>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <RePieChart>
                  <Pie
                    data={systemHealth}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {systemHealth.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>

            {/* Active Alerts */}
            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Active Alerts</h3>
                  <p className="text-sm text-muted-foreground">{alerts} alerts requiring attention</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Camera 2 Offline</span>
                  </div>
                  <span className="text-xs text-red-600">Critical</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">AI Accuracy Low</span>
                  </div>
                  <span className="text-xs text-yellow-600">Warning</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">New Employee Added</span>
                  </div>
                  <span className="text-xs text-blue-600">Info</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Settings className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate?.('cameras')}
                  className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
                >
                  <Camera className="h-4 w-4" />
                  View Camera Feeds
                </button>
                <button
                  onClick={() => onNavigate?.('attendance')}
                  className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
                >
                  <Clock className="h-4 w-4" />
                  Attendance Reports
                </button>
                <button
                  onClick={() => onNavigate?.('settings')}
                  className="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  System Settings
                </button>
              </div>
            </div>
          </div>

          {/* Attendance Trends Chart */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-green-500/10">
                <BarChart3 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Weekly Attendance Trends</h2>
                <p className="text-sm text-muted-foreground">Employee attendance patterns over the past week</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="present" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="absent" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Employee Management */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">
                Employee Management
              </h2>
              <button className="px-4 py-2 gradient-primary text-white font-medium rounded-lg shadow-custom-sm hover:shadow-custom-md transition-smooth">
                Add Employee
              </button>
            </div>
            <Table data={employees} />
          </div>

          {/* Today's Attendance */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Today's Attendance Overview
            </h2>
            <Table data={todayAttendance} />
          </div>

          {/* AI Insights */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md">
            <AIInsights />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
