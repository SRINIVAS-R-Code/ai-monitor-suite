export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  status: "Checked In" | "Checked Out" | "On Leave";
  avatar?: string;
}

export interface AttendanceRecord {
  id: number;
  employeeId: number;
  employeeName: string;
  timestamp: string;
  status: "Present" | "Late" | "Absent";
  checkInTime?: string;
  checkOutTime?: string;
}

export interface KPI {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  icon?: React.ReactNode;
}

export interface AIInsight {
  id: number;
  type: "info" | "warning" | "success";
  message: string;
  timestamp: string;
  confidence?: number;
}

export interface Notification {
  id: number;
  type: "info" | "warning" | "error" | "success";
  message: string;
  timestamp: string;
  read: boolean;
}
