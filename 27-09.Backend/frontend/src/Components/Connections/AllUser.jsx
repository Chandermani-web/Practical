import { useContext, useEffect, useState } from "react";
import 'remixicon/fonts/remixicon.css';
import AppContext from "../../Context/UseContext";

const AllUser = () => {
  const { user, allUser, fetchAllUser } = useContext(AppContext);
  const [displayUsers, setDisplayUsers] = useState([]);

  useEffect(() => {
    fetchAllUser();
  }, []);

  // Update displayUsers when allUser or user changes
  useEffect(() => {
    if (allUser && user) {
      const filtered = allUser.filter(
        u => u._id !== user._id && !user.following?.some(f=> f._id === u._id)
      );
      setDisplayUsers(filtered);
    }
  }, [allUser, user]);

  const handleSendFriendRequest = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/friends/send-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ receiverId: userId }),
      });

      const data = await response.json();
      console.log("Friend request sent:", data);

      // Remove the user from displayUsers immediately
      setDisplayUsers(prev => prev.filter(u => u._id !== userId));
    } catch (err) {
      console.error("Error sending friend request:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {displayUsers?.length > 0 ? (
        displayUsers.map((u) => (
          <div key={u._id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="h-24 w-full overflow-hidden">
              <img
                src={u.coverPic || "/default-cover.jpg"}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 text-white">
              <div className="flex items-center space-x-3">
                <img
                  src={u.profilePic || "/avatar.svg"}
                  alt={u.fullname}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white -mt-10"
                />
                <div>
                  <h3 className="font-semibold text-lg">{u.fullname}</h3>
                  <p className="text-sm text-gray-400">@{u.username}</p>
                </div>
              </div>

              <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                {u.bio || "No bio available"}
              </p>

              <p className="text-xs text-gray-400 mt-2">{u.email}</p>

              {u.location && <p className="text-xs text-gray-400">📍 {u.location}</p>}

              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full"
                onClick={() => handleSendFriendRequest(u._id)}
              >
                <i className="ri-user-add-line mr-2"></i>
                Add Friend
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-white">No Users Found</h1>
      )}
    </div>
  );
};

export default AllUser;
