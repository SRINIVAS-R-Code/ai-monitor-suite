import { Users, TrendingUp, Target, Activity } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import KPICard from "@/components/KPICard";
import AIInsights from "@/components/AIInsights";
import Table from "@/components/Table";
import { AttendanceRecord } from "@/types";

interface UserDashboardProps {
  onLogout: () => void;
}

const UserDashboard = ({ onLogout }: UserDashboardProps) => {
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

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="user" activePage="dashboard" />
      
      <div className="flex-1">
        <Navbar userName="Srinivas" onLogout={onLogout} />
        
        <main className="p-6 space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="My Attendance Rate"
              value="96%"
              trend={{ value: 2, direction: "up" }}
              icon={<Target className="h-5 w-5 text-primary" />}
              variant="primary"
            />
            <KPICard
              title="Days Present"
              value="23"
              icon={<Users className="h-5 w-5 text-success" />}
              variant="success"
            />
            <KPICard
              title="Avg. Check-in Time"
              value="9:05 AM"
              icon={<Activity className="h-5 w-5 text-foreground" />}
            />
            <KPICard
              title="This Month Score"
              value="A+"
              trend={{ value: 5, direction: "up" }}
              icon={<TrendingUp className="h-5 w-5 text-success" />}
            />
          </div>

          {/* Recent Attendance */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              My Recent Attendance
            </h2>
            <Table data={recentAttendance} />
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

export default UserDashboard;
