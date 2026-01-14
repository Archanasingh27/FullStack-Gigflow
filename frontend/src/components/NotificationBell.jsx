import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { useApp } from "../context/AuthContext";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

const NotificationBell = () => {
  const { user } = useApp();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    socket.emit("join", user._id);

    socket.on("hired", (data) => {
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: data.message,
          read: false,
        },
        ...prev,
      ]);

      toast.success(data.message, { icon: "🎉" });
    });

    return () => socket.off("hired");
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell size={22} />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg border rounded-md z-50">
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">
              No notifications
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 border-b text-sm cursor-pointer ${
                  n.read ? "bg-white" : "bg-blue-50"
                }`}
                onClick={() =>
                  setNotifications((prev) =>
                    prev.map((item) =>
                      item.id === n.id
                        ? { ...item, read: true }
                        : item
                    )
                  )
                }
              >
                {n.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
