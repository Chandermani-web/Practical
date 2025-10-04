import { useContext, useEffect } from "react";
import AppContext from "../../Context/UseContext";
import { Loader, ThumbsUp, UserPlus, MessageCircle, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShowNotification = () => {
  const navigate = useNavigate();
  const { user, notifications, loading, fetchNotifications } =
    useContext(AppContext);

  // Fetch notifications
  useEffect(() => {
    if (!user) return;
    fetchNotifications();
  }, [user]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return <ThumbsUp className="w-5 h-5 text-pink-500" />;
      case "friend_request":
        return <UserPlus className="w-5 h-5 text-blue-400" />;
      case "comment":
        return <MessageCircle className="w-5 h-5 text-green-400" />;
      default:
        return <Bell className="w-5 h-5 text-purple-400" />;
    }
  };

  const getNotificationStyle = (type) => {
    const baseStyle =
      "relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-2xl";

    switch (type) {
      case "like":
        return `${baseStyle} bg-gradient-to-br from-pink-500/10 to-rose-600/10 border-pink-500/30 hover:border-pink-400`;
      case "friend_request":
        return `${baseStyle} bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border-blue-500/30 hover:border-blue-400`;
      case "comment":
        return `${baseStyle} bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/30 hover:border-green-400`;
      default:
        return `${baseStyle} bg-gradient-to-br from-purple-500/10 to-violet-600/10 border-purple-500/30 hover:border-purple-400`;
    }
  };

  const handleNotificationClick = async (n) => {
    try {
      const res = await fetch("/api/notifications/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId: n._id }),
      });
      if (res.ok) {
        // Navigate based on notification type
        if (n.type === "friend_request" && n.fromUser) {
          navigate(`/profile/${n.fromUser._id}`);
        } else if (n.type === "post") {
          navigate(`/post/${n.post._id}`);
        } else if (n.type === "message" && n.fromUser) {
          navigate(`/chat/${n.fromUser._id}`);
        } else if (n.type === "like") {
          navigate("");
        }
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader className="w-8 h-8 text-purple-400 animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-purple-200 font-light">Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto border border-purple-500/30">
            <Bell className="w-12 h-12 text-purple-400 opacity-60" />
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            All Caught Up!
          </h2>
          <p className="text-purple-200 font-light max-w-md">
            You're all set! No new notifications right now. We'll let you know
            when something exciting happens.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-2xl mb-4">
            <Bell className="w-6 h-6 text-purple-400" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Notifications
            </h1>
            <div className="bg-purple-500 text-white text-sm px-2 py-1 rounded-full min-w-6 h-6 flex items-center justify-center">
              {notifications.length}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={getNotificationStyle(n.type)}
              onClick={() => handleNotificationClick(n)}
            >
              <div className="flex items-start space-x-4">
                {/* Avatar with Gradient Border */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-30"></div>
                  <img
                    src={n.fromUser?.profilePic || "/avatar.svg"}
                    alt=""
                    className="relative w-12 h-12 rounded-full object-cover border-2 border-gray-900"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    {getNotificationIcon(n.type)}
                    <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                      @{n.fromUser?.username || "Unknown User"}
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(n.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="text-gray-100 text-lg leading-relaxed">
                    {n.message}
                  </p>

                  {/* Media Preview */}
                  {(n.post?.image || n.post?.video) && (
                    <div className="mt-3 p-3 bg-black/20 rounded-xl border border-white/10">
                      {n.post.image && (
                        <img
                          src={n.post.image}
                          alt=""
                          className="w-full max-w-xs rounded-lg shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300"
                        />
                      )}
                      {n.post.video && (
                        <video
                          src={n.post.video}
                          controls
                          className="w-full max-w-xs rounded-lg shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300"
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Action Indicator */}
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Gradient Accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-b-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowNotification;
