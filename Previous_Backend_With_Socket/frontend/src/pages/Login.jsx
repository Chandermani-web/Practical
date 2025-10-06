import { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import AppContext from '../Context/UseContext';
import { Eye } from 'lucide-react';

const Login = () => {
  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  });
  const [showpassword, setshowpassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {  setUser } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ important if using cookies
        body: JSON.stringify(formdata),
      });

      const data = await response.json();
      console.log('Server response:', data.user);
      setUser(data.user); // Update user context

      if (response.ok) {
        localStorage.setItem("auth","true")
        // Login success (200)
        toast.success(`Login successful! ${data.message}`, { autoClose: 1000 , onClose: () => { window.location.href = '/'; }});
      } else {
        // Login failed (400, 401, etc.)
        toast.error(`Login failed! ${data.message}`, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
      toast.error(`Login failed! ${error.message}`, { autoClose: 1000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 card-hover">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formdata.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 input-focus"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showpassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formdata.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 input-focus"
                  required
                />
                <button
                  type="button"
                  onClick={() => setshowpassword(!showpassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg btn-hover transition-colors"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
