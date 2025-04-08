import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const UserProfilePage = () => {
  const { user, updateUserInfo } = useAuthStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setImage(user.image);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const updatedInfo = { username, email, image };
    if (password) updatedInfo.password = password;

    try {
      await updateUserInfo(updatedInfo);
      setMessage("Profile updated successfully!");
      setPassword("");
    } catch (err) {
      setMessage(err.message || "An error occurred while updating your profile.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        <p>Loading your profile...</p>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case "basic":
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your username"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                Profile Image
              </label>
              <div className="flex items-center gap-4">
                <img src={image} alt="Avatar" className="w-16 h-16 rounded-full" />
                <select
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="p-2 bg-gray-800 rounded-md text-white"
                  disabled={isLoading}
                >
                  <option value="/avatar1.png">Avatar 1</option>
                  <option value="/avatar2.png">Avatar 2</option>
                  <option value="/avatar3.png">Avatar 3</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                New Password (optional)
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter new password"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 bg-red-600 rounded-md text-white font-semibold hover:bg-red-700 transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </button>
            {message && (
              <p
                className={`mt-4 text-center ${
                  message.includes("success") ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        );
      case "account":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <p className="text-gray-400">Subscription Plan: Premium (Fake Data)</p>
            <p className="text-gray-400">Billing Date: 15th of each month (Fake Data)</p>
            <p className="text-gray-400">Payment Method: Visa ending in 1234 (Fake Data)</p>
            {/* Nếu có thêm dữ liệu từ schema, thay bằng dữ liệu thực */}
          </div>
        );
      case "activity":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Viewing Activity</h2>
            {user.viewingHistory && user.viewingHistory.length > 0 ? (
              <ul className="space-y-2">
                {user.viewingHistory.map((item, index) => (
                  <li key={index} className="text-gray-400">
                    You watched "{item.title}" on{" "}
                    {new Date(item.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No viewing history available.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white hero-bg">
      <header className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <img src="/netflix-logo.png" alt="Netflix" className="w-32 md:w-40" />
        </Link>
        <Link to="/" className="text-red-600 hover:text-red-400 transition-colors">
          Sign Out
        </Link>
      </header>

      <main className="max-w-7xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Edit Profile</h1>
          <ul className="space-y-4">
            <li
              className={`cursor-pointer p-2 rounded-md ${
                activeSection === "basic" ? "bg-gray-800 text-red-600" : "hover:bg-gray-900"
              }`}
              onClick={() => setActiveSection("basic")}
            >
              Thông tin cơ bản
            </li>
            <li
              className={`cursor-pointer p-2 rounded-md ${
                activeSection === "account" ? "bg-gray-800 text-red-600" : "hover:bg-gray-900"
              }`}
              onClick={() => setActiveSection("account")}
            >
              Thông tin tài khoản
            </li>
            <li
              className={`cursor-pointer p-2 rounded-md ${
                activeSection === "activity" ? "bg-gray-800 text-red-600" : "hover:bg-gray-900"
              }`}
              onClick={() => setActiveSection("activity")}
            >
              Thông tin hoạt động
            </li>
          </ul>
        </div>

        <div className="w-full md:w-3/4">{renderSection()}</div>
      </main>
    </div>
  );
};

export default UserProfilePage;