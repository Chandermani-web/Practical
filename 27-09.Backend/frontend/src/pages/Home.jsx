import { useContext } from "react";
import { User, MessageSquare, Plus, Camera } from "lucide-react";
import AppContext from "../Context/UseContext";
import { useNavigate } from "react-router-dom";
import LeftSideBar from "../Components/Home/LeftSideBar";
import RightSideBar from "../Components/Home/RightSideBar";
import ShowPost from "../Components/Post/ShowPost";

const Home = () => {
  const navigate = useNavigate();

  const { user, posts } = useContext(AppContext);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <p className="text-gray-400 mb-6">
            Please log in to access your personalized home page
          </p>
          <a
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg inline-block"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white">
      {/* Navigation Header */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - User Info */}
          <div className="lg:col-span-1 lg:block hidden space-y-6">
              <LeftSideBar />
              <RightSideBar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-6">
              <h1 className="text-2xl font-bold mb-2">
                Welcome back, {user.fullname || user.username || "User"}! 👋
              </h1>
              <p className="text-blue-100">
                Here's what's happening in your world today.
              </p>
            </div>

            {/* Create Post */}
            <div
              className="bg-gray-800 rounded-lg p-6 mb-6"
              onClick={() => navigate("/create-post")}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic ? user.profilePic : "/defaultProfile.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-full px-4 py-3 text-left text-gray-300">
                  What's on your mind?
                </button>
                <button className="p-2 text-gray-400 hover:text-white">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm">You joined the platform!</p>
                    <p className="text-xs text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {posts.length > 0 ? (
                  <ShowPost />
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No posts yet. Create the first post!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
