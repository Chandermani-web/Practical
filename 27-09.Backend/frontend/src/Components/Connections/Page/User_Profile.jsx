import { useContext, useState, useEffect } from "react";
import {
  User,
  MapPin,
  Globe,
  Calendar,
  Heart,
  MessageCircle,
} from "lucide-react";
import AppContext from "../../../Context/UseContext.jsx";
import { Link, useParams } from "react-router-dom";
import Comment from "../../Post/Service/Comment.jsx";

const User_Profile = () => {
    const { id } = useParams();
  const [user, setUser] = useState({});
  const [openCommentBoxId, setOpenCommentBoxId] = useState(null);
  const { posts, setCommentIdForFetching, setPosts, fetchComments } = useContext(AppContext);

  const getUser = async () => {
    try {
      if (!id) return;
      const res = await fetch(
        `http://localhost:5000/api/friends/getfriend/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
        const data = await res.json();
        if (res.ok) {
            console.log("Fetched user data:", data);
            setUser(data.friend);
        } else {
            console.error("Failed to fetch user:", data.message);
        }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}/likeandunlike`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log("Like response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to like post");
      }

      if (data.success) {
        // immutably update posts
        const updatedPosts = posts.map((post) =>
          post._id === postId ? { ...post, likes: data.updatedLikes } : post
        );
        setPosts(updatedPosts);
      }
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };
  useEffect(() => {
    getUser();
    if (openCommentBoxId) {
      fetchComments();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-full mx-auto p-6 ">
        {/* Cover Photo */}
        <div className="relative h-64 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg mb-6">
          {user.coverPic && (
            <img
              src={user.coverPic}
              alt="Cover"
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
              {user.profilePic ? (
                <img
                  src={
                    user.profilePic ? user.profilePic : "/defaultProfile.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-400" />
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold">
                {user.fullname || user.username || "Anonymous User"}
              </h1>
              {user.isVerified && (
                <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Verified
                </div>
              )}
            </div>
            <p className="text-gray-400 mb-2">@{user.username || "username"}</p>
            {user.bio && <p className="text-gray-300 mb-4">{user.bio}</p>}

            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </div>
              )}
              {user.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400"
                  >
                    {user.website}
                  </a>
                </div>
              )}
              {user.dateOfBirth && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">{user.posts?.length || 0}</div>
            <div className="text-gray-400">Posts</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">
              {user.followers?.length || 0}
            </div>
            <div className="text-gray-400">Followers</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">
              {user.following?.length || 0}
            </div>
            <div className="text-gray-400">Following</div>
          </div>
        </div>

        {/* Social Links Display */}
        {user.socialLinks &&
          Object.values(user.socialLinks).some((link) => link) && (
            <div className="bg-gray-800 p-6 rounded-lg mt-6">
              <h3 className="text-lg font-semibold mb-4">Social Links</h3>
              <div className="flex flex-wrap gap-4">
                {user.socialLinks.twitter && (
                  <a
                    href={user.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                  >
                    <span>Twitter</span>
                  </a>
                )}
                {user.socialLinks.instagram && (
                  <a
                    href={user.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300 flex items-center gap-2"
                  >
                    <span>Instagram</span>
                  </a>
                )}
                {user.socialLinks.linkedin && (
                  <a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 flex items-center gap-2"
                  >
                    <span>LinkedIn</span>
                  </a>
                )}
                {user.socialLinks.github && (
                  <a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-300 flex items-center gap-2"
                  >
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          )}

        {/* Interests */}
        {user.interests && user.interests.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg mt-6">
            <h3 className="text-lg font-semibold mb-4">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-12 mb-6">
          <h3 className="text-2xl text-gray-200 font-semibold">Recent Posts</h3>
        </div>

        {posts
          ?.filter((post) => post.user._id === user._id) // only user’s posts
          .map((post) => (
            <div
              key={post._id}
              className="bg-gray-800 rounded-2xl shadow-lg p-4 space-y-3 max-w-4xl mb-6 mx-auto"
            >
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <img
                  src={post.profilePic || "/avatar.svg"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <Link
                    to={`/profile/${post.user.username}`}
                    className="font-semibold hover:underline"
                  >
                    @{post.user.username}
                  </Link>
                  <p className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-200">{post.content}</p>

              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="rounded-lg max-h-96 object-contain w-full"
                />
              )}

              {post.video && (
                <video
                  src={post.video}
                  controls
                  className="rounded-lg w-full max-h-96"
                />
              )}

              {/* Actions */}
              <div className="flex space-x-6 text-gray-400 mt-2">
                <button
                  className="flex items-center space-x-1 hover:text-red-400 transition-colors"
                  onClick={() => handleLike(post._id)}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      post.likes?.includes(user._id) ? "text-red-500" : ""
                    }`}
                  />
                  <span>{post.likes?.length || 0}</span>
                </button>

                <button
                  className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                  onClick={() => {
                    setOpenCommentBoxId(
                      openCommentBoxId === post._id ? null : post._id
                    );
                    setCommentIdForFetching(post._id);
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments?.length || 0}</span>
                </button>
              </div>

              {openCommentBoxId === post._id && <Comment id={post._id} />}
            </div>
          ))}
      </div>
    </div>
  );
};

export default User_Profile;
