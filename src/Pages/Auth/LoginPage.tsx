import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const NavigationPage = (page) => {
    navigate(page);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create the login payload
    const loginData = {
      email: email,
      password: password,
      remember_me: rememberMe ? 1 : 0,
    };

    try {
      // Send a POST request to the login API
      const response = await fetch("https://diningtable.sharpbody-p.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // Check if the login was successful
      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        login(rememberMe); // Call the login function from AuthContext
        console.log(data.access_token);
        // Store login state for admin in localStorage (just as an example)
        localStorage.setItem("loginadmin", "true");
        localStorage.setItem("Logtoken", data.access_token);
        // Navigate based on admin status access_token
        NavigationPage("/Table");
      } else {
        // Handle failed login (e.g., show error message)
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-orange-50 login-section">
      <div className="bg-white p-8 rounded-lg max-w-sm w-full login-box-shadow">
        <div className="text-center mb-8">
          <img src={Logo} alt="Logo" className="mx-auto mb-4 width-logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-orange-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-orange-500"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                className="mr-2 leading-tight"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 login-btn"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
