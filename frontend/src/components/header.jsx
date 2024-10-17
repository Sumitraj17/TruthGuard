import { FaSkull } from "react-icons/fa6";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom"; // Import 'useLocation' from React Router
import { CgProfile } from "react-icons/cg";
import { Context } from "../context/context.jsx";

const Header = () => {
  const { isLoggedIn, updateLogin } = useContext(Context);
  const location = useLocation(); // Get current route location

  const handleLogout = () => {
    updateLogin(false); // Logging the user out by setting isLoggedIn to false
  };

  const scrollToDevelopers = () => {
    const element = document.getElementById("developers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to 'developers' section
    }
  };

  return (
    <header className="fixed top-0 w-full text-white bg-black p-2 z-10 shadow-md">
      <div className="flex justify-between">
        {/* Logo and Home Link */}
        <Link to="/" onClick={handleLogout}>
          <div className="flex text-4xl">
            <h1 className="m-4">VerifEye</h1>
            <div className="mt-5">
              <FaSkull />
            </div>
          </div>
        </Link>

        {/* Navigation based on login status and current page */}
        <nav className="flex space-x-4 text-2xl">
          {isLoggedIn ? (
            // If user is logged in, show Profile link
            <Link to="/profile">
              <CgProfile className="flex mt-5 text-4xl" />
            </Link>
          ) : (
            <>
              {/* If not logged in and on login/register pages, show Home button */}
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
