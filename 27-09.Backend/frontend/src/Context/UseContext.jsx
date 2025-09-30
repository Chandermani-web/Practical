import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
    const [auth, setAuth] = useState(false);

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
            if(data.user.email) {
              setAuth(true);
            } else {
              setAuth(false);
            }
        } catch (err) {
            console.error("Error fetching user:", err.message);
        }
    };

    const value = { user, setUser, posts, setPosts, fetchPosts, fetchUser , auth, setAuth };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContext;