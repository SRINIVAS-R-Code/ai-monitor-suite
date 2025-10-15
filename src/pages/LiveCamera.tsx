import { useState, useEffect, useRef } from "react";
import { Camera, Eye, EyeOff, AlertTriangle, Play, Square, Settings, Zap, Wifi, WifiOff } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const LiveCamera = ({ onLogout, onNavigate }: { onLogout: () => void; onNavigate?: (page: string) => void }) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [detectionStatus, setDetectionStatus] = useState<'detected' | 'missing' | 'multiple' | 'none'>('none');
  const [lastSeen, setLastSeen] = useState<Date | null>(null);
  const [cameraQuality, setCameraQuality] = useState<'HD' | 'SD' | 'Low'>('HD');
  const [aiConfidence, setAiConfidence] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connected');
  const [alerts, setAlerts] = useState<string[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulate camera streaming and face detection
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isStreaming) {
      interval = setInterval(() => {
        // Simulate face detection changes
        const random = Math.random();
        if (random < 0.7) {
          setFaceDetected(true);
          setDetectionStatus('detected');
          setLastSeen(new Date());
          setAiConfidence(Math.floor(Math.random() * 20) + 85); // 85-95%
        } else if (random < 0.85) {
          setFaceDetected(false);
          setDetectionStatus('missing');
          setAiConfidence(0);
        } else {
          setFaceDetected(false);
          setDetectionStatus('none');
          setAiConfidence(0);
        }

        // Simulate connection status changes (rare)
        if (Math.random() < 0.02) {
          setConnectionStatus('disconnected');
          setTimeout(() => setConnectionStatus('connecting'), 2000);
          setTimeout(() => setConnectionStatus('connected'), 4000);
        }

        // Add alerts for missing face detection
        if (!faceDetected && detectionStatus === 'missing') {
          const alertMsg = `Face not detected for ${Math.floor(Math.random() * 10) + 1} minutes`;
          if (!alerts.includes(alertMsg)) {
            setAlerts(prev => [...prev.slice(-2), alertMsg]); // Keep last 3 alerts
          }
        }
      }, 3000); // Update every 3 seconds
    }

    return () => clearInterval(interval);
  }, [isStreaming, faceDetected, detectionStatus, alerts]);

  const toggleStreaming = () => {
    setIsStreaming(!isStreaming);
    if (!isStreaming) {
      setConnectionStatus('connecting');
      setTimeout(() => setConnectionStatus('connected'), 2000);
    } else {
      setFaceDetected(false);
      setDetectionStatus('none');
      setConnectionStatus('disconnected');
    }
  };

  const getDetectionStatusColor = () => {
    switch (detectionStatus) {
      case 'detected': return 'text-green-500 bg-green-50 dark:bg-green-950/20';
      case 'missing': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
      case 'multiple': return 'text-blue-500 bg-blue-50 dark:bg-blue-950/20';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-950/20';
    }
  };

  const getDetectionStatusText = () => {
    switch (detectionStatus) {
      case 'detected': return 'Face Detected';
      case 'missing': return 'Face Missing';
      case 'multiple': return 'Multiple Faces';
      default: return 'No Detection';
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="user" activePage="camera" onNavigate={onNavigate} />

      <div className="flex-1">
        <Navbar userName="Srinivas" onLogout={onLogout} />

        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Camera className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Live Camera Feed</h1>
                  <p className="text-muted-foreground">AI-powered face recognition and monitoring</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  connectionStatus === 'connected' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  connectionStatus === 'connecting' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {connectionStatus === 'connected' ? <Wifi className="h-4 w-4" /> :
                   connectionStatus === 'connecting' ? <Zap className="h-4 w-4 animate-pulse" /> :
                   <WifiOff className="h-4 w-4" />}
                  <span className="text-sm font-medium capitalize">{connectionStatus}</span>
                </div>
                <button
                  onClick={toggleStreaming}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    isStreaming
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {isStreaming ? (
                    <>
                      <Square className="h-4 w-4 inline mr-2" />
                      Stop Stream
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 inline mr-2" />
                      Start Stream
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Camera Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Camera View */}
              <div className="bg-card rounded-xl border border-border shadow-custom-md overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">Camera Feed - Main Entrance</h2>
                  <div className="flex items-center gap-4">
                    <select
                      value={cameraQuality}
                      onChange={(e) => setCameraQuality(e.target.value as any)}
                      className="px-3 py-1 text-sm bg-muted border border-border rounded-lg"
                    >
                      <option value="HD">HD (1080p)</option>
                      <option value="SD">SD (720p)</option>
                      <option value="Low">Low (480p)</option>
                    </select>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Settings className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="relative aspect-video bg-black">
                  {isStreaming ? (
                    <>
                      {/* Simulated camera feed with live animation */}
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)] animate-pulse"></div>
                          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,blue,transparent)] animate-spin opacity-10"></div>
                        </div>

                        {/* Camera interface simulation */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="relative">
                              <Camera className="h-20 w-20 mx-auto mb-4 text-blue-400 animate-pulse" />
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"></div>
                            </div>
                            <p className="text-xl font-bold mb-2">Live Camera Feed Active</p>
                            <p className="text-sm opacity-90 mb-4">AI Face Recognition: {cameraQuality}</p>

                            {/* Live indicators */}
                            <div className="flex items-center justify-center gap-6 text-xs">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                <span>REC</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Wifi className="h-3 w-3 text-green-400" />
                                <span>Connected</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Zap className="h-3 w-3 text-yellow-400" />
                                <span>AI Active</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Scanning lines effect */}
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"
                               style={{
                                 animation: 'scan 2s linear infinite',
                                 top: '20%'
                               }}></div>
                          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"
                               style={{
                                 animation: 'scan 2s linear infinite 0.5s',
                                 top: '60%'
                               }}></div>
                        </div>
                      </div>

                      {/* Face detection overlay */}
                      {faceDetected && (
                        <div className="absolute inset-0 border-4 border-green-500 rounded-lg animate-pulse shadow-lg">
                          <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Face Detected
                          </div>
                          <div className="absolute top-2 right-2 bg-black/50 text-white px-3 py-2 rounded-lg text-sm font-medium">
                            Confidence: {aiConfidence}%
                          </div>
                          {/* Corner brackets for face detection */}
                          <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-green-500"></div>
                          <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-green-500"></div>
                          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-green-500"></div>
                          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-green-500"></div>
                        </div>
                      )}

                      {/* AI Processing indicators */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span>AI Processing...</span>
                        </div>
                      </div>

                      {/* Enhanced status indicators */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                        <div className="bg-black/70 text-white px-4 py-2 rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <div className={`w-2 h-2 rounded-full ${faceDetected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                            <span>{faceDetected ? 'Face Detected' : 'No Face'}</span>
                          </div>
                        </div>

                        <div className="bg-black/70 text-white px-4 py-2 rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <Zap className="h-4 w-4 text-yellow-400" />
                            <span>AI: {aiConfidence}%</span>
                          </div>
                        </div>

                        <div className="bg-black/70 text-white px-4 py-2 rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <Camera className="h-4 w-4 text-blue-400" />
                            <span>{cameraQuality}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <Camera className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-lg">Camera Offline</p>
                        <p className="text-sm">Click "Start Stream" to begin monitoring</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Detection Timeline</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { time: "10:30 AM", event: "Face detected - Employee check-in", type: "success" },
                    { time: "11:15 AM", event: "Face temporarily lost - brief movement", type: "warning" },
                    { time: "11:17 AM", event: "Face re-detected - returned to position", type: "success" },
                    { time: "12:00 PM", event: "Multiple faces detected - meeting in progress", type: "info" },
                    { time: "12:30 PM", event: "Face detection stable - focused work", type: "success" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50">
                      <div className={`w-3 h-3 rounded-full ${
                        item.type === 'success' ? 'bg-green-500' :
                        item.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.event}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Face Recognition Status */}
              <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${faceDetected ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    {faceDetected ? <Eye className="h-6 w-6 text-green-500" /> : <EyeOff className="h-6 w-6 text-red-500" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Face Recognition</h3>
                    <p className="text-sm text-muted-foreground">AI-powered detection</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${getDetectionStatusColor()}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Status</span>
                      <span className={`text-sm font-bold ${detectionStatus === 'detected' ? 'text-green-600' : detectionStatus === 'missing' ? 'text-yellow-600' : 'text-gray-600'}`}>
                        {getDetectionStatusText()}
                      </span>
                    </div>
                    {faceDetected && (
                      <div className="text-xs text-muted-foreground">
                        Confidence: {aiConfidence}%
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Last Seen</span>
                    <span className="text-sm text-muted-foreground">
                      {lastSeen ? lastSeen.toLocaleTimeString() : 'Never'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Camera Quality</span>
                    <span className="text-sm font-medium text-blue-500">{cameraQuality}</span>
                  </div>
                </div>
              </div>

              {/* System Alerts */}
              <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-orange-500/10">
                    <AlertTriangle className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">System Alerts</h3>
                    <p className="text-sm text-muted-foreground">Recent notifications</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {alerts.length > 0 ? (
                    alerts.map((alert, index) => (
                      <div key={index} className="p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                          <span className="text-sm text-orange-700 dark:text-orange-300">{alert}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-muted-foreground">
                        <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No alerts at this time</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Camera Settings */}
              <div className="bg-card rounded-xl border border-border shadow-custom-md p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Camera Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Auto-focus</span>
                    <div className="w-10 h-6 bg-green-500 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Face tracking</span>
                    <div className="w-10 h-6 bg-green-500 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Motion detection</span>
                    <div className="w-10 h-6 bg-green-500 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                    </div>
                  </div>

                  <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                    Advanced Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LiveCamera;