import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../Context/UseContext";

const Comment = ({ id }) => {
  const [comment, setComment] = useState("");
  const [deleteOptionOpen, setDeleteOptionOpen] = useState(false);
  const { posts, setPosts, fetchPosts, fetchComments, comments } = useContext(AppContext);

  const handleComment = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ text: comment }),
      });
      const data = await res.json();
      console.log("Fetched comments:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to add comment");
      }

      if (data.updatedComment) {
        const updatedPosts = posts.map((post) =>
          post._id === id
            ? { ...post, comments: data.updatedComment } // replace comments array
            : post
        );
        setPosts(updatedPosts);
        setComment(""); // clear input after posting
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/posts/${id}/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log("Delete response:", data);
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete comment");
      }
      if (data.updatedComments) {
        const updatedPosts = posts.map((post) =>
          post._id === id
            ? { ...post, comments: data.updatedComments } // replace comments array
            : post
        );
        setPosts(updatedPosts);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, []);

  return (
    <div className="mt-4">
      <textarea
        placeholder="Write a comment..."
        className="w-full p-2 border border-gray-300 rounded-lg"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={handleComment}
      >
        Post Comment
      </button>

      <div className="mt-6 mx-3">
        {
          comments && comments.length > 0 ? (
            comments.map((cmt) => (
              <div key={cmt._id} className="mt-4 p-2 border-b border-gray-300 relative">
                <div className="absolute top-0 right-0 mt-2 mr-2">
                  <i className="ri-more-2-fill" onClick={() => setDeleteOptionOpen(!deleteOptionOpen)}></i>
                  <div className={`absolute right-0 border-2 border-gray-400 rounded-lg shadow-lg ${deleteOptionOpen ? 'block' : 'hidden'}`}>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleDeleteComment(cmt._id)}>Delete</button>
                  </div>
                </div>      
                <div className="flex items-center mb-2 space-x-2">
                  <img src={cmt.user?.profilePic} alt="" className="w-5 h-5 rounded-full" />
                  <div className="leading-4">
                    <h1 className="font-semibold text-gray-300">@{cmt.user.username}</h1>
                    <span className="text-xs text-gray-500">{new Date(cmt.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-sm">{cmt.text}</p>
              </div>
            ))
          ) : (
            <p className="mt-4 text-gray-500">No comments yet.</p>
          )
        }
      </div>
    </div>
  );
};

export default Comment;
