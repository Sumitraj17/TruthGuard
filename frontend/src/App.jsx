import { Provider, Context } from "./context/context.jsx";
import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header.jsx";
import { ToastContainer } from 'react-toastify';
import Home from "./pages/main.jsx";
import Landing from "./pages/landing_page.jsx";
import Footer from "./components/footer.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/Register.jsx";
import 'react-toastify/dist/ReactToastify.css'; // Ensure ToastContainer CSS is imported

function App() {
  return (
    <Provider>
      <Router>
        <div className="bg-black text-white min-h-screen flex flex-col">
          <Header />
          <div className="pt-16 flex-grow">
            <MainContent />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

const MainContent = () => {
  const { isLoggedIn } = useContext(Context);

  return (
    <div className="flex-grow">
      <ToastContainer 
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }} // Ensuring it is above other content
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        {isLoggedIn && <Route path="/main" element={<Home />} />}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
