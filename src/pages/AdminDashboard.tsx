import { Users, TrendingUp, Camera, Shield, Activity } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import KPICard from "@/components/KPICard";
import AIInsights from "@/components/AIInsights";
import Table from "@/components/Table";
import { Employee, AttendanceRecord } from "@/types";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
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
      <Sidebar role="admin" activePage="dashboard" />
      
      <div className="flex-1">
        <Navbar userName="Admin" onLogout={onLogout} />
        
        <main className="p-6 space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <KPICard
              title="Total Employees"
              value="120"
              trend={{ value: 5, direction: "up" }}
              icon={<Users className="h-5 w-5 text-primary" />}
              variant="primary"
            />
            <KPICard
              title="Attendance Rate"
              value="92%"
              trend={{ value: 3, direction: "up" }}
              icon={<TrendingUp className="h-5 w-5 text-success" />}
              variant="success"
            />
            <KPICard
              title="AI Accuracy"
              value="97.8%"
              icon={<Shield className="h-5 w-5 text-foreground" />}
            />
            <KPICard
              title="System Uptime"
              value="98.5%"
              icon={<Activity className="h-5 w-5 text-foreground" />}
            />
            <KPICard
              title="Active Cameras"
              value="4/4"
              icon={<Camera className="h-5 w-5 text-success" />}
              variant="success"
            />
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
