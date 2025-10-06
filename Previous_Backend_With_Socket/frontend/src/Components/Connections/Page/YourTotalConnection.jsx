import { useContext, useEffect } from "react"
import AppContext from "../../../Context/UseContext"
import { useNavigate } from "react-router-dom"

const YourTotalConnection = () => {
  const { friendList, fetchFriendlist } = useContext(AppContext)
  const navigate = useNavigate();
  console.log("Friend List in YourTotalConnection:", friendList);

  useEffect(()=>{
    fetchFriendlist();
  }, []);

  if(!friendList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
    >
      <h1 className="col-span-full text-2xl font-bold text-white">Your Total Connections</h1>
      {friendList.length > 0 ? (
        friendList.map((friend) => (
          <div
          key={friend._id}
          className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="h-24 w-full overflow-hidden">
              <img
                src={friend.coverPic || "/default-cover.jpg"}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 text-white">
              <div className="flex items-center space-x-3">
                <img
                  src={friend.profilePic || "/avatar.svg"}
                  alt={friend.fullname}
                  className="w-14 h-14 rounded-full object-cover border-4 border-indigo-400 -mt-10"
                />
                <div>
                  <h3 className="font-semibold text-lg">{friend.fullname}</h3>
                  <p className="text-sm text-indigo-400">@{friend.username}</p>
                </div>
              </div>

              <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                {friend.bio || "No bio available"}
              </p>

              {/* Email & Location */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <p className="text-xs text-gray-400">{friend.email}</p>
                {friend.location && (
                  <p className="text-xs text-gray-400">📍 {friend.location}</p>
                )}
              </div>
              <p
                className="text-xs text-purple-400 font-medium cursor-pointer hover:text-purple-300 transition-colors"
                onClick={() => navigate(`/profile/${friend._id}`)}
              >
                View Profile
              </p>
            </div>

              <button
              className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-400 hover:from-green-600 hover:to-teal-500 text-white py-2 px-4 rounded-xl w-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                Message
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 col-span-full text-center">No connection requests.</p>
      )}
    </div>
  )
}

export default YourTotalConnection
