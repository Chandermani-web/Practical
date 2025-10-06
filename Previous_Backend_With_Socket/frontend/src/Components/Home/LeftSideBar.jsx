import React, { useContext } from 'react'
import AppContext from '../../Context/UseContext';

const LeftSideBar = () => {
  const { user } = useContext(AppContext);

  return (
    <div>
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden mx-auto mb-4">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic ? user.profilePic : "/defaultProfile.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img className='w-full h-full object-cover' src="/avatar.svg" alt="Default Avatar" />
                  )}
                </div>
                <h2 className="text-xl font-bold mb-1">
                  {user.fullname || user.username || "Anonymous User"}
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  @{user.username || "username"}
                </p>
                {user.bio && (
                  <p className="text-gray-300 text-sm mb-4">{user.bio}</p>
                )}
                <a
                  href="/profile"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm inline-block"
                >
                  Edit Profile
                </a>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Posts</span>
                  <span className="font-semibold">
                    {user.posts?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Friends</span>
                  <span className="font-semibold">
                    {user.friends?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Followers</span>
                  <span className="font-semibold">
                    {user.followers?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Following</span>
                  <span className="font-semibold">
                    {user.following?.length || 0}
                  </span>
                </div>
              </div>
            </div>
    </div>
  )
}

export default LeftSideBar
