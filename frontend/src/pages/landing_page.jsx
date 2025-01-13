import { Link } from "react-router-dom";
import AnimatedText from "../components/AnimatedText";
import { Context } from "../context/context.jsx";
import { useContext } from "react";
import Profile from "../components/profile.jsx";
import sumit_img from "../images/img.jpg";
import shivam_img from "../images/shivam.jpg";

const Landing = () => {
  const { login, setLogin, updateLogin } = useContext(Context);
  const handleClick = () => {
    updateLogin(true);
  };

  return (
    <>
      <div className="flex flex-col items-center  h-screen bg-black pt-16">
        <div className="mb-10 p-5">
          <AnimatedText text="Welcome to VerifEye...." />
        </div>
        <div className="sm:text-lg lg:text-2xl w-1/2 text-center italic">
          Your reliable ally in the fight against misinformation. Our platform
          helps you navigate the digital world with confidence by providing
          accurate and trustworthy information. Join us in promoting truth and
          transparency to create a safer, more knowledgeable online environment.
        </div>

        <div className="mt-10 w-full">
          <nav className="flex justify-center text-xl font-bold">
            {/* <Link
              to="/login"
              onClick={handleClick}
              className="transform transition-transform duration-300 hover:scale-110 hover:text-blue-500 text-black bg-white rounded-full p-4"
            >
              Login
            </Link> */}
            <Link
              to="/register"
              onClick={handleClick}
              className="transform transition-transform duration-300 hover:scale-105 hover:text-gray-300   bg-green-600 rounded-full p-4"
            >
              Get Stated
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Landing;
