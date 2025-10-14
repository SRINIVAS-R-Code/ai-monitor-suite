import { useState } from "react";
import { Settings, Camera, Brain, Database, Bell, Shield } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

interface AdminSettingsProps {
  onLogout: () => void;
  onNavigate?: (page: string) => void;
}

const AdminSettings = ({ onLogout, onNavigate }: AdminSettingsProps) => {
  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    aiMonitoring: true,
    emailNotifications: true,
    smsAlerts: false,
  });

  const [aiSettings, setAiSettings] = useState({
    confidenceThreshold: 95,
    maxProcessingTime: 5,
    autoRetrain: true,
  });

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" activePage="settings" onNavigate={onNavigate} />
      
      <div className="flex-1">
        <Navbar userName="Admin" onLogout={onLogout} />
        
        <main className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">System Settings</h1>
            <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
          </div>

          {/* System Configuration */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">System Configuration</h2>
            </div>
            
            <div className="space-y-4">
              {Object.entries(systemSettings).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 cursor-pointer transition-base">
                  <div>
                    <p className="font-medium text-foreground">
                      {key.split(/(?=[A-Z])/).join(' ').replace(/^./, str => str.toUpperCase())}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Enable {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setSystemSettings({ ...systemSettings, [key]: e.target.checked })}
                    className="w-5 h-5 rounded border-input text-primary"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* AI Configuration */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">AI Model Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Confidence Threshold: {aiSettings.confidenceThreshold}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={aiSettings.confidenceThreshold}
                  onChange={(e) => setAiSettings({ ...aiSettings, confidenceThreshold: parseInt(e.target.value) })}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Minimum confidence level for face recognition
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Max Processing Time: {aiSettings.maxProcessingTime}s
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={aiSettings.maxProcessingTime}
                  onChange={(e) => setAiSettings({ ...aiSettings, maxProcessingTime: parseInt(e.target.value) })}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Maximum time to process each frame
                </p>
              </div>

              <label className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 cursor-pointer transition-base">
                <div>
                  <p className="font-medium text-foreground">Auto Retrain Model</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically retrain AI model with new data
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={aiSettings.autoRetrain}
                  onChange={(e) => setAiSettings({ ...aiSettings, autoRetrain: e.target.checked })}
                  className="w-5 h-5 rounded border-input text-primary"
                />
              </label>
            </div>
          </div>

          {/* Camera Management */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Camera className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Camera Management</h2>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3, 4].map((cam) => (
                <div key={cam} className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-foreground">Camera {cam}</p>
                    <p className="text-sm text-muted-foreground">Main Entrance</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                      Active
                    </span>
                    <button className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-base text-sm font-medium">
                      Configure
                    </button>
                  </div>
                </div>
              ))}
              
              <button className="w-full p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-base text-muted-foreground hover:text-primary font-medium">
                + Add New Camera
              </button>
            </div>
          </div>

          {/* Database Settings */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Database & Backup</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-1">Last Backup</p>
                <p className="text-lg font-bold text-foreground">2 hours ago</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-1">Database Size</p>
                <p className="text-lg font-bold text-foreground">2.4 GB</p>
              </div>
            </div>
            
            <div className="mt-4 flex gap-4">
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-base font-medium">
                Backup Now
              </button>
              <button className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-base font-medium">
                Restore from Backup
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <button className="px-6 py-3 rounded-lg border border-border hover:bg-muted transition-base font-medium">
              Reset to Defaults
            </button>
            <button className="px-6 py-3 rounded-lg gradient-primary text-white font-medium shadow-custom-md hover:shadow-custom-lg transition-smooth">
              Save All Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
