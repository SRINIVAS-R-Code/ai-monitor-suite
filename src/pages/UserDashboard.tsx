import { useState, useEffect } from "react";
import { Users, TrendingUp, Target, Activity, Calendar, Clock, CheckCircle, MapPin, Play, Square, Download, BarChart3, User, Heart, Bot, Wifi, WifiOff, PieChart, LineChart, BarChart, Eye, EyeOff, AlertTriangle, Zap, Monitor, Keyboard, Mouse, Timer, Coffee, LogOut, Smile } from "lucide-react";
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, BarChart as ReBarChart, Bar, Legend, AreaChart, Area } from 'recharts';
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import KPICard from "@/components/KPICard";
import AIInsights from "@/components/AIInsights";
import Table from "@/components/Table";
import CameraFeed from "@/components/CameraFeed";
import SystemStatusBar from "@/components/SystemStatusBar";
import WellnessCheck from "@/components/WellnessCheck";
import AIAssistant from "@/components/AIAssistant";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { AttendanceRecord } from "@/types";

interface UserDashboardProps {
  onLogout: () => void;
  onNavigate?: (page: string) => void;
}

const UserDashboard = ({ onLogout, onNavigate, userName = "Srinivas", isDarkMode, toggleTheme }: UserDashboardProps & { userName?: string; isDarkMode?: boolean; toggleTheme?: () => void }) => {
   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
   const [isCheckedIn, setIsCheckedIn] = useState(false);
   const [isOnBreak, setIsOnBreak] = useState(false);
   const [workingHours, setWorkingHours] = useState(0);
   const [activeTime, setActiveTime] = useState(0);
   const [idleTime, setIdleTime] = useState(0);
   const [faceDetected, setFaceDetected] = useState(true);
   const [systemStatus, setSystemStatus] = useState<'active' | 'away' | 'idle'>('active');
   const [keyboardActivity, setKeyboardActivity] = useState(75);
   const [mouseActivity, setMouseActivity] = useState(82);
   const [screenFocus, setScreenFocus] = useState(88);
   const [lastActivity, setLastActivity] = useState(new Date());

   // Simulate real-time updates
   useEffect(() => {
     const interval = setInterval(() => {
       if (isCheckedIn && !isOnBreak) {
         setWorkingHours(prev => prev + 1/3600); // Add 1 second worth of hours
         setActiveTime(prev => prev + 0.8);
         setIdleTime(prev => prev + 0.2);
       }

       // Simulate face detection changes
       if (Math.random() < 0.05) { // 5% chance every second
         setFaceDetected(prev => !prev);
         setSystemStatus(faceDetected ? 'active' : 'away');
       }

       // Update activity metrics
       setKeyboardActivity(Math.floor(Math.random() * 20) + 70);
       setMouseActivity(Math.floor(Math.random() * 20) + 75);
       setScreenFocus(Math.floor(Math.random() * 15) + 80);
       setLastActivity(new Date());
     }, 1000);

     return () => clearInterval(interval);
   }, [isCheckedIn, isOnBreak, faceDetected]);

  const recentAttendance: AttendanceRecord[] = [
    {
      id: 1,
      employeeId: 1,
      employeeName: "You",
      timestamp: "2024-01-15 09:00 AM",
      status: "Present",
      checkInTime: "09:00 AM",
      checkOutTime: "05:30 PM",
    },
    {
      id: 2,
      employeeId: 1,
      employeeName: "You",
      timestamp: "2024-01-14 09:05 AM",
      status: "Present",
      checkInTime: "09:05 AM",
      checkOutTime: "05:25 PM",
    },
    {
      id: 3,
      employeeId: 1,
      employeeName: "You",
      timestamp: "2024-01-13 09:15 AM",
      status: "Late",
      checkInTime: "09:15 AM",
      checkOutTime: "05:20 PM",
    },
  ];

  const handleCheckIn = () => {
    setIsCheckedIn(!isCheckedIn);
    if (!isCheckedIn) {
      setWorkingHours(0);
      setActiveTime(0);
      setIdleTime(0);
    }
  };

  const handleBreak = () => {
    setIsOnBreak(!isOnBreak);
  };

  // Activity timeline data
  const todayActivities = [
    { time: "09:00 AM", action: "Checked In", type: "checkin" },
    { time: "10:30 AM", action: "Break Started", type: "break" },
    { time: "10:45 AM", action: "Break Ended", type: "break" },
    { time: "12:00 PM", action: "Lunch Break", type: "break" },
    { time: "01:00 PM", action: "Resumed Work", type: "resume" },
  ];

  // Hourly activity data for today
  const hourlyActivityData = [
    { hour: '9', active: 45, idle: 15 },
    { hour: '10', active: 50, idle: 10 },
    { hour: '11', active: 48, idle: 12 },
    { hour: '12', active: 30, idle: 30 },
    { hour: '1', active: 52, idle: 8 },
    { hour: '2', active: 47, idle: 13 },
    { hour: '3', active: 55, idle: 5 },
    { hour: '4', active: 49, idle: 11 },
  ];

  // Recharts sample data
  const weeklyData = [
    { day: 'Mon', hours: 8 },
    { day: 'Tue', hours: 7.5 },
    { day: 'Wed', hours: 8 },
    { day: 'Thu', hours: 7 },
    { day: 'Fri', hours: 8.5 },
  ];
  const pieData = [
    { name: 'Present', value: 22 },
    { name: 'Late', value: 3 },
    { name: 'Absent', value: 1 },
  ];
  const COLORS = ['#22c55e', '#eab308', '#ef4444'];
  const perfData = [
    { name: 'Attendance Rate', value: 92 },
    { name: 'On Time', value: 85 },
    { name: 'Productivity', value: 78 },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="user" activePage="dashboard" onNavigate={onNavigate} userName={userName} />

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Navbar userName={userName} onLogout={onLogout} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onNavigate={onNavigate} />

        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back, {userName}!</h1>
                  <p className="text-muted-foreground">Software Engineer • Employee ID: EMP001</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className={`flex items-center gap-1 ${systemStatus === 'active' ? 'text-green-600' : systemStatus === 'away' ? 'text-yellow-600' : 'text-red-600'}`}>
                      <div className={`w-2 h-2 rounded-full ${systemStatus === 'active' ? 'bg-green-500' : systemStatus === 'away' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      <span className="text-xs capitalize">{systemStatus}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Main Office</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Wellness: Good</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className={`h-3 w-3 ${faceDetected ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`text-xs ${faceDetected ? 'text-green-600' : 'text-red-600'}`}>
                        {faceDetected ? 'Face Detected' : 'Face Missing'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Current Time</p>
                <p className="text-lg font-semibold text-foreground">{new Date().toLocaleTimeString()}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-muted-foreground">AI Engine: 98.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Today's Status"
              value={isCheckedIn ? (isOnBreak ? "On Break" : "Checked In") : "Not Checked In"}
              icon={<CheckCircle className={`h-5 w-5 ${isCheckedIn ? (isOnBreak ? 'text-warning' : 'text-success') : 'text-muted-foreground'}`} />}
              variant={isCheckedIn ? (isOnBreak ? "warning" : "success") : "default"}
            />
            <KPICard
              title="Working Hours"
              value={isCheckedIn ? `${workingHours.toFixed(1)}h` : "0.0h"}
              icon={<Clock className="h-5 w-5 text-primary" />}
              variant="primary"
            />
            <KPICard
              title="Active Time"
              value={`${activeTime.toFixed(1)}h`}
              icon={<Activity className="h-5 w-5 text-green-500" />}
            />
            <KPICard
              title="Idle Time"
              value={`${idleTime.toFixed(1)}h`}
              icon={<Timer className="h-5 w-5 text-orange-500" />}
            />
          </div>

          {/* System Interaction & Face Recognition */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Face Recognition Status */}
            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl ${faceDetected ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  {faceDetected ? <Eye className="h-6 w-6 text-green-500" /> : <EyeOff className="h-6 w-6 text-red-500" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Face Recognition</h3>
                  <p className="text-sm text-muted-foreground">AI-powered monitoring</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    faceDetected ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {faceDetected ? 'Face Detected' : 'Face Missing'}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Seen</span>
                  <span className="text-sm text-muted-foreground">
                    {faceDetected ? 'Just now' : lastActivity.toLocaleTimeString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">System Status</span>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    systemStatus === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    systemStatus === 'away' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {systemStatus}
                  </div>
                </div>

                {!faceDetected && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-700 dark:text-red-300">Face not detected for monitoring</span>
                  </div>
                )}
              </div>
            </div>

            {/* System Interaction Metrics */}
            <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <Monitor className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">System Interaction</h3>
                  <p className="text-sm text-muted-foreground">Real-time activity monitoring</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Keyboard className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Keyboard Activity</span>
                    </div>
                    <span className="text-sm font-bold text-purple-500">{keyboardActivity}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: `${keyboardActivity}%` }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mouse className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Mouse Activity</span>
                    </div>
                    <span className="text-sm font-bold text-green-500">{mouseActivity}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${mouseActivity}%` }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Screen Focus</span>
                    </div>
                    <span className="text-sm font-bold text-blue-500">{screenFocus}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${screenFocus}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Status Bar */}
          <SystemStatusBar className="mb-6" />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Quick Actions & Recent History */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <button
                    onClick={handleCheckIn}
                    className={`py-3 px-4 rounded-lg font-semibold shadow-custom-md transition-smooth transform hover:-translate-y-0.5 ${
                      isCheckedIn
                        ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        : 'gradient-primary text-white hover:shadow-custom-lg'
                    }`}
                  >
                    {isCheckedIn ? <><LogOut className="h-4 w-4 inline mr-2" />Check Out</> : <><CheckCircle className="h-4 w-4 inline mr-2" />Check In</>}
                  </button>
                  <button
                    onClick={handleBreak}
                    disabled={!isCheckedIn}
                    className={`py-3 px-4 rounded-lg font-semibold shadow-custom-md transition-smooth transform hover:-translate-y-0.5 ${
                      isOnBreak
                        ? 'bg-success text-white hover:bg-success/90'
                        : 'bg-warning text-white hover:bg-warning/90'
                    } ${!isCheckedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isOnBreak ? <><Play className="h-4 w-4 inline mr-2" />End Break</> : <><Coffee className="h-4 w-4 inline mr-2" />Start Break</>}
                  </button>
                  <button className="py-3 px-4 rounded-lg border border-border hover:bg-muted transition-base font-medium">
                    View Full Attendance
                  </button>
                  <button className="py-3 px-4 rounded-lg border border-border hover:bg-muted transition-base font-medium">
                    Request Leave
                  </button>
                </div>
              </div>

              {/* Today's Activity Timeline */}
              <div className="bg-card rounded-xl border border-border shadow-custom-md p-4 h-64 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-foreground">Today's Activity Timeline</h2>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">Live</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {todayActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-base">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'checkin' ? 'bg-green-100 dark:bg-green-900/20' :
                        activity.type === 'break' ? 'bg-orange-100 dark:bg-orange-900/20' :
                        'bg-blue-100 dark:bg-blue-900/20'
                      }`}>
                        {activity.type === 'checkin' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                         activity.type === 'break' ? <Coffee className="h-4 w-4 text-orange-600" /> :
                         <Play className="h-4 w-4 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column - Calendar & Wellness */}
            <div className="space-y-6">
              {/* Attendance Calendar */}
              <div className="bg-card rounded-xl border border-border shadow-custom-md p-3 h-96">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-3 w-3 text-primary" />
                  <h2 className="text-sm font-bold text-foreground">Attendance Calendar</h2>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border-0 text-xs w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-xs">Present</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span className="text-xs">Late</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <span className="text-xs">Absent</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 p-2 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    {selectedDate ? selectedDate.toDateString() : 'Select a date'}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Camera Preview */}
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <Eye className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Live Camera</h2>
                  <p className="text-sm text-muted-foreground">
                    AI-powered face recognition monitoring
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate?.('camera')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                View Full Camera →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Face Detection Status */}
              <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <h3 className="text-sm font-semibold text-foreground">Face Status</h3>
                </div>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                    faceDetected ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
                  }`}>
                    {faceDetected ? <Eye className="h-6 w-6 text-green-500" /> : <EyeOff className="h-6 w-6 text-red-500" />}
                  </div>
                  <p className={`text-sm font-medium ${faceDetected ? 'text-green-600' : 'text-red-600'}`}>
                    {faceDetected ? 'Face Detected' : 'Face Missing'}
                  </p>
                </div>
              </div>

              {/* AI Confidence */}
              <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <h3 className="text-sm font-semibold text-foreground">AI Confidence</h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-500 mb-1">94%</div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full transition-all" style={{ width: '94%' }} />
                  </div>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-4 w-4 text-purple-500" />
                  <h3 className="text-sm font-semibold text-foreground">System Status</h3>
                </div>
                <div className="text-center">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    systemStatus === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    systemStatus === 'away' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      systemStatus === 'active' ? 'bg-green-500' :
                      systemStatus === 'away' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    {systemStatus}
                  </div>
                </div>
              </div>
            </div>

            {/* Camera Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-500">HD</p>
                <p className="text-xs text-muted-foreground">Resolution</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">30fps</p>
                <p className="text-xs text-muted-foreground">Frame Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-500">98.5%</p>
                <p className="text-xs text-muted-foreground">AI Engine</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-500">Online</p>
                <p className="text-xs text-muted-foreground">Connection</p>
              </div>
            </div>
          </div>

          {/* Quick Analytics Preview */}
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Quick Analytics</h3>
              <button
                onClick={() => onNavigate?.('analytics')}
                className="text-orange-500 hover:text-orange-600 text-sm font-medium"
              >
                View Full Analytics →
              </button>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-orange-500/10">
                  <BarChart3 className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Quick Analytics</h2>
                  <p className="text-sm text-muted-foreground">
                    Your personal attendance overview
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate?.('analytics')}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
              >
                View Full Analytics →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Personal Weekly Trend */}
              <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <LineChart className="h-4 w-4 text-orange-500" />
                  <h3 className="text-sm font-semibold text-foreground">This Week</h3>
                </div>
                <ResponsiveContainer width="100%" height={120}>
                  <ReLineChart data={weeklyData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="hours" stroke="#f97316" strokeWidth={2} dot={{ r: 2 }} />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>

              {/* Personal Attendance Status */}
              <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <PieChart className="h-4 w-4 text-orange-500" />
                  <h3 className="text-sm font-semibold text-foreground">This Month</h3>
                </div>
                <ResponsiveContainer width="100%" height={120}>
                  <RePieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={35}>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-3 mt-2">
                  {pieData.slice(0, 2).map((entry, idx) => (
                    <div key={entry.name} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: COLORS[idx] }} />
                      <span className="text-xs text-muted-foreground">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal Performance */}
              <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart className="h-4 w-4 text-orange-500" />
                  <h3 className="text-sm font-semibold text-foreground">Performance</h3>
                </div>
                <ResponsiveContainer width="100%" height={120}>
                  <ReBarChart data={perfData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={40} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#f97316" barSize={20} />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Personal Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">8.2h</p>
                <p className="text-xs text-muted-foreground">Avg Hours/Day</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">87%</p>
                <p className="text-xs text-muted-foreground">Punctuality</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-500">92%</p>
                <p className="text-xs text-muted-foreground">Attendance</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-500">15</p>
                <p className="text-xs text-muted-foreground">Perfect Days</p>
              </div>
            </div>
          </div>


          {/* AI Insights */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md">
            <AIInsights />
          </div>
        </main>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default UserDashboard;
