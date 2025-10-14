import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserSettings from "./pages/UserSettings";
import AdminSettings from "./pages/AdminSettings";
import CameraMonitoring from "./pages/CameraMonitoring";
import AttendanceRecords from "./pages/AttendanceRecords";
import { UserRole } from "./types";

const queryClient = new QueryClient();

const App = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentPage, setCurrentPage] = useState<string>("dashboard");

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage("dashboard");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    if (!userRole) return <Login onLogin={handleLogin} />;

    if (userRole === "user") {
      switch (currentPage) {
        case "settings":
          return <UserSettings onLogout={handleLogout} onNavigate={handleNavigate} />;
        case "attendance":
          return <AttendanceRecords onLogout={handleLogout} role="user" onNavigate={handleNavigate} />;
        default:
          return <UserDashboard onLogout={handleLogout} onNavigate={handleNavigate} />;
      }
    }

    if (userRole === "admin") {
      switch (currentPage) {
        case "settings":
          return <AdminSettings onLogout={handleLogout} onNavigate={handleNavigate} />;
        case "cameras":
          return <CameraMonitoring onLogout={handleLogout} onNavigate={handleNavigate} />;
        case "attendance":
          return <AttendanceRecords onLogout={handleLogout} role="admin" onNavigate={handleNavigate} />;
        default:
          return <AdminDashboard onLogout={handleLogout} onNavigate={handleNavigate} />;
      }
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {renderPage()}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
