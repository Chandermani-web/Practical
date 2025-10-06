import { useSocket } from "../../Context/SocketContext";
import { useContext, useEffect } from "react";
import AppContext from "../../Context/UseContext";

import { Loader, ThumbsUp, UserPlus, MessageCircle, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShowNotification = () => {
  const navigate = useNavigate();
  const { user, notifications, loading, fetchNotifications, setNotifications } =
    useContext(AppContext);
  const { notifications: socketNotifications } = useSocket();

  useEffect(() => {
    if (user) fetchNotifications();
  }, [user]);

  // 👇 New useEffect to merge socket notifications
  useEffect(() => {
    if (socketNotifications?.length > 0) {
      setNotifications((prev) => [
        ...socketNotifications.filter(
          (sn) => !prev.some((pn) => pn._id === sn._id)
        ),
        ...prev,
      ]);
    }
  }, [socketNotifications]);

  const handleNotificationClick = async (n) => {
    try {
      const res = await fetch("http://localhost:5000/api/notifications/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId: n._id }),
        credentials: "include",
      });
      if (res.ok) {
        if (n.type === "friend_request" && n.fromUser) {
          navigate(`/connections`);
        } else if (n.type === "post") {
          navigate(`/posts`);
        } else if (n.type === "message" && n.fromUser) {
          navigate(`/chat/${n.fromUser._id}`);
        }
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="text-center space-y-4">
          <Loader className="w-10 h-10 text-blue-400 animate-spin mx-auto" />
          <p className="text-blue-300 font-light">Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="text-center space-y-6">
          <div className="w-28 h-28 bg-gradient-to-tr from-blue-600/20 to-cyan-500/10 border border-blue-400/30 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-900/40">
            <Bell className="w-14 h-14 text-blue-400 opacity-70" />
          </div>
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            All Caught Up!
          </h2>
          <p className="text-gray-400 max-w-sm mx-auto">
            You’re all set — no new notifications right now. We’ll notify you
            when something exciting happens!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl shadow-lg shadow-blue-900/20">
            <Bell className="w-6 h-6 text-blue-400 animate-bounce" />
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Notifications
            </h1>
            <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full">
              {notifications.filter((u) => u.isRead === false).length}
            </span>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-5">
          {notifications.map((n, index) => (
            <div
              key={n._id || index}
              onClick={() => handleNotificationClick(n)}
              className={`group flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 hover:border-blue-500/30 hover:scale-[1.02] cursor-pointer relative`}
            >
              {!n.isRead && (
                <span className="absolute -left-1 -top-1 w-5 h-5 bg-green-400 rounded-full animate-pulse"></span>
              )}
              <img
                src={n.fromUser?.profilePic || "/avatar.svg"}
                className="h-12 w-12 rounded-full border-2 border-blue-500/30 object-cover shadow-md"
                alt="user"
              />

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-blue-300 font-medium">
                    @{n.fromUser?.username || "Unknown User"}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-snug">
                  {n.message || "No message available"}
                </p>

                {/* Like Notification */}
                {n.type === "like" && (
                  <div className="mt-3 flex items-center gap-3 bg-blue-500/5 border border-blue-500/20 rounded-xl p-2.5 relative">
                    <ThumbsUp className="w-5 h-5 text-blue-400 absolute top-0 right-0" />
                    {n.post?.image && (
                      <img
                        src={n.post.image}
                        className="h-12 w-12 object-cover rounded-lg border border-white/10"
                        alt="Post"
                      />
                    )}
                    <p className="text-gray-400 text-xs line-clamp-2">
                      {n.post?.content || "Post liked"}
                    </p>
                  </div>
                )}

                {/* Post Notification */}
                {n.type === "post" && (
                  <div className="mt-3 flex items-center gap-3 bg-blue-500/5 border border-blue-500/20 rounded-xl p-2.5">
                    {n.post?.image && (
                      <img
                        src={n.post.image}
                        className="h-12 w-12 object-cover rounded-lg border border-white/10"
                        alt="Post"
                      />
                    )}
                    <p className="text-gray-400 text-xs line-clamp-2">
                      {n.post?.content || "Post liked"}
                    </p>
                  </div>
                )}

                {/* Friend Request */}
                {n.type === "friend_request" && (
                  <div className="mt-3 flex items-center gap-2 bg-green-500/5 border border-green-500/20 rounded-xl p-2.5">
                    <UserPlus className="w-5 h-5 text-green-400" />
                    <p className="text-gray-400 text-xs">
                      {n.message || "Sent you a friend request"}
                    </p>
                  </div>
                )}

                {/* Message */}
                {n.type === "message" && (
                  <div className="mt-3 flex items-center gap-2 bg-purple-500/5 border border-purple-500/20 rounded-xl p-2.5">
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                    <p className="text-gray-400 text-xs">
                      {n.message || "New message received"}
                    </p>
                  </div>
                )}

                {/* Comment Notification */}
                {n.type === "comment" && (
                  <div className="flex flex-col">

                    <div className="mt-3 flex items-center gap-3 bg-blue-500/5 border border-blue-500/20 rounded-xl p-2.5">
                      <ThumbsUp className="w-5 h-5 text-blue-400" />
                      {n.post?.image && (
                        <img
                          src={n.post.image}
                          className="h-12 w-12 object-cover rounded-lg border border-white/10"
                          alt="Post"
                        />
                      )}
                      <p className="text-gray-400 text-xs line-clamp-2">
                        {n.post?.content || "Post liked"}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center gap-2 bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-2.5">
                      <MessageCircle className="w-5 h-5 text-yellow-400" />
                      <p className="text-gray-400 text-xs">
                        {n.post?.comments?.[0].text || "New comment received"}
                      </p>
                    </div>

                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowNotification;
