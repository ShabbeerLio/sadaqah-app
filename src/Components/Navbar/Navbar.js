import "./Navbar.css";
import { Link } from "react-router-dom";
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

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("authUser"));

  const [donateActive, setDonateActive] = useState("");
  const donateRef = useRef(null);
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
              <div className="donate" onClick={handleDonet}>
                <FcDonate />
              </div>
              <div className={`donate-box ${donateActive}`} ref={donateRef}>
                <div className="donate-boxes">
                  <div className="donate-top">
                    <h4>Donatation Required</h4>
                    <IoIosClose onClick={handleCloseDonet} />
                  </div>
                  <div className="donate-card-box">
                  {filteredDonation.map((i) => (
                      <DonateCard user={user} i={i} />
                    ))}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
