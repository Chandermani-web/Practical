import 'remixicon/fonts/remixicon.css';
import { useContext, useEffect } from "react";
import AppContext from '../../../Context/UseContext';
import { useNavigate } from 'react-router-dom';

const ReceiveRequestConnection = () => {
  const { requests, setRequests, fetchFriendRequests } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      const res = await fetch("http://localhost:5000/api/friends/accept-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ requestId }),
      });

      const data = await res.json();
      console.log("Friend request accepted:", data);

      // Remove from UI
      setRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (err) {
      console.error("Error accepting friend request:", err);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      const res = await fetch("http://localhost:5000/api/friends/reject-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ requestId }),
      });
      const data = await res.json();
      console.log("Friend request rejected:", data);

      // Remove from UI
      setRequests((prev) => prev.filter((r) => r._id !== requestId));
    }catch (err) {
      console.error("Error rejecting friend request:", err);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {requests.length > 0 ? (
        requests.map((req) => (
          <div key={req._id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg" onClick={() => navigate(`/profile/${req.sender.username}`)}>
            <div className="h-24 w-full overflow-hidden">
              <img
                src={req.sender.coverPic || "/default-cover.jpg"}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 text-white">
              <div className="flex items-center space-x-3">
                <img
                  src={req.sender.profilePic || "/avatar.svg"}
                  alt={req.sender.fullname}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white -mt-10"
                />
                <div>
                  <h3 className="font-semibold text-lg">{req.sender.fullname}</h3>
                  <p className="text-sm text-blue-400">@{req.sender.username}</p>
                </div>
              </div>

              <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                {req.sender.bio || "No bio available"}
              </p>

              <p className="text-xs text-gray-400 mt-2">{req.sender.email}</p>

              {req.sender.location && <p className="text-xs text-gray-400">📍 {req.sender.location}</p>}

              <div className="mt-4 flex space-x-2">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded flex-1"
                  onClick={() => handleAcceptRequest(req._id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded flex-1"
                  onClick={() => handleRejectRequest(req._id)}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 col-span-full text-center">No connection requests.</p>
      )}
    </div>
  );
};

export default ReceiveRequestConnection;
