import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import {
  IoMdHelpCircleOutline,
} from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import donate1 from "../../Assets/Posts/hadith.png"
import DonateData from "../../Pages/DonateData";
import {
  LuSquarePlus,
  LuScanQrCode,
} from "react-icons/lu";
import dosadaqa from "../../Assets/payment.png"


const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("authUser"));
  const location = useLocation();
  const currentPath = location.pathname;

  const [donateActive, setDonateActive] = useState("");
  const donateRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const userLocation = "Delhi";
  const [donationType, setDonationType] = useState(userLocation);

  const handleDonet = () => {
    setDonateActive("active");
  };
  const handleCloseDonet = () => {
    setDonateActive("");
  };

  // Detect click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (donateRef.current && !donateRef.current.contains(event.target)) {
        handleCloseDonet();
      }
    };

    if (donateActive === "active") {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [donateActive]);

  // Handle scroll to toggle "isScrolled"
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!user) return null;

  let filteredDonation = [];
  if (user.type === "user") {
    filteredDonation = DonateData;
    filteredDonation = filteredDonation.filter((i) => {
      if (donationType === userLocation) {
        return i.location === userLocation;
      } else {
        return i.location !== userLocation;
      }
    });
  } else {
    filteredDonation = DonateData.filter((i) => i.username === user.username)
  }

  return (
    <div className="navbar">
      <div className="navbar-main">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid nav-name">
            <Link className="navbar-brand" to="/profile">
              <img src={donate1} alt="" />
              <div className="navbar-title">
                <h5>Assalamu Alaikum</h5>
                <span>{user?.username}</span>
              </div>
            </Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/feeds">
                  Feeds
                </Link>
                <Link className="nav-link" to="/add">
                  Add
                </Link>
                <Link className="nav-link" to="/search">
                  Search
                </Link>
                <Link className="nav-link" to="/history">
                  History
                </Link>
              </div>
            </div>
            <div className="profile">
              <div className="notification">
                <Link to={"/notification"}>
                  <IoNotificationsOutline />
                </Link>
              </div>
              <div className="help">
                {user.type === "user" ? (
                  <Link to={"/help"}>
                    <IoMdHelpCircleOutline />
                    <p>Help</p>
                  </Link>
                ) : (
                  <Link to={"/add"}>
                    <LuSquarePlus />
                    <p>Feed</p>
                  </Link>
                )}
              </div>
              {/* Show Pay Now only on / */}
              {currentPath === "/" && user.type === "user" && (
                <div className={`nav-pay-now ${isScrolled ? "scrolled" : ""}`}>
                  <Link to="/payment">
                  <img className="pay-imag" src={dosadaqa} alt="" />
                    {/* <LuScanQrCode /> */}
                    <span className="pay-text">Do Sadaqah</span>
                  </Link>
                </div>
              )}
             
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
