import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import CameraFeed from "@/components/CameraFeed";

interface CameraMonitoringProps {
  onLogout: () => void;
  onNavigate?: (page: string) => void;
}

const CameraMonitoring = ({ onLogout, onNavigate }: CameraMonitoringProps) => {
  const cameras = [
    { id: "CAM-001", name: "Main Entrance" },
    { id: "CAM-002", name: "Office Floor 1" },
    { id: "CAM-003", name: "Office Floor 2" },
    { id: "CAM-004", name: "Conference Room" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" activePage="cameras" onNavigate={onNavigate} />
      
      <div className="flex-1">
        <Navbar userName="Admin" onLogout={onLogout} />
        
        <main className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Camera Monitoring</h1>
            <p className="text-muted-foreground">Live feeds from all cameras with AI face detection</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cameras.map((camera) => (
              <CameraFeed
                key={camera.id}
                cameraId={camera.id}
                cameraName={camera.name}
                showOverlay={true}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CameraMonitoring;
