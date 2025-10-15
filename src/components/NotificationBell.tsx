import { useState } from "react";
import { Bell } from "lucide-react";

interface NotificationBellProps {
   count: number;
   userName?: string;
   onNavigate?: (page: string) => void;
}

const NotificationBell = ({ count, userName, onNavigate }: NotificationBellProps) => {
   const [isOpen, setIsOpen] = useState(false);

   const notifications = [
     { id: 1, title: "Face not detected", message: "Face detection failed for 2 minutes", time: "2 min ago", type: "warning" },
     { id: 2, title: "Check-in reminder", message: "Don't forget to check in for today", time: "1 hour ago", type: "info" },
     { id: 3, title: "System alert", message: "AI engine performance optimized", time: "3 hours ago", type: "success" },
   ];

   return (
     <div className="relative">
       <button
         onClick={() => setIsOpen(!isOpen)}
         className="relative p-2 rounded-lg hover:bg-muted transition-base"
       >
         <Bell className="h-5 w-5 text-foreground" />
         {count > 0 && (
           <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
             {count}
           </span>
         )}
       </button>

       {/* Notification Dropdown */}
       {isOpen && (
         <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-xl z-50">
           <div className="p-4 border-b border-border">
             <h3 className="font-semibold text-foreground">Notifications</h3>
             <p className="text-sm text-muted-foreground">You have {count} unread notifications</p>
           </div>

           <div className="max-h-64 overflow-y-auto">
             {notifications.map((notification) => (
               <div key={notification.id} className="p-4 border-b border-border hover:bg-muted/50 transition-base cursor-pointer">
                 <div className="flex items-start gap-3">
                   <div className={`w-2 h-2 rounded-full mt-2 ${
                     notification.type === 'warning' ? 'bg-yellow-500' :
                     notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                   }`}></div>
                   <div className="flex-1">
                     <h4 className="text-sm font-medium text-foreground">{notification.title}</h4>
                     <p className="text-sm text-muted-foreground">{notification.message}</p>
                     <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                   </div>
                 </div>
               </div>
             ))}
           </div>

           <div className="p-4 border-t border-border">
             <button
               className="w-full text-sm text-primary hover:text-primary/80 font-medium"
               onClick={() => {
                 // Close the dropdown and navigate to notifications page
                 setIsOpen(false);
                 onNavigate?.('notifications');
               }}
             >
               View all notifications
             </button>
           </div>
         </div>
       )}

       {/* Overlay to close dropdown */}
       {isOpen && (
         <div
           className="fixed inset-0 z-40"
           onClick={() => setIsOpen(false)}
         />
       )}
     </div>
   );
};

export default NotificationBell;
