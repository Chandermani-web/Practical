import { useContext } from "react";
import AppContext from "./Context/UseContext";
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreatePost from "./Components/Post/CreatePost";
import Navbar from "./Components/Common/Navbar";
import Connection from "./pages/Connection";
import User_Profile from "./Components/Connections/Page/User_Profile";
import Notification from "./pages/Notification";
import ShowPost from "./Components/Post/ShowPost";
import NotificationPopupManager from "./Context/NotificationProvider";


const App = () => {
  const { auth } = useContext(AppContext);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-50">
      <Navbar />

      <Routes>
        <Route path="/" element={auth ? <Home /> : <Login />} />
        <Route path="/profile" element={auth ? <Profile /> : <Login />} />
        <Route path="/signup" element={auth ? <Home /> : <Signup />} />
        <Route path="/login" element={auth ? <Home /> : <Login />} />
        <Route path="/create-post" element={auth ? <CreatePost /> : <Login />} />
        <Route path="/posts" element={auth ? <ShowPost /> : <Login />} />
        <Route path="/connections" element={auth ? <Connection /> : <Login />} />
        <Route path="/profile/:id" element={auth ? <User_Profile /> : <Login />} />
        <Route path="/notifications" element={auth ? <Notification /> : <Login />} />
      </Routes>
      <NotificationPopupManager />
    </div>
  );
};

export default App;