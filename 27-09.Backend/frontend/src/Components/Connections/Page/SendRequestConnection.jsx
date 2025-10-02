import { useContext } from "react"
import AppContext from "../../../Context/UseContext"
import { useNavigate } from "react-router-dom"

const SendRequestConnection = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {
        user.following.map((u) => (
          <div key={u._id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg" onClick={() => navigate(`/profile/${u.username}`)}>
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
                  <p className="text-sm text-blue-400">@{u.username}</p>
                </div>
              </div>

              <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                {u.bio || "No bio available"}
              </p>

              <p className="text-xs text-gray-400 mt-2">{u.email}</p>

              {u.location && <p className="text-xs text-gray-400">📍 {u.location}</p>}

              <button
                className="mt-4 bg-gray-500 text-white py-2 px-4 rounded w-full"
              >
                <i className="mr-2"></i>
                WithDraw Request
              </button>
            </div> 
          </div>
        ))
      }

      {
        user.following.length === 0 && (
          <p className="text-gray-400 col-span-full text-center">No connection send.</p>
        )
      }
    </div>
  )
}

export default SendRequestConnection
