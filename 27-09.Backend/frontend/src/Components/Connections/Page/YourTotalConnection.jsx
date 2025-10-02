import { useContext, useEffect } from "react"
import AppContext from "../../../Context/UseContext"

const YourTotalConnection = () => {
  const { friendList, fetchFriendlist } = useContext(AppContext)
  console.log("Friend List in YourTotalConnection:", friendList);

  useEffect(()=>{
    fetchFriendlist();
  }, []);

  if(!friendList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {friendList.length > 0 ? (
        friendList.map((friend) => (
          <div key={friend._id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
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
                  className="w-14 h-14 rounded-full object-cover border-2 border-white -mt-10"
                />
                <div>
                  <h3 className="font-semibold text-lg">{friend.fullname}</h3>
                  <p className="text-sm text-blue-400">@{friend.username}</p>
                </div>
              </div>

              <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                {friend.bio || "No bio available"}
              </p>

              <p className="text-xs text-gray-400 mt-2">{friend.email}</p>

              {friend.location && <p className="text-xs text-gray-400">📍 {friend.location}</p>}

              
              
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
