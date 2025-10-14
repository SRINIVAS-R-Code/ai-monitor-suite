import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { UserRole } from "./types";

const queryClient = new QueryClient();

const App = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {!userRole && <Login onLogin={handleLogin} />}
        {userRole === "user" && <UserDashboard onLogout={handleLogout} />}
        {userRole === "admin" && <AdminDashboard onLogout={handleLogout} />}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
