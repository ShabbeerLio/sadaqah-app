import React, { useEffect, useRef, useState } from "react";
import "./Pnav.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LuHouse,
  LuSearch,
  LuTvMinimalPlay,
  LuSquarePlus
} from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";
import { motion } from "framer-motion";
import doantebtn from "../../Assets/donate (2).png"
import donatechange from "../../Assets/donate (3).png"

const Pnav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [highlightProps, setHighlightProps] = useState({
    left: -9999,
    width: 0,
  });
  const navRefs = useRef([]);
  const [tail, setTail] = useState(null);
  const [user, setUser] = useState()

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
        ? ["/", "/feeds", "/donation-request", "/search", "/history"]
        : ["/", "/feeds", "/donation-request", "/add-feed", "/history"];

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
        width: "50px",
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
        {user?.type === "user" ? (
          <>
            <li>
              <NavLink
                to={"/donation-request"}
                className="nav-link"
                data-path={"/donation-request"}
                ref={(el) => (navRefs.current[2] = el)}
              >
                {location.pathname === "/donation-request" ? (
                  <img className="navdonate" src={donatechange} alt="donate active" />
                ) : (
                  <img className="navdonate" src={doantebtn} alt="donate" />
                )}
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
          </>
        ) : (
          <>
            <li>
              <NavLink
                to={"/add-feed"}
                className="nav-link"
                data-path={"/add-feed"}
                ref={(el) => (navRefs.current[3] = el)}
              >
                <LuSquarePlus />
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/donation-request"}
                className="nav-link"
                data-path={"/donation-request"}
                ref={(el) => (navRefs.current[2] = el)}
              >
                {location.pathname === "/donation-request" ? (
                  <img className="navdonate" src={donatechange} alt="donate active" />
                ) : (
                  <img className="navdonate" src={doantebtn} alt="donate" />
                )}
              </NavLink>
            </li>
          </>
        )}

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

    </div>
  );
};

export default Pnav;
