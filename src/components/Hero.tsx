import { useEffect, useState } from "react";

const phrases = [
  "Simplify your workflow",
  "Organize your tasks",
  "Stay productive every day",
];

export default function Hero({ onLogin }: { onLogin: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-20 px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-900 transition duration-500">
        {phrases[index]}
      </h1>
      <p className="mt-4 text-gray-700 max-w-xl mx-auto">
        Manage your tasks efficiently with our all-in-one platform.
      </p>
      <button
        onClick={onLogin}
        className="mt-8 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
      >
        Login
      </button>
    </div>
  );
}
