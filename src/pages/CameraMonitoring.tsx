import { useState, useEffect } from "react";
import { Camera, Eye, EyeOff, Settings, AlertTriangle, Wifi, WifiOff, Zap, Activity, Users, Clock } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import CameraFeed from "@/components/CameraFeed";

interface CameraMonitoringProps {
  onLogout: () => void;
  onNavigate?: (page: string) => void;
}

const CameraMonitoring = ({ onLogout, onNavigate }: CameraMonitoringProps) => {
  const [selectedCamera, setSelectedCamera] = useState("CAM-001");
  const [faceDetectionEnabled, setFaceDetectionEnabled] = useState(true);
  const [motionDetectionEnabled, setMotionDetectionEnabled] = useState(true);
  const [aiConfidence, setAiConfidence] = useState(94.2);
  const [totalDetections, setTotalDetections] = useState(127);
  const [activeAlerts, setActiveAlerts] = useState(2);

  const cameras = [
    { id: "CAM-001", name: "Main Entrance", status: "online", detections: 45, alerts: 1 },
    { id: "CAM-002", name: "Office Floor 1", status: "online", detections: 38, alerts: 0 },
    { id: "CAM-003", name: "Office Floor 2", status: "offline", detections: 22, alerts: 1 },
    { id: "CAM-004", name: "Conference Room", status: "online", detections: 22, alerts: 0 },
  ];

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAiConfidence(prev => Math.max(85, Math.min(99, prev + (Math.random() - 0.5) * 0.5)));
      setTotalDetections(prev => prev + Math.floor(Math.random() * 3));
      setActiveAlerts(prev => Math.max(0, Math.min(5, prev + (Math.random() > 0.8 ? 1 : Math.random() > 0.9 ? -1 : 0))));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const selectedCameraData = cameras.find(cam => cam.id === selectedCamera);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" activePage="cameras" onNavigate={onNavigate} />

      <div className="flex-1">
        <Navbar userName="Admin" onLogout={onLogout} />

        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Camera className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Live Camera Monitoring</h1>
                  <p className="text-muted-foreground">Real-time AI-powered face recognition and motion detection</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">AI Confidence</p>
                  <p className="text-2xl font-bold text-green-500">{aiConfidence.toFixed(1)}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Detections</p>
                  <p className="text-2xl font-bold text-blue-500">{totalDetections}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className={`text-2xl font-bold ${activeAlerts > 0 ? 'text-red-500' : 'text-green-500'}`}>{activeAlerts}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Camera Grid & Controls */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Camera List & Search */}
            <div className="xl:col-span-1 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">Camera Feeds</h3>
                <input
                  type="text"
                  placeholder="Search cameras..."
                  className="px-3 py-1 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              {cameras.map((camera) => (
                <div
                  key={camera.id}
                  onClick={() => setSelectedCamera(camera.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedCamera === camera.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{camera.name}</h4>
                    <div className={`w-2 h-2 rounded-full ${camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {camera.detections}
                    </span>
                    {camera.alerts > 0 && (
                      <span className="flex items-center gap-1 text-red-500">
                        <AlertTriangle className="h-3 w-3" />
                        {camera.alerts}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Main Camera Feed */}
            <div className="xl:col-span-2">
              <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">
                    {selectedCameraData?.name} - {selectedCamera}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      selectedCameraData?.status === 'online'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {selectedCameraData?.status === 'online' ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                      {selectedCameraData?.status}
                    </div>
                  </div>
                </div>

                <CameraFeed
                  cameraId={selectedCamera}
                  cameraName={selectedCameraData?.name || ""}
                  showOverlay={true}
                />

                {/* Live Stats */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Eye className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Face Detected</span>
                    </div>
                    <p className="text-lg font-bold text-blue-500">Yes</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Activity className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Motion</span>
                    </div>
                    <p className="text-lg font-bold text-green-500">Active</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Last Activity</span>
                    </div>
                    <p className="text-lg font-bold text-purple-500">2m ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls & Settings */}
            <div className="xl:col-span-1 space-y-6">
              {/* AI Controls */}
              <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
                <h4 className="text-lg font-bold text-foreground mb-4">AI Controls</h4>
                <div className="space-y-4">
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium">Face Detection</span>
                    <button
                      onClick={() => setFaceDetectionEnabled(!faceDetectionEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        faceDetectionEnabled ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          faceDetectionEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium">Motion Detection</span>
                    <button
                      onClick={() => setMotionDetectionEnabled(!motionDetectionEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        motionDetectionEnabled ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          motionDetectionEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </label>
                </div>
              </div>

              {/* Camera Settings */}
              <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
                <h4 className="text-lg font-bold text-foreground mb-4">Camera Settings</h4>
                <div className="space-y-3">
                  <button className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Adjust Quality
                  </button>
                  <button className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Restart Camera
                  </button>
                  <button className="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    View Recordings
                  </button>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
                <h4 className="text-lg font-bold text-foreground mb-4">System Status</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Processing</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-500">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Network</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-500">Stable</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Storage</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs text-yellow-500">85% Used</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Face detected at Main Entrance</p>
                  <p className="text-xs text-muted-foreground">John Doe - 2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Activity className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Motion detected in Conference Room</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Camera 3 connection lost</p>
                  <p className="text-xs text-muted-foreground">8 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CameraMonitoring;
