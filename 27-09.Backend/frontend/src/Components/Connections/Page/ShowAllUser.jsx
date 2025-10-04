import { useContext, useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import AppContext from "../../../Context/UseContext";
import ReceiveRequestConnection from "./ReceiveRequestConnection";
import { useNavigate } from "react-router-dom";

const ShowAllUser = () => {
  const { user, allUser, fetchAllUser, requests } = useContext(AppContext);
  const [displayUsers, setDisplayUsers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUser();
  }, []);

  // Update displayUsers when allUser or user changes
  useEffect(() => {
    if (allUser && user) {
      const filtered = allUser.filter(
        (u) =>
          u._id !== user._id &&
          !user.following?.some((f) => f._id === u._id) &&
          !user.followers?.some((f) => f._id === u._id)
      );

      setDisplayUsers(filtered);
    }
  }, [allUser, user]);

  const handleSendFriendRequest = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/friends/send-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ receiverId: userId }),
        }
      );

      const data = await response.json();
      console.log("Friend request sent:", data);

      // Remove the user from displayUsers immediately
      setDisplayUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error("Error sending friend request:", err);
    }
  };

  return (
    <div>
      {requests.length > 0 && (
        <>
          <h1 className="text-white text-2xl ml-4">
            Receive Connection Requests
          </h1>
          <ReceiveRequestConnection />
          <hr className="my-4" />
        </>
      )}

      <h1 className="text-white text-2xl font-semibold ml-5">
        Suggestion For You
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {displayUsers?.length > 0 ? (
          displayUsers.map((u) => (
            <div
              key={u._id}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Cover Image */}
              <div className="h-28 w-full overflow-hidden">
                <img
                  src={u.coverPic || "/default-cover.jpg"}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 text-white">
                {/* Profile Info */}
                <div className="flex items-center space-x-4 ">
                  <img
                    src={u.profilePic || "/avatar.svg"}
                    alt={u.fullname}
                    className="w-16 h-16 rounded-full border-4 border-indigo-500 object-cover -mt-10"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-white">
                      {u.fullname}
                    </h3>
                    <p className="text-sm text-indigo-400">@{u.username}</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-300 mt-3 line-clamp-2">
                  {u.bio || "No bio available"}
                </p>

                {/* Email & Location */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <p className="text-xs text-gray-400">{u.email}</p>
                    {u.location && (
                      <p className="text-xs text-gray-400">📍 {u.location}</p>
                    )}
                  </div>
                  <p
                    className="text-xs text-purple-400 font-medium cursor-pointer hover:text-purple-300 transition-colors"
                    onClick={() => navigate(`/profile/${u._id}`)}
                  >
                    View Profile
                  </p>
                </div>

                {/* Friend Button */}
                <button
                  className="mt-4 bg-gradient-to-r from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500 text-white py-2 px-4 rounded-xl w-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
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
    </div>
  );
};

export default ShowAllUser;
