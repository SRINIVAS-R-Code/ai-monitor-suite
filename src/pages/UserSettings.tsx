import { useState } from "react";
import { User, Bell, Shield, Palette, Moon, Sun } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

interface UserSettingsProps {
  onLogout: () => void;
  onNavigate?: (page: string) => void;
}

const UserSettings = ({ onLogout, onNavigate }: UserSettingsProps) => {
  const [notifications, setNotifications] = useState({
    attendance: true,
    lateArrival: true,
    systemUpdates: false,
  });

  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "en",
  });

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="user" activePage="settings" onNavigate={onNavigate} />
      
      <div className="flex-1">
        <Navbar userName="Srinivas" onLogout={onLogout} />
        
        <main className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>

          {/* Profile Section */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Profile Information</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Srinivas Kumar"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="srinivas@company.com"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    defaultValue="Engineering"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    defaultValue="EMP-001"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 cursor-pointer transition-base">
                  <div>
                    <p className="font-medium text-foreground">
                      {key.split(/(?=[A-Z])/).join(' ').replace(/^./, str => str.toUpperCase())}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about {key.toLowerCase()}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                    className="w-5 h-5 rounded border-input text-primary"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Palette className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Preferences</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Theme
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPreferences({ ...preferences, theme: "light" })}
                    className={`p-4 rounded-lg border transition-base ${
                      preferences.theme === "light"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <Sun className="h-5 w-5 mx-auto mb-2" />
                    <p className="font-medium">Light</p>
                  </button>
                  <button
                    onClick={() => setPreferences({ ...preferences, theme: "dark" })}
                    className={`p-4 rounded-lg border transition-base ${
                      preferences.theme === "dark"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <Moon className="h-5 w-5 mx-auto mb-2" />
                    <p className="font-medium">Dark</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Security</h2>
            </div>
            
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-base font-medium">
              Change Password
            </button>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <button className="px-6 py-3 rounded-lg border border-border hover:bg-muted transition-base font-medium">
              Cancel
            </button>
            <button className="px-6 py-3 rounded-lg gradient-primary text-white font-medium shadow-custom-md hover:shadow-custom-lg transition-smooth">
              Save Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserSettings;
