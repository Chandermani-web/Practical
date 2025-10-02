import { useContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  User,
  Mail,
  MapPin,
  Globe,
  Phone,
  Calendar,
  Camera,
  Edit3,
  Save,
  X,
  Heart,
  MessageCircle,
  Loader
} from "lucide-react";
import AppContext from "../../Context/UseContext.jsx";
import { Link } from "react-router-dom";
import Comment from "../Post/Service/Comment.jsx";

const ProfileUpdate = () => {
  const {
    user,
    setUser,
    posts,
    setPosts,
    fetchUser,
    fetchComments,
    setCommentIdForFetching,
  } = useContext(AppContext);
  const [openCommentBoxId, setOpenCommentBoxId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    bio: "",
    location: "",
    username: "",
    website: "",
    phone: "",
    dateOfBirth: "",
    interests: "",
    socialLinks: {
      twitter: "",
      instagram: "",
      linkedin: "",
      github: "",
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        bio: user.bio || "",
        location: user.location || "",
        username: user.username || "",
        website: user.website || "",
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "",
        interests: user.interests ? user.interests.join(", ") : "",
        socialLinks: {
          twitter: user.socialLinks?.twitter || "",
          instagram: user.socialLinks?.instagram || "",
          linkedin: user.socialLinks?.linkedin || "",
          github: user.socialLinks?.github || "",
        },
      });
    }
  }, [user]);

  const handleLike = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}/likeandunlike`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log("Like response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to like post");
      }

      if (data.success) {
        // immutably update posts
        const updatedPosts = posts.map((post) =>
          post._id === postId ? { ...post, likes: data.updatedLikes } : post
        );
        setPosts(updatedPosts);
      }
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      const socialKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submitData = {
        ...formData,
        interests: formData.interests
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item),
      };

      const response = await fetch(
        "http://localhost:5000/api/auth/updateprofile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(submitData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error(`Error updating profile, ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append(type === "profile" ? "profilePic" : "coverPic", file);

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/upload-${type}-pic`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUser((prev) => ({
          ...prev,
          [type === "profile" ? "profilePic" : "coverPic"]:
            data[type === "profile" ? "profilePic" : "coverPic"],
        }));
        toast.success(
          `${
            type === "profile" ? "Profile" : "Cover"
          } picture updated successfully!`
        );
      } else {
        toast.error(data.message || "Failed to upload image");
      }
    } catch (error) {
      toast.error(`Error uploading image, ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    if (openCommentBoxId) {
      fetchUser();
    }
  }, [openCommentBoxId]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-gray-500 animate-spin mx-auto mb-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-full mx-auto p-6 ">
        {/* Cover Photo */}
        <div className="relative h-64 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg mb-6">
          {user.coverPic && (
            <img
              src={user.coverPic}
              alt="Cover"
              className="w-full h-full object-cover rounded-lg"
            />
          )}
          <label className="absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-70">
            <Camera className="w-10 h-10" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, "cover")}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
              {user.profilePic ? (
                <img
                  src={
                    user.profilePic ? user.profilePic : "/defaultProfile.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-400" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
              <Camera className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoUpload(e, "profile")}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold">
                {user.fullname || user.username || "Anonymous User"}
              </h1>
              {user.isVerified && (
                <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Verified
                </div>
              )}
            </div>
            <p className="text-gray-400 mb-2">@{user.username || "username"}</p>
            {user.bio && <p className="text-gray-300 mb-4">{user.bio}</p>}

            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </div>
              )}
              {user.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400"
                  >
                    {user.website}
                  </a>
                </div>
              )}
              {user.dateOfBirth && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">{user.posts?.length || 0}</div>
            <div className="text-gray-400">Posts</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">
              {user.followers?.length || 0}
            </div>
            <div className="text-gray-400">Followers</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">
              {user.following?.length || 0}
            </div>
            <div className="text-gray-400">Following</div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={500}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about yourself..."
                />
                <div className="text-sm text-gray-400 mt-1">
                  {formData.bio.length}/500
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Interests (comma-separated)
                </label>
                <input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Technology, Music, Travel..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Social Links
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="url"
                    name="socialLinks.twitter"
                    value={formData.socialLinks.twitter}
                    onChange={handleInputChange}
                    placeholder="Twitter URL"
                    className="p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="url"
                    name="socialLinks.instagram"
                    value={formData.socialLinks.instagram}
                    onChange={handleInputChange}
                    placeholder="Instagram URL"
                    className="p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="url"
                    name="socialLinks.linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={handleInputChange}
                    placeholder="LinkedIn URL"
                    className="p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="url"
                    name="socialLinks.github"
                    value={formData.socialLinks.github}
                    onChange={handleInputChange}
                    placeholder="GitHub URL"
                    className="p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Social Links Display */}
        {user.socialLinks &&
          Object.values(user.socialLinks).some((link) => link) && (
            <div className="bg-gray-800 p-6 rounded-lg mt-6">
              <h3 className="text-lg font-semibold mb-4">Social Links</h3>
              <div className="flex flex-wrap gap-4">
                {user.socialLinks.twitter && (
                  <a
                    href={user.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                  >
                    <span>Twitter</span>
                  </a>
                )}
                {user.socialLinks.instagram && (
                  <a
                    href={user.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300 flex items-center gap-2"
                  >
                    <span>Instagram</span>
                  </a>
                )}
                {user.socialLinks.linkedin && (
                  <a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 flex items-center gap-2"
                  >
                    <span>LinkedIn</span>
                  </a>
                )}
                {user.socialLinks.github && (
                  <a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-300 flex items-center gap-2"
                  >
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          )}

        {/* Interests */}
        {user.interests && user.interests.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg mt-6">
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

        <div className="flex items-center justify-between mt-12 mb-6">
          <h3 className="text-2xl text-gray-200 font-semibold">
            Recent Posts
          </h3>
          <a href="/create-post" className="bg-blue-600 p-3 rounded-2xl hover:bg-blue-800 flex items-center gap-2">
            <i className="ri-add-line"></i>
             Create Post
          </a>
        </div>

        {posts
          ?.filter((post) => post.user._id === user._id) // only user’s posts
          .map((post) => (
            <div
              key={post._id}
              className="bg-gray-800 rounded-2xl shadow-lg p-4 space-y-3 max-w-4xl mb-6 mx-auto"
            >
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <img
                  src={post.profilePic || "/avatar.svg"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <Link
                    to={`/profile/${post.user.username}`}
                    className="font-semibold hover:underline"
                  >
                    @{post.user.username}
                  </Link>
                  <p className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-200">{post.content}</p>

              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="rounded-lg max-h-96 object-contain w-full"
                />
              )}

              {post.video && (
                <video
                  src={post.video}
                  controls
                  className="rounded-lg w-full max-h-96"
                />
              )}

              {/* Actions */}
              <div className="flex space-x-6 text-gray-400 mt-2">
                <button
                  className="flex items-center space-x-1 hover:text-red-400 transition-colors"
                  onClick={() => handleLike(post._id)}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      post.likes?.includes(user._id) ? "text-red-500" : ""
                    }`}
                  />
                  <span>{post.likes?.length || 0}</span>
                </button>

                <button
                  className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                  onClick={() => {
                    setOpenCommentBoxId(
                      openCommentBoxId === post._id ? null : post._id
                    );
                    setCommentIdForFetching(post._id);
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments?.length || 0}</span>
                </button>
              </div>

              {openCommentBoxId === post._id && <Comment id={post._id} />}
            </div>
          ))}

        <ToastContainer />
      </div>
    </div>
  );
};

export default ProfileUpdate;
