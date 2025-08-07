import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    navigate("/login");
  };

  const handleLogin = () => {
    setIsMenuOpen(false);
    navigate("/login");
  };

  const goToHome = () => {
    setIsMenuOpen(false);
    navigate("/");
  };

  const goToTasks = () => {
    setIsMenuOpen(false);
    navigate("/tasks");
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-cyan-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="w-full px-2 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src="/mynLogo.png"
            alt="Logo"
            className="w-10 h-10 sm:w-16 sm:h-16 object-contain drop-shadow"
          />
          <h1 className="text-xl sm:text-2xl font-bold">Approximate Schedule</h1>
        </div>

        <div className="hidden md:flex items-center space-x-4 text-lg font-medium">
          {isLoggedIn ? (
            <>
              <NavButton label="Home" onClick={goToHome} />
              <NavButton label="Tasks" onClick={goToTasks} />
              <NavButton label="Logout" onClick={handleLogout} />
            </>
          ) : (
            <NavButton label="Login" onClick={handleLogin} />
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full right-4 mt-2 bg-white text-green-900 rounded-md shadow-lg border border-green-200 z-40 px-4 py-3 space-y-2 text-base font-medium">
          {isLoggedIn ? (
            <>
              <MobileButton label="Home" onClick={goToHome} />
              <MobileButton label="Tasks" onClick={goToTasks} />
              <MobileButton label="Logout" onClick={handleLogout} />
            </>
          ) : (
            <MobileButton label="Login" onClick={handleLogin} />
          )}
        </div>
      )}
    </nav>
  );
}

const NavButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-full transition hover:bg-white hover:text-green-600 font-medium"
  >
    {label}
  </button>
);

const MobileButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="block w-full text-left px-4 py-2 rounded-md hover:bg-white hover:text-green-600 transition"
  >
    {label}
  </button>
);
