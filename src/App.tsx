import { useState, useEffect } from "react";
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
import Analytics from "./pages/Analytics";
import Wellness from "./pages/Wellness";
import LiveCamera from "./pages/LiveCamera";
import { UserRole } from "./types";

const queryClient = new QueryClient();

const App = () => {
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [currentPage, setCurrentPage] = useState<string>("dashboard");
    const [userName, setUserName] = useState<string>("");
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
      // Load theme from localStorage on app start
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark';
    });

  const handleLogin = (role: UserRole, name?: string) => {
    setUserRole(role);
    setUserName(name || "");
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage("dashboard");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    // Apply theme globally
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Apply theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const renderPage = () => {
    if (!userRole) return <Login onLogin={handleLogin} />;

    if (userRole === "user") {
      switch (currentPage) {
        case "camera":
          return <LiveCamera onLogout={handleLogout} onNavigate={handleNavigate} />;
        case "attendance":
          return <AttendanceRecords onLogout={handleLogout} role="user" onNavigate={handleNavigate} />;
        case "analytics":
          return <Analytics onLogout={handleLogout} onNavigate={handleNavigate} />;
        case "wellness":
          return <Wellness onLogout={handleLogout} onNavigate={handleNavigate} />;
        case "settings":
          return <UserSettings onLogout={handleLogout} onNavigate={handleNavigate} />;
        case "notifications":
          return <UserDashboard onLogout={handleLogout} onNavigate={handleNavigate} userName={userName} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
        default:
          return <UserDashboard onLogout={handleLogout} onNavigate={handleNavigate} userName={userName} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
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
        <div className={isDarkMode ? 'dark' : ''}>
          <Toaster />
          <Sonner />
          {renderPage()}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
