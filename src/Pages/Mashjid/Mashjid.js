import React, { useEffect, useRef, useState } from "react";
import "./Mashjid.css";
import CombinedFeedData from "../AppData"; // assuming it's relative path
import Adhan from "../../Components/Adhan/Adhan";
import Ads from "../../Components/Ads/Ads";
import { useNavigate } from "react-router-dom";
import TestApp from "./TestApp";

const Mashjid = () => {
    const navigate = useNavigate();
    const [selectedMasjid, setSelectedMasjid] = useState(null);
    const [selectedAdhans, setSelectedAdhans] = useState([]);

    let [user, setUser] = useState("");

    useEffect(() => {
        const authUser = JSON.parse(localStorage.getItem("authUser"));
        if (!authUser) {
            navigate("/login");
        } else {
            const findUser = CombinedFeedData.find((i) => i.id === authUser.id);
            setUser(findUser || {});
        }
    }, []);

    const masjids = CombinedFeedData.filter(
        (item) => item.type === "institute" && item.instituteType === "masjid"
    );

    const handleCheckboxChange = (prayer) => {
        console.log(prayer, "prayer")
        if (selectedAdhans.includes(prayer)) {
            setSelectedAdhans(selectedAdhans.filter((p) => p !== prayer));
        } else {
            setSelectedAdhans([...selectedAdhans, prayer]);
        }
    };

    const handlePlayAdhans = () => {
        if (selectedAdhans.length === 0) {
            alert("Select at least one Adhan to hear");
        } else {
            alert(`Playing: ${selectedAdhans.map((a) => a.toUpperCase()).join(", ")}`);
            // Here, you can add actual audio playback logic
        }
    };

    // const [isBroadcasting, setIsBroadcasting] = useState(false);
    // const wsRef = useRef(null);
    // const recorderRef = useRef(null);

    // const startBroadcast = async () => {
    //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //     wsRef.current = new WebSocket("https://structured-backend.onrender.com"); // or wss://yourdomain.com

    //     wsRef.current.binaryType = "arraybuffer";

    //     wsRef.current.onopen = () => {
    //         wsRef.current.send(JSON.stringify({ type: "broadcaster" }));

    //         const recorder = new MediaRecorder(stream, {
    //             mimeType: "audio/webm; codecs=opus"
    //         });

    //         recorderRef.current = recorder;

    //         recorder.ondataavailable = (event) => {
    //             if (event.data.size > 0 && wsRef.current.readyState === WebSocket.OPEN) {
    //                 wsRef.current.send(event.data); // send raw binary
    //             }
    //         };

    //         recorder.start(500); // Send every 500ms
    //         setIsBroadcasting(true);
    //     };
    // };

    // const stopBroadcast = () => {
    //     recorderRef.current?.stop();
    //     wsRef.current?.close();
    //     setIsBroadcasting(false);
    // };

    return (
        <div className="Home">
            <div className="Home-main">
                <Adhan />
                <div className="masjid-box">
                    {user.type === "institute" && user.instituteType === "masjid" ? (
                        <div className="post-card">
                            {/* <button className="post-button" onClick={isBroadcasting ? stopBroadcast : startBroadcast}>
                                {isBroadcasting ? "Stop Adhan" : "Start Adhan"}
                            </button> */}
                            <label>Adhan Times</label>

                            {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha","Jumma"].map((prayer) => (
                                <div className="mashjid-adan-add" key={prayer}>
                                    <label>{prayer.toUpperCase()}: </label>
                                    <input
                                        className="search__input"
                                        type="time"
                                        value={
                                            user.adhanTimes?.[prayer] || "" // safely get current value
                                        }
                                        onChange={(e) => {
                                            const updatedAdhanTimes = {
                                                ...user.adhanTimes, // copy existing
                                                [prayer]: e.target.value, // update current prayer
                                            };

                                            // Update user state with new adhanTimes
                                            const updatedUser = { ...user, adhanTimes: updatedAdhanTimes };
                                            setUser(updatedUser); // trigger re-render
                                        }}
                                    />
                                </div>
                            ))}

                            <button
                                className="post-button"
                                onClick={() => {
                                    const index = CombinedFeedData.findIndex((m) => m.id === user.id);
                                    if (index !== -1) {
                                        CombinedFeedData[index].adhanTimes = user.adhanTimes;
                                    }
                                    localStorage.setItem("authUser", JSON.stringify(user)); // update localStorage
                                    alert("Adhan times saved successfully.");
                                }}
                            >
                                Save Adhan Times
                            </button>
                        </div>
                    ) : (
                        <div className="post-card">
                            <label>Select Mashjid</label>
                            <select
                                className="search__input"
                                onChange={(e) => {
                                    const masjid = masjids.find(
                                        (m) => m.username === e.target.value
                                    );
                                    setSelectedMasjid(masjid);
                                    setSelectedAdhans([]);
                                }}
                            >
                                <option value="">Select Masjid</option>
                                {masjids.map((m) => (
                                    <option key={m.id} value={m.username}>
                                        {m.username} ({m.location})
                                    </option>
                                ))}
                            </select>

                            {selectedMasjid && selectedMasjid.adhanTimes ? (
                                <div className="adhan-times">
                                    <label>Adhan Times of {selectedMasjid.username}</label>
                                    <ul>
                                        {Object.entries(selectedMasjid.adhanTimes).map(
                                            ([prayer, time], index) => (
                                                <li key={prayer}>
                                                    <p>
                                                        {prayer.toUpperCase()} - {time}
                                                    </p>
                                                    <div className="container-adhan">
                                                        <input
                                                            type="checkbox"
                                                            className="checkbox"
                                                            id={index}
                                                            checked={selectedAdhans.includes(prayer)}
                                                            onChange={() => handleCheckboxChange(prayer)}
                                                        />
                                                        <label className="switch" htmlFor="checkbox">
                                                            <span className="slider"></span>
                                                        </label>
                                                    </div>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <button className="post-button" onClick={handlePlayAdhans} style={{ marginTop: "10px" }}>
                                        Hear Adhans
                                    </button>
                                </div>
                            ) : selectedMasjid ? (
                                <p>No Adhan times set yet for {selectedMasjid.username}.</p>
                            ) :
                                <Ads />
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Mashjid;