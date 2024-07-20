import React, { useState } from "react";
import axios from "axios";
import { FaSkull } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      setSuccess(response.data.message);
      setError("");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.response.data.message);
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="flex w-2/4 bg-white shadow-lg h-2/4">
        <div className="w-2/3 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-8">Login</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-3/4 px-3 py-2 border rounded"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-3/4 px-3 py-2 border rounded"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center mt-8">
                <button
                  className="bg-black text-white font-bold py-2 px-6 rounded-full"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-1/3 bg-black flex justify-center items-center">
          <FaSkull className="text-white w-40 h-40" />
        </div>
      </div>
    </div>
  );
};

export default Login;
