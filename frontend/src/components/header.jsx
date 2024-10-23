import { FaSkull } from "react-icons/fa6";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom"; // Import 'useLocation' from React Router
import { CgProfile } from "react-icons/cg";
import { Context } from "../context/context.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";

const Header = () => {
  const { isLoggedIn, updateLogin, update } = useContext(Context);
  const location = useLocation(); // Get current route location
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.post(
      "http://localhost:8080/api/v1/auth/logout",
      {},
      { withCredentials: true }
    );
    update(false); // Update the login state to false
    updateLogin(false); // Update the login process state to false
    localStorage.removeItem("id"); // Remove user ID from local storage
    localStorage.removeItem("loggedIn"); // Clear logged-in status
    toast.success("Logged out successfully", { duration: 2000 });
    navigate("/"); // Redirect to login page after successful logout
  };

  const scrollToDevelopers = () => {
    const element = document.getElementById("developers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to 'developers' section
    }
  };

  return (
    <header className="fixed top-0 w-full text-white bg-black pt-2 pr-2 pl-2 pb-1 z-10 shadow-md">
      <div className="flex justify-between">
        <Link to="/" className="flex text-4xl">
          <h1 className="m-4">VerifEye</h1>
          <div className="mt-5">
            <FaSkull />
          </div>
        </Link>

        <nav className="flex space-x-4 text-2xl items-center">
          {isLoggedIn ? (
            <>
              <Link to="/profile">
                <CgProfile className="text-4xl" />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white text-lg font-bold py-2 px-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {location.pathname === "/login" ||
              location.pathname === "/register" ? (
                <Link to="/" className="m-3 hover:text-blue-500">
                  Home
                </Link>
              ) : (
                /* On other pages (like Home), show the Developers button */
                <button
                  onClick={scrollToDevelopers}
                  className="m-3 hover:text-blue-500"
                >
                  Developers
                </button>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
