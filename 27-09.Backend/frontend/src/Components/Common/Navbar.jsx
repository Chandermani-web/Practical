import {
  LogOut,
  Home as HomeIcon,
  User as UserIcon,
  // Search,
  Bell,
  MessageSquareMore,
  Network,
  Menu,
  X,
} from "lucide-react";
import { useContext, useState } from "react";
import AppContext from "../../Context/UseContext";

const Navbar = () => {
    const { auth, setUser } = useContext(AppContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.setItem("auth","false");
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800">
        <div className="w-full">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-amber-500">LingOLive</h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              {auth ? (
                <div className="flex space-x-6">
                  <a
                    href="/"
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    <HomeIcon className="w-5 h-5" />
                    <span>Home</span>
                  </a>
                  <a className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-200" href="/connections">
                    <Network className="w-5 h-5" />
                    <span>Connection</span>
                  </a>
                  <button className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors duration-200">
                    <MessageSquareMore className="w-5 h-5" />
                    <span>Messages</span>
                  </button>
                  <button className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-200">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </button>
                  <a
                    href="/profile"
                    className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors duration-200"
                  >
                    <UserIcon className="w-5 h-5 bg-white text-black rounded-full" />
                    <span>Profile</span>
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    onClick={() => window.location.href = "/login"}
                  >
                    Login
                  </button>
                  <button
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    onClick={() => window.location.href = "/signup"}
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 bg-gray-700 rounded-lg p-4 animate-fade-in">
              {auth ? (
                <div className="flex flex-col space-y-4">
                  <a
                    href="/"
                    className="flex items-center space-x-3 p-3 text-blue-400 hover:text-blue-300 hover:bg-gray-600 rounded-lg transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <HomeIcon className="w-5 h-5" />
                    <span>Home</span>
                  </a>
                  <a
                  href="/connections" 
                    className="flex items-center space-x-3 p-3 text-purple-400 hover:text-purple-300 hover:bg-gray-600 rounded-lg transition-all duration-200 text-left"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Network className="w-5 h-5" />
                    <span>Connection</span>
                  </a>
                  <button 
                    className="flex items-center space-x-3 p-3 text-green-400 hover:text-green-300 hover:bg-gray-600 rounded-lg transition-all duration-200 text-left"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <MessageSquareMore className="w-5 h-5" />
                    <span>Messages</span>
                  </button>
                  <button 
                    className="flex items-center space-x-3 p-3 text-yellow-400 hover:text-yellow-300 hover:bg-gray-600 rounded-lg transition-all duration-200 text-left"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </button>
                  <a
                    href="/profile"
                    className="flex items-center space-x-3 p-3 text-pink-400 hover:text-pink-300 hover:bg-gray-600 rounded-lg transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserIcon className="w-5 h-5 bg-white text-black rounded-full" />
                    <span>Profile</span>
                  </a>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 p-3 text-red-400 hover:text-red-300 hover:bg-gray-600 rounded-lg transition-all duration-200 text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <button
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-center"
                    onClick={() => {
                      window.location.href = "/login";
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-center"
                    onClick={() => {
                      window.location.href = "/signup";
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
  )
}

export default Navbar
