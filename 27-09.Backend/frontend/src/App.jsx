import { useEffect, useContext } from "react";
import AppContext from "./Context/UseContext";
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import Navbar from "./Components/Common/Navbar";

const App = () => {
  const { fetchUser, auth, fetchPosts } = useContext(AppContext);

  useEffect(() => {
    fetchUser();
    fetchPosts();
  },[]);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={auth ? <Home /> : <Login />} />
        <Route path="/profile" element={auth ? <Profile /> : <Login />} />
        <Route path="/signup" element={auth ? <Home /> : <Signup />} />
        <Route path="/login" element={auth ? <Home /> : <Login />} />
        <Route path="/create-post" element={auth ? <CreatePost /> : <Login />} />
      </Routes>
    </div>
  );
};

export default App;