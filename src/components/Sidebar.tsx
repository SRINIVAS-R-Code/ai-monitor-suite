import { LayoutDashboard, Users, Camera, BarChart3, Settings, Clock, Shield } from "lucide-react";
import { UserRole } from "@/types";

interface SidebarProps {
  role: UserRole;
  activePage?: string;
}

const Sidebar = ({ role, activePage = "dashboard" }: SidebarProps) => {
  const commonLinks = [
    { name: "Dashboard", icon: LayoutDashboard, path: "dashboard" },
    { name: "Attendance", icon: Clock, path: "attendance" },
    { name: "Analytics", icon: BarChart3, path: "analytics" },
  ];

  const adminLinks = [
    { name: "Employees", icon: Users, path: "employees" },
    { name: "Cameras", icon: Camera, path: "cameras" },
    { name: "AI Monitoring", icon: Shield, path: "monitoring" },
    { name: "Settings", icon: Settings, path: "settings" },
  ];

  const links = role === "admin" ? [...commonLinks, ...adminLinks] : commonLinks;

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground h-screen flex flex-col shadow-custom-lg">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
          MonitorAI
        </h1>
        <p className="text-sm text-sidebar-foreground/60 mt-1">
          {role === "admin" ? "Admin Portal" : "Employee Portal"}
        </p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = activePage === link.path;
            
            return (
              <li key={link.name}>
                <button
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
