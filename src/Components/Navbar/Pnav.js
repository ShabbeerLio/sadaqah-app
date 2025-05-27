import React from 'react'
import "./Pnav.css"
import { Link } from 'react-router-dom'
import { LuHouse, LuCircleUser, LuSearch } from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";
import { CgFeed } from "react-icons/cg";



const Pnav = () => {
    return (
        <div className='Pnav'>
            <ul>
                <li>
                    <Link to={"/"}><LuHouse />Home</Link>
                </li>
                <li>
                    <Link to={"/feeds"}><CgFeed />Feeds</Link>
                </li>
                <li>
                    <Link to={"/search"}><LuSearch />Search</Link>
                </li>
                <li>
                    <Link to={"/profile"}><LuCircleUser />Profile</Link>
                </li>
                <li>
                    <Link to={"/history"}> <GrTransaction />History</Link>
                </li>
            </ul>
        </div>
    )
}

export default Pnav
