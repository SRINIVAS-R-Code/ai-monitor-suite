import { useState } from "react";
import { Search, Download, Filter, Calendar } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import { AttendanceRecord, UserRole } from "@/types";

interface AttendanceRecordsProps {
  onLogout: () => void;
  role: UserRole;
  onNavigate?: (page: string) => void;
}

const AttendanceRecords = ({ onLogout, role, onNavigate }: AttendanceRecordsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const allRecords: AttendanceRecord[] = [
    {
      id: 1,
      employeeId: 1,
      employeeName: "John Doe",
      timestamp: "2024-01-15 09:00 AM",
      status: "Present",
      checkInTime: "09:00 AM",
      checkOutTime: "05:30 PM",
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: "Jane Smith",
      timestamp: "2024-01-15 09:10 AM",
      status: "Present",
      checkInTime: "09:10 AM",
      checkOutTime: "05:25 PM",
    },
    {
      id: 3,
      employeeId: 3,
      employeeName: "Mike Johnson",
      timestamp: "2024-01-15 09:15 AM",
      status: "Late",
      checkInTime: "09:15 AM",
      checkOutTime: "05:20 PM",
    },
    {
      id: 4,
      employeeId: 4,
      employeeName: "Sarah Williams",
      timestamp: "2024-01-15",
      status: "Absent",
    },
    {
      id: 5,
      employeeId: 5,
      employeeName: "David Brown",
      timestamp: "2024-01-15 08:55 AM",
      status: "Present",
      checkInTime: "08:55 AM",
      checkOutTime: "05:35 PM",
    },
  ];

  const filteredRecords = allRecords.filter((record) => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: allRecords.length,
    present: allRecords.filter(r => r.status === "Present").length,
    late: allRecords.filter(r => r.status === "Late").length,
    absent: allRecords.filter(r => r.status === "Absent").length,
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role={role} activePage="attendance" onNavigate={onNavigate} />
      
      <div className="flex-1">
        <Navbar userName={role === "admin" ? "Admin" : "Srinivas"} onLogout={onLogout} />
        
        <main className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Attendance Records</h1>
              <p className="text-muted-foreground">
                {role === "admin" ? "All employee attendance records" : "Your attendance history"}
              </p>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-base font-medium">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border shadow-custom-sm">
              <p className="text-sm text-muted-foreground mb-1">Total Records</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </div>
            <div className="p-4 rounded-xl bg-success/10 border border-success/20">
              <p className="text-sm text-success/80 mb-1">Present</p>
              <p className="text-2xl font-bold text-success">{stats.present}</p>
            </div>
            <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
              <p className="text-sm text-warning/80 mb-1">Late</p>
              <p className="text-2xl font-bold text-warning">{stats.late}</p>
            </div>
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive/80 mb-1">Absent</p>
              <p className="text-2xl font-bold text-destructive">{stats.absent}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by employee name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground"
                />
              </div>

              <div className="flex gap-2">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-8 py-2 rounded-lg border border-input bg-background text-foreground appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value="Present">Present</option>
                    <option value="Late">Late</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-base">
                  <Calendar className="h-4 w-4" />
                  Date Range
                </button>
              </div>
            </div>
          </div>

          {/* Records Table */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Records ({filteredRecords.length})
            </h2>
            <Table data={filteredRecords} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendanceRecords;
