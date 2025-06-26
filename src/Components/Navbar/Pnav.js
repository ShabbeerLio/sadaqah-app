import React, { useEffect, useRef, useState } from "react";
import "./Pnav.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LuHouse,
  LuSearch,
  LuSquarePlus,
  LuTvMinimalPlay,
  LuCircleUser,
} from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";
import { motion } from "framer-motion";
import { GiPayMoney } from "react-icons/gi";
import { FcDonate } from "react-icons/fc";
import { IoIosClose } from "react-icons/io";
import DonateData from "../../Pages/DonateData";
import DonateCard from "../DonateCard/DonateCard";
import doantebtn from "../../Assets/donate (1).png"

const Pnav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const donateRef = useRef(null);
  const [highlightProps, setHighlightProps] = useState({
    left: -9999,
    width: 0,
  });
  const navRefs = useRef([]);
  const [tail, setTail] = useState(null);
  const [donateActive, setDonateActive] = useState("");

  const [user, setUser] = useState(null);
  const userLocation = "Delhi";
  const [donationType, setDonationType] = useState(userLocation);

  const handleDonet = () => {
    setDonateActive("active");
  };
  const handleCloseDonet = () => {
    setDonateActive("");
  };

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (!authUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(authUser));
    }
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const links =
      user.type === "user"
        ? ["/", "/feeds", "/profile", "/search", "/history"]
        : ["/", "/feeds", "/add", "/search", "/history"];

    const current = navRefs.current.find(
      (ref) => ref && ref.dataset.path === location.pathname
    );

    if (links.includes(location.pathname) && current) {
      const oldLeft = highlightProps.left + highlightProps.width / 2;
      const newLeft = current.offsetLeft + current.offsetWidth / 2;

      if (oldLeft !== newLeft) {
        setTail({ from: oldLeft, to: newLeft });
      }

      setHighlightProps({
        left: current.offsetLeft,
        width: current.offsetWidth,
      });
    } else {
      // Hide highlight if route doesn't match any nav item
      setHighlightProps({ left: -9999, width: 0 });
    }
  }, [location, user]);

  useEffect(() => {
    if (tail) {
      const timeout = setTimeout(() => {
        setTail(null);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [tail]);

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

  if (!user) return null; // Don't render until user is loaded

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
    filteredDonation = DonateData.filter((i) => i.username === user.username);
  }

  return (
    <div className="Pnav">
      <motion.div
        className="highlight"
        animate={{
          left: highlightProps.left,
          width: highlightProps.width,
          scale: [1, 0.7, 1],
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1.61, 0.36, 1],
        }}
      />
      {/* {tail && (
        <motion.div
          className="liquid-tail"
          initial={{ opacity: 0.8, scaleX: 1 }}
          animate={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            left: Math.min(tail.from, tail.to),
            width: Math.abs(tail.to - tail.from),
            transformOrigin:
              tail.from < tail.to ? "right center" : "left center",
          }}
        />
      )} */}
      <ul>
        <li>
          <NavLink
            to={"/"}
            className="nav-link"
            data-path={"/"}
            ref={(el) => (navRefs.current[0] = el)}
          >
            <LuHouse />
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/feeds"}
            className="nav-link"
            data-path={"/feeds"}
            ref={(el) => (navRefs.current[1] = el)}
          >
            <LuTvMinimalPlay />
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={handleDonet}
            className="nav-link navdonate"
            data-path={"/donate"}
            ref={(el) => (navRefs.current[2] = el)}
          >
            <img src={doantebtn} alt="" />
            {/* <GiPayMoney /> */}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/search"}
            className="nav-link"
            data-path={"/search"}
            ref={(el) => (navRefs.current[3] = el)}
          >
            <LuSearch />
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/history"}
            className="nav-link"
            data-path={"/history"}
            ref={(el) => (navRefs.current[4] = el)}
          >
            <GrTransaction />
          </NavLink>
        </li>
      </ul>
      <div className={`donate-box ${donateActive}`} ref={donateRef}>
        <div className="donate-boxes">
          <div className="donate-top">
            <div className="donate-top-head">
              <h4>Donation Requests</h4>
              {user.type === "user" ? (
                <div className="radio-options">
                  <label
                    className={`radio-label ${
                      donationType === "Delhi" ? "purple" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      value="Delhi"
                      checked={donationType === "Delhi"}
                      onChange={() => setDonationType("Delhi")}
                    />
                    Your Location
                  </label>
                  <label
                    className={`radio-label ${
                      donationType === "others" ? "blue" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      value="others"
                      checked={donationType === "others"}
                      onChange={() => setDonationType("others")}
                    />
                    System Requested
                  </label>
                </div>
              ) : (
                ""
              )}
            </div>
            <IoIosClose onClick={handleCloseDonet} />
          </div>
          <div className="donate-card-box">
            {filteredDonation.map((i, index) => (
              <DonateCard
                key={index}
                user={user}
                i={i}
                donationType={donationType}
                handleCloseDonet={handleCloseDonet}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pnav;
