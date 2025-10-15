import { LayoutDashboard, Users, Camera, BarChart3, Settings, Clock, Shield, Heart, Bot, UserCog, Bell } from "lucide-react";
import { UserRole } from "@/types";

interface SidebarProps {
   role: UserRole;
   activePage?: string;
   onNavigate?: (page: string) => void;
   userName?: string;
}

const Sidebar = ({ role, activePage = "dashboard", onNavigate, userName }: SidebarProps) => {
  const commonLinks = [
    { name: "Dashboard", icon: LayoutDashboard, path: "dashboard" },
    { name: "Live Camera", icon: Camera, path: "camera" },
    { name: "Attendance", icon: Clock, path: "attendance" },
    { name: "Analytics", icon: BarChart3, path: "analytics" },
    { name: "Wellness", icon: Heart, path: "wellness" },
    { name: "Notifications", icon: Bell, path: "notifications" },
    { name: "Settings", icon: Settings, path: "settings" },
  ];

  const adminLinks = [
    { name: "Employees", icon: Users, path: "employees" },
    { name: "Live Cameras", icon: Camera, path: "cameras" },
    { name: "AI Monitoring", icon: Shield, path: "monitoring" },
    { name: "Settings", icon: UserCog, path: "settings" },
  ];

  const links = role === "admin" ? [...commonLinks, ...adminLinks] : commonLinks;

  return (
    <aside className="w-72 bg-sidebar text-sidebar-foreground min-h-screen flex flex-col shadow-2xl border-r-2 border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
          MonitorAI
        </h1>
        <p className="text-sm text-sidebar-foreground/60 mt-1">
          {role === "admin" ? "Admin Portal" : "Employee Portal"}
        </p>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 cursor-pointer hover:bg-sidebar-accent/50 rounded-lg p-2 transition-base" onClick={() => onNavigate?.('settings')}>
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">
              {userName ? userName.charAt(0).toUpperCase() : (role === "admin" ? "A" : "U")}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-sidebar-foreground">
              {userName || (role === "admin" ? "Administrator" : "Employee")}
            </p>
            <p className="text-xs text-sidebar-foreground/60">
              {role === "admin" ? "admin@company.com" : "user@company.com"}
            </p>
          </div>
          <div className="text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = activePage === link.path;
            
            return (
              <li key={link.name}>
                <button
                  onClick={() => onNavigate?.(link.path)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-base font-medium
                    ${isActive 
                      ? 'bg-sidebar-accent text-sidebar-primary' 
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="px-4 py-3 bg-sidebar-accent/30 rounded-lg">
          <p className="text-xs text-sidebar-foreground/60 mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm font-medium">All Systems Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
