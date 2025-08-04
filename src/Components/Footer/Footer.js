import React from 'react'
import footer from "../../Assets/app-bg.png"
import "./Footer.css"

const Footer = () => {
    return (
        <div className='Footer'>
            <div className='Footer-main'>
                <div className='Footer-image'>
                    <img src={footer} alt="" />
                </div>
                <div className="Footer-text">
                    <h2>#doSadaqah</h2>
                    <p>❤️ Crafted in Delhi - Build For 🇮🇳 India</p>
                    <p>Connecting The 👆🏻 Ummah</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
