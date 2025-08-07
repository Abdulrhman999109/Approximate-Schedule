import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!username || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data?.message || "Registration failed.");
        return;
      }

      setSuccess("Account created successfully!");
      setTimeout(() => navigate("/login"), 1500);
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

        <h2 className="text-3xl font-bold text-center text-green-700">Create Account</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm text-center">
            {success}
          </div>
        )}

        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-700 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
