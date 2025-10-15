import { useState } from "react";
import { Bell, LogOut, User, Search, X } from "lucide-react";
import NotificationBell from "./NotificationBell";

interface NavbarProps {
   userName: string;
   onLogout: () => void;
   isDarkMode?: boolean;
   toggleTheme?: () => void;
   onNavigate?: (page: string) => void;
}

const Navbar = ({ userName, onLogout, isDarkMode, toggleTheme, onNavigate }: NavbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchSuggestions = [
    "Dashboard",
    "Attendance records",
    "Analytics report",
    "Camera feeds",
    "Employee wellness",
    "System settings",
    "AI assistant",
    "Notifications"
  ];

  const filteredSuggestions = searchSuggestions.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSelect = (item: string) => {
    const pageMap: { [key: string]: string } = {
      "Dashboard": "dashboard",
      "Attendance records": "attendance",
      "Analytics report": "analytics",
      "Camera feeds": "cameras",
      "Employee wellness": "wellness",
      "System settings": "settings",
      "AI assistant": "assistant",
      "Notifications": "notifications"
    };

    const page = pageMap[item];
    if (page && onNavigate) {
      onNavigate(page);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4 shadow-custom-sm relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Welcome back, {userName}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-base"
            >
              <Search className="h-5 w-5 text-muted-foreground" />
            </button>

            {isSearchOpen && (
              <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-lg z-50">
                <div className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search pages, features..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>

                  <div className="mt-3 max-h-48 overflow-y-auto">
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchSelect(item)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors text-sm"
                        >
                          {item}
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground px-3 py-2">No results found</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

           <NotificationBell count={3} userName={userName} onNavigate={onNavigate} />

           <button
             onClick={toggleTheme}
             className="p-2 rounded-lg hover:bg-muted transition-base"
           >
             <span className="text-foreground text-lg">
               {isDarkMode ? '☀️' : '🌙'}
             </span>
           </button>

           <div className="h-8 w-px bg-border" />

           <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-base font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
           </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
