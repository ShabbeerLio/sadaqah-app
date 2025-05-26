import React from 'react'
import "./Loading.css"
import logo from "../../Assets/Logo/logo-sadaqah-app-blue.png"

const Loading = () => {
    return (
        <div className="loading-screen">
            <img src={logo} alt="" />
            <div className="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="loader-quote">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, placeat.</p>
            </div>
        </div>
    )
}

export default Loading
