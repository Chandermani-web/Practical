import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [allUser, setAllUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [commentIdForFetching, setCommentIdForFetching] = useState(null);
  const [comments, setComments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [friendList, setFriendList] = useState([]);

  const [auth, setAuth] = useState(() => {
    return localStorage.getItem("auth") === "true" ? true : false;
  });

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log("Fetched user:", data);
      setUser(data.user);
      if (data.user.email) {
        localStorage.setItem("auth", "true");
      } else {
        localStorage.setItem("auth", "false");
      }
    } catch (err) {
      console.error("Error fetching user:", err.message);
      localStorage.setItem("auth", "false");
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log("Fetched posts:", data);
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err.message);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/posts/${commentIdForFetching}/comment`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log("Fetched comments:", data);
      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/AllUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setAllUser(data.data); // assuming your API returns { data: [...] }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/friends/requests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log("Fetched friend requests:", data);
      setRequests(data.requests || []);
    } catch (err) {
      console.error("Error fetching friend requests:", err);
    }
  };
  
  const fetchFriendlist = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/friends/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log("Fetched friend list:", data);
      // You can set this data to a state if needed
      setFriendList(data.friends || []);
    } catch (err) {
      console.error("Error fetching friend list:", err);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchPosts();
    fetchFriendRequests();
    fetchFriendlist();
    fetchAllUser();
  }, []);

  useEffect(() => {
    if (commentIdForFetching) {
      fetchComments();
    }
  }, [commentIdForFetching]);

  const value = {
    user,
    setUser,
    allUser,
    setAllUser,
    requests,
    setRequests,
    friendList,
    setFriendList,
    posts,
    setPosts,
    fetchPosts,
    fetchUser,
    fetchAllUser,
    fetchComments,
    fetchFriendRequests,
    fetchFriendlist,
    auth,
    setAuth,
    comments,
    setComments,
    commentIdForFetching,
    setCommentIdForFetching,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
