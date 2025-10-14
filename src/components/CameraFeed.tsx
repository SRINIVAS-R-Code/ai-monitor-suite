import { useEffect, useRef, useState } from "react";
import { Camera, Video, VideoOff, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface CameraFeedProps {
  cameraId: string;
  cameraName: string;
  showOverlay?: boolean;
}

const CameraFeed = ({ cameraId, cameraName, showOverlay = true }: CameraFeedProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [detections, setDetections] = useState<number>(0);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
        
        // Simulate face detection
        const interval = setInterval(() => {
          setDetections(Math.floor(Math.random() * 5));
        }, 2000);

        return () => clearInterval(interval);
      }
    } catch (error) {
      console.error("Camera error:", error);
      toast.error("Failed to access camera");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsActive(false);
      setDetections(0);
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="bg-card rounded-xl border border-border shadow-custom-md overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Camera className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{cameraName}</h3>
            <p className="text-sm text-muted-foreground">ID: {cameraId}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isActive && showOverlay && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm font-medium text-success">
                {detections} {detections === 1 ? 'person' : 'people'}
              </span>
            </div>
          )}
          
          {!isActive ? (
            <button
              onClick={startCamera}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-base font-medium"
            >
              <Video className="h-4 w-4" />
              Start Feed
            </button>
          ) : (
            <>
              <button
                onClick={stopCamera}
                className="p-2 rounded-lg hover:bg-muted transition-base"
              >
                <VideoOff className="h-5 w-5 text-destructive" />
              </button>
              <button
                onClick={() => {
                  stopCamera();
                  setTimeout(startCamera, 100);
                }}
                className="p-2 rounded-lg hover:bg-muted transition-base"
              >
                <RefreshCw className="h-5 w-5 text-foreground" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="relative aspect-video bg-sidebar">
        {!isActive ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <VideoOff className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">Camera Offline</p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Click "Start Feed" to activate
              </p>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {showOverlay && detections > 0 && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: detections }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute border-2 border-primary rounded-lg"
                    style={{
                      left: `${20 + i * 25}%`,
                      top: `${30 + i * 10}%`,
                      width: '150px',
                      height: '200px',
                    }}
                  >
                    <div className="absolute -top-8 left-0 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                      Person {i + 1} • 98%
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg">
              <p className="text-white text-sm font-medium">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </>
        )}
      </div>

      {isActive && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">{detections}</p>
              <p className="text-xs text-muted-foreground">Detected</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">97.8%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">24fps</p>
              <p className="text-xs text-muted-foreground">Frame Rate</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraFeed;
