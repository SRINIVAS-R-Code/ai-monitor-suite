import { Bell } from "lucide-react";

interface NotificationBellProps {
  count: number;
}

const NotificationBell = ({ count }: NotificationBellProps) => {
  return (
    <button className="relative p-2 rounded-lg hover:bg-muted transition-base">
      <Bell className="h-5 w-5 text-foreground" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
          {count}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;
