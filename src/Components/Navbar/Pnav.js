import React, { useEffect, useRef, useState } from 'react';
import './Pnav.css';
import { NavLink, useLocation } from 'react-router-dom';
import { LuHouse, LuCircleUser, LuSearch } from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";
import { CgFeed } from "react-icons/cg";

const Pnav = () => {
    const location = useLocation();
    const [activeLeft, setActiveLeft] = useState(0);
    const [activeWidth, setActiveWidth] = useState(0);
    const navRefs = useRef([]);

    useEffect(() => {
        const current = navRefs.current.find(
            ref => ref && ref.dataset.path === location.pathname
        );
        if (current) {
            setActiveLeft(current.offsetLeft);
            setActiveWidth(current.offsetWidth);
        }
    }, [location]);

    const links = [
        { to: "/", label: "Home", icon: <LuHouse /> },
        { to: "/feeds", label: "Feeds", icon: <CgFeed /> },
        { to: "/search", label: "Search", icon: <LuSearch /> },
        { to: "/profile", label: "Profile", icon: <LuCircleUser /> },
        { to: "/history", label: "History", icon: <GrTransaction /> },
    ];

    return (
        <div className="Pnav">
            <div className="highlight" style={{ left: activeLeft }} />
            <ul>
                {links.map((link, index) => (
                    <li key={index}>
                        <NavLink
                            to={link.to}
                            className="nav-link"
                            data-path={link.to}
                            ref={el => navRefs.current[index] = el}
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