import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/UseContext";
import { Heart, MessageCircle, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import Comment from "./Service/Comment";
import { useSocket } from "../../Context/SocketContext";

const ShowPost = () => {
  const [openCommentBoxId, setOpenCommentBoxId] = useState(null); // store postId instead of boolean
  const [expandedPostId, setExpandedPostId] = useState(null);
  const { posts, user, setPosts, setComments, setCommentIdForFetching } =
    useContext(AppContext);

  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("newPost", (post) => {
      setPosts((prev) => [post, ...prev]);
    });

    socket.on("updateLikes", ({ postId, likes }) => {
      setPosts((prev) =>
        prev.map((p) => (p._id === postId ? { ...p, likes } : p))
      );
    });

    // NEW: correct listener for new populated comment
    socket.on("newComment", ({ postId, comment }) => {
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, comments: [...(p.comments || []), comment] } // append to end (latest = last index)
            : p
        )
      );
      setComments((prev) => [...prev, comment]); // also update global comments state
    });

    // NEW: listener for deleted comment
    socket.on("deleteComment", ({ postId, commentId, updatedComments }) => {
      // Update posts array
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, comments: updatedComments } : p
        )
      );

      // Remove only that comment from the global comments state
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    });

    return () => {
      socket.off("newPost");
      socket.off("updateLikes");
      socket.off("newComment");
      socket.off("deleteComment");
    };
  }, [socket, setPosts]);

  const handleLike = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${encodeURIComponent(
          postId
        )}/likeandunlike`,
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

  if (!posts) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p>Please log in to view posts.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      {posts?.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-800 rounded-2xl shadow-lg p-3 space-y-3"
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
              <p
                className={`text-gray-200 ${
                  expandedPostId === post._id ? "" : "line-clamp-3"
                }`}
              >
                {" "}
                {post.content}
              </p>
              <button
                className="text-blue-400 hover:underline"
                onClick={() =>
                  setExpandedPostId(
                    expandedPostId === post._id ? null : post._id
                  )
                }
              >
                {" "}
                {expandedPostId === post._id ? "See Less" : "See More"}{" "}
              </button>

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
                  className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                  onClick={() => handleLike(post._id)}
                >
                  <ThumbsUp
                    className={`w-5 h-5 ${
                      post.likes?.includes(user?._id) ? "text-blue-500" : ""
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

              {/* display likes and comments */}
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
