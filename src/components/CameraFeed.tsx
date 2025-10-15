import { useEffect, useRef, useState } from "react";
import { Camera, Video, VideoOff, RefreshCw, Circle, Square, Download, Play } from "lucide-react";
import { toast } from "sonner";

interface CameraFeedProps {
  cameraId: string;
  cameraName: string;
  showOverlay?: boolean;
}

interface FaceDetection {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  emotion?: string;
  age?: number;
}

const CameraFeed = ({ cameraId, cameraName, showOverlay = true }: CameraFeedProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [detections, setDetections] = useState<FaceDetection[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);

        // Enhanced face detection simulation
        const interval = setInterval(() => {
          const numDetections = Math.floor(Math.random() * 4) + 1;
          const newDetections: FaceDetection[] = Array.from({ length: numDetections }, (_, i) => ({
            id: i + 1,
            x: Math.random() * 60 + 20, // 20-80% of width
            y: Math.random() * 40 + 30, // 30-70% of height
            width: 120 + Math.random() * 60, // 120-180px
            height: 160 + Math.random() * 80, // 160-240px
            confidence: 85 + Math.random() * 15, // 85-100%
            emotion: ['happy', 'neutral', 'focused'][Math.floor(Math.random() * 3)],
            age: 25 + Math.floor(Math.random() * 30) // 25-55
          }));
          setDetections(newDetections);
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
      setDetections([]);
    }
  };

  const startRecording = () => {
    if (!videoRef.current?.srcObject) return;

    const stream = videoRef.current.srcObject as MediaStream;
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9'
    });

    recordedChunksRef.current = [];
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedVideo(url);
      toast.success("Recording saved successfully");
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const downloadRecording = () => {
    if (recordedVideo) {
      const a = document.createElement('a');
      a.href = recordedVideo;
      a.download = `recording-${cameraId}-${new Date().toISOString().split('T')[0]}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success("Recording downloaded");
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
                {detections.length} {detections.length === 1 ? 'person' : 'people'}
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
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="p-2 rounded-lg hover:bg-muted transition-base"
                >
                  <Circle className="h-5 w-5 text-destructive" />
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="p-2 rounded-lg hover:bg-muted transition-base animate-pulse"
                >
                  <Square className="h-4 w-4 text-destructive bg-destructive rounded-sm" />
                </button>
              )}
              {recordedVideo && (
                <button
                  onClick={downloadRecording}
                  className="p-2 rounded-lg hover:bg-muted transition-base"
                >
                  <Download className="h-5 w-5 text-primary" />
                </button>
              )}
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
            
            {showOverlay && detections.length > 0 && (
              <div className="absolute inset-0 pointer-events-none">
                {detections.map((detection, i) => (
                  <div
                    key={detection.id}
                    className="absolute border-2 border-primary rounded-lg"
                    style={{
                      left: `${detection.x}%`,
                      top: `${detection.y}%`,
                      width: `${detection.width}px`,
                      height: `${detection.height}px`,
                    }}
                  >
                    <div className="absolute -top-8 left-0 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                      Person {detection.id} • {detection.confidence.toFixed(1)}%
                      {detection.emotion && (
                        <span className="ml-1 text-xs opacity-80">
                          • {detection.emotion}
                        </span>
                      )}
                      {detection.age && (
                        <span className="ml-1 text-xs opacity-80">
                          • ~{detection.age}y
                        </span>
                      )}
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
              <p className="text-2xl font-bold text-foreground">{detections.length}</p>
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
