import { useContext } from "react";
import AppContext from "../../Context/UseContext";
import { Mail, MapPin, Globe, Phone, Calendar } from "lucide-react";
import "remixicon/fonts/remixicon.css";

const RightSideBar = () => {
  const { user } = useContext(AppContext);
  return (
    <div>
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
        <div className="space-y-3">
          {user.email && (
            <div className="flex items-center space-x-3 text-sm">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{user.email}</span>
            </div>
          )}
          {user.phone && (
            <div className="flex items-center space-x-3 text-sm">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{user.phone}</span>
            </div>
          )}
          {user.location && (
            <div className="flex items-center space-x-3 text-sm">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{user.location}</span>
            </div>
          )}
          {user.website && (
            <div className="flex items-center space-x-3 text-sm">
              <Globe className="w-4 h-4 text-gray-400" />
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Website
              </a>
            </div>
          )}
          {user.dateOfBirth && (
            <div className="flex items-center space-x-3 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">
                {new Date(user.dateOfBirth).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Interests */}
      {user.interests && user.interests.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {user.socialLinks &&
        Object.values(user.socialLinks).some((link) => link) && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-gray-700/50">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center">
              <i className="ri-share-forward-line mr-3 text-blue-400"></i>
              Connect With Me
            </h3>
            <div className="space-y-3">
              {user.socialLinks.twitter && (
                <a
                  href={user.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300 group hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <i className="ri-twitter-fill text-blue-400 text-lg"></i>
                  </div>
                  <span className="text-blue-400 group-hover:text-blue-300 font-medium transition-colors">
                    Twitter
                  </span>
                </a>
              )}
              {user.socialLinks.instagram && (
                <a
                  href={user.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/20 hover:border-pink-500/30 transition-all duration-300 group hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-colors">
                    <i className="ri-instagram-fill text-pink-400 text-lg"></i>
                  </div>
                  <span className="text-pink-400 group-hover:text-pink-300 font-medium transition-colors">
                    Instagram
                  </span>
                </a>
              )}
              {user.socialLinks.linkedin && (
                <a
                  href={user.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/20 hover:border-blue-600/30 transition-all duration-300 group hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                    <i className="ri-linkedin-fill text-blue-500 text-lg"></i>
                  </div>
                  <span className="text-blue-500 group-hover:text-blue-400 font-medium transition-colors">
                    LinkedIn
                  </span>
                </a>
              )}
              {user.socialLinks.github && (
                <a
                  href={user.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 border border-gray-500/20 hover:border-gray-500/30 transition-all duration-300 group hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-500/20 rounded-lg group-hover:bg-gray-500/30 transition-colors">
                    <i className="ri-github-fill text-gray-300 text-lg"></i>
                  </div>
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors">
                    GitHub
                  </span>
                </a>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default RightSideBar;
