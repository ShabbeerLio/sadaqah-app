import React, { useEffect, useRef, useState } from "react";
import "./Pnav.css";
import { NavLink, useLocation } from "react-router-dom";
import { LuHouse, LuSearch,LuSquarePlus,LuTvMinimalPlay } from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";
import { motion } from "framer-motion";

const Pnav = () => {
  const location = useLocation();
  const [highlightProps, setHighlightProps] = useState({ left: 0, width: 50 });
  const navRefs = useRef([]);
  const [tail, setTail] = useState(null);

  useEffect(() => {
    const current = navRefs.current.find(
      (ref) => ref && ref.dataset.path === location.pathname
    );
    if (current) {
      // Set tail between previous and new position
      const oldLeft = highlightProps.left + highlightProps.width / 2;
      const newLeft = current.offsetLeft + current.offsetWidth / 2;

      if (oldLeft !== newLeft) {
        setTail({ from: oldLeft, to: newLeft });
      }

      setHighlightProps({
        left: current.offsetLeft,
        width: current.offsetWidth,
      });
    }
  }, [location]);

  useEffect(() => {
    if (tail) {
      const timeout = setTimeout(() => {
        setTail(null);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [tail]);

  const links = [
    { to: "/", label: "Home", icon: <LuHouse /> },
    { to: "/feeds", label: "Feeds", icon: <LuTvMinimalPlay /> },
    { to: "/add", label: "Add", icon: <LuSquarePlus /> },
    { to: "/search", label: "Search", icon: <LuSearch /> },
    { to: "/history", label: "History", icon: <GrTransaction /> },
  ];

  return (
    <div className="Pnav">
      <motion.div
        className="highlight"
        animate={{
          left: highlightProps.left,
          width: highlightProps.width,
          scale: [1, 0.7, 1], // backward droplet bounce
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1.61, 0.36, 1],
        }}
      />
      {tail && (
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
      )}
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.to}
              className="nav-link"
              data-path={link.to}
              ref={(el) => (navRefs.current[index] = el)}
            >
              {link.icon}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pnav;
