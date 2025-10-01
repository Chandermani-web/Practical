import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../Context/UseContext";

const Comment = ({ id }) => {
  const [comment, setComment] = useState("");
  const { posts, setPosts, fetchPosts, comments } = useContext(AppContext);

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

  useEffect(() => {
    fetchPosts();
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
              <div key={cmt._id} className="mt-4 p-2 border-b border-gray-300">
                <div className="flex items-center mb-2 space-x-2">
                  <img src="/avatar.svg" alt="" className="w-5 h-5 rounded-full" />
                  <h1 className="font-semibold text-gray-300">@{cmt.user.username}</h1>
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
