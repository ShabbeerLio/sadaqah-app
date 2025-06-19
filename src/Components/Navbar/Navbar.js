import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import {
  IoMdNotifications,
  IoMdHelpCircleOutline,
  IoIosClose,
} from "react-icons/io";
import { LuCircleUser } from "react-icons/lu";
import { FcDonate } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
import donate1 from "../../Assets/Posts/hadith.png"
import DonateCard from "../DonateCard/DonateCard";
import DonateData from "../../Pages/DonateData";
import { LuScanQrCode } from "react-icons/lu";


const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("authUser"));
  const location = useLocation();
  const currentPath = location.pathname;

  const [donateActive, setDonateActive] = useState("");
  const donateRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

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
  } else {
    filteredDonation = DonateData.filter((i) => i.username === user.username)
  }



  return (
    <div className="navbar">
      <div className="navbar-main">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid nav-name">
            <Link className="navbar-brand" to="/">
              {/* <img src={logo} alt="" /> */}
              <span>My Sadaqah</span>
              <h5>{user.username}</h5>
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
                  <IoMdNotifications />
                </Link>
              </div>
              <div className="help">
                {user.type === "user" ? (
                  <Link to={"/help"}>
                    <IoMdHelpCircleOutline />
                    <p>Help</p>
                  </Link>
                ) : (
                  <Link to={"/profile"}>
                    <LuCircleUser />
                    <p>Profile</p>
                  </Link>
                )}
              </div>
              {/* Show Donate button only if NOT on /history */}
              {currentPath !== "/history" && (
                <div className="donate" onClick={handleDonet}>
                  <FcDonate />
                </div>
              )}
              {/* Show Pay Now only on / */}
              {currentPath === "/" && user.type === "user" && (
                <div className={`nav-pay-now ${isScrolled ? "scrolled" : ""}`}>
                  <Link to="/payment">
                    <LuScanQrCode />
                    <span className="pay-text">Do Sadaqah</span>
                  </Link>
                </div>
              )}
              {/* Donate Popup */}
              {currentPath !== "/history" && (
                <div className={`donate-box ${donateActive}`} ref={donateRef}>
                  <div className="donate-boxes">
                    <div className="donate-top">
                      <h4>Donation Required</h4>
                      <IoIosClose onClick={handleCloseDonet} />
                    </div>
                    <div className="donate-card-box">
                      {filteredDonation.map((i, index) => (
                        <DonateCard key={index} user={user} i={i} />
                      ))}
                    </div>
                  </div>
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
