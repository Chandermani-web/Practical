import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/UseContext";
import { Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Comment from "./Service/Comment";

const ShowPost = () => {
  const [openCommentBoxId, setOpenCommentBoxId] = useState(null); // store postId instead of boolean
  const {
    posts,
    user,
    setPosts,
    fetchPosts,
    fetchComments,
    setCommentIdForFetching,
  } = useContext(AppContext);

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
    fetchPosts();
    if (openCommentBoxId) {
      fetchComments();
    }
  }, [openCommentBoxId]);

  if (!posts) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p>Please log in to view posts.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      {posts?.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-800 rounded-2xl shadow-lg p-4 space-y-3"
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

              {/* Image */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="rounded-lg max-h-96 object-contain w-full"
                />
              )}

              {/* Video */}
              {post.video && (
                <video
                  src={post.video}
                  controls
                  className="rounded-lg w-full max-h-96"
                />
              )}

              {/* Actions */}
              <div className="flex space-x-6 text-gray-400 mt-2">
                {/* Like Button */}
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

                {/* Comment Button */}
                <button
                  className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                  onClick={() => {
                    setOpenCommentBoxId(
                      openCommentBoxId === post._id ? null : post._id
                    );
                    setCommentIdForFetching(post._id); // Set the post ID for fetching comments
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments?.length || 0}</span>
                </button>
              </div>

              {/* Only open clicked post's comment box */}
              {openCommentBoxId === post._id && <Comment id={post._id} />}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No posts yet.</p>
      )}
    </div>
  );
};

export default ShowPost;
