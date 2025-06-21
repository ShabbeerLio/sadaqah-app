import React from "react";
import "./Adhan.css";
import mashjid from "../../Assets/mashjid.png"
import { IoMdTime } from "react-icons/io";
import { PiSunHorizon ,PiSun, PiCloudSun, PiCloudMoon, PiMoonStars} from "react-icons/pi";


const Adhan = () => {
    return (
        <div className="Collection">
            <div className="Collection-main">
                <div className="Collection-box">
                    <div className="Collection-box-left adhaz-box">
                        <div className="adhan-left">
                            <p>1 ramadan 1446 Hijira</p>
                            <h2>3:58<span>pm</span></h2>
                            <div className="next-prayer">
                                <IoMdTime />
                                <div className="next-time">
                                    <p>Next Prayer</p>
                                    <span>6:30 pm</span>
                                </div>
                            </div>
                        </div>
                        <div className="adhan-right">
                            <img src={mashjid} alt="" />
                        </div>
                    </div>
                    <div className="Collection-box-right adhan">
                        <div className="adhan-right-box">
                            <div className="adhan-card">
                                <p>Fajr</p>
                                <PiSunHorizon/>
                                <p>5:10 am</p>
                            </div>
                            <div className="adhan-card">
                                <p>Fajr</p>
                                <PiSun/>
                                <p>5:10 am</p>
                            </div>
                            <div className="adhan-card">
                                <p>Fajr</p>
                                <PiCloudSun/>
                                <p>5:10 am</p>
                            </div>
                            <div className="adhan-card">
                                <p>Fajr</p>
                                <PiCloudMoon/>
                                <p>5:10 am</p>
                            </div>
                            <div className="adhan-card">
                                <p>Fajr</p>
                                <PiMoonStars/>
                                <p>5:10 am</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Adhan;
