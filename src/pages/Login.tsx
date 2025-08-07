import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError("Invalid username or password");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard"; 
    } catch {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 pt-20">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96 space-y-4">
        <div className="flex justify-center mb-4">
          <img
            src="/mynLogo.png"
            alt="Logo"
            className="w-32 h-32 object-contain"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-green-700">Welcome Back</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm text-center">
            {error}
          </div>
        )}

        <input
          className="w-full border border-gray-300 p-2  rounded focus:outline-none focus:ring focus:ring-green-300"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-700 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
