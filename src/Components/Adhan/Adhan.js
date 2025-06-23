import React, { useEffect, useState } from "react";
import "./Adhan.css";
import mashjid from "../../Assets/mashjid.png";
import { IoMdTime } from "react-icons/io";
import {
    PiSunHorizon,
    PiSun,
    PiCloudSun,
    PiCloudMoon,
    PiMoonStars,
} from "react-icons/pi";
import axios from "axios";

const Adhan = () => {
    const ALADHAN_API_BASE_URL = "https://api.aladhan.com/v1/timingsByCity";
    const BIGDATACLOUD_BASE_URL =
        "https://api.bigdatacloud.net/data/reverse-geocode-client";

    const [prayerTimess, setPrayerTimes] = useState(null);
    const [date, setDate] = useState(null);
    const [locationName, setLocationName] = useState(null);
    const [currentPrayer, setCurrentPrayer] = useState(null);
    const [nextPrayer, setNextPrayer] = useState(null);

    const imageMap = {
        Fajr: <PiSunHorizon />,
        Dhuhr: <PiSun />,
        Asr: <PiCloudSun />,
        Maghrib: <PiCloudMoon />,
        Isha: <PiMoonStars />,
    };

    const searchForLocation = (city, latitude, longitude) => {
        axios
            .get(ALADHAN_API_BASE_URL, {
                params: {
                    city: city,
                    country: city,
                },
            })
            .then((response) => {
                const data = response.data.data;

                setDate({
                    gregorian: data.date.readable,
                    hijri: {
                        day: data.date.hijri.day,
                        month: data.date.hijri.month.number,
                        weekday: data.date.hijri.weekday.ar,
                        year: data.date.hijri.year,
                    },
                });

                setPrayerTimes({
                    Fajr: data.timings.Fajr,
                    Sunrise: data.timings.Sunrise,
                    Dhuhr: data.timings.Dhuhr,
                    Asr: data.timings.Asr,
                    Maghrib: data.timings.Maghrib,
                    Isha: data.timings.Isha,
                });

                const { timezone } = data.meta;
                searchLocationName(latitude, longitude, timezone);
            })
            .catch(() => {
                alert("❌ لا يوجد مكان بهذا الاسم");
            });
    };

    const searchLocationName = (latitude, longitude, timezone) => {
        axios
            .get(BIGDATACLOUD_BASE_URL, {
                params: {
                    latitude,
                    longitude,
                    localityLanguage: "en",
                },
            })
            .then((response) => {
                const { city, countryName } = response.data;
                setLocationName({ city, country: countryName, timezone });
            });
    };

    useEffect(() => {
        searchForLocation("Delhi", "28.70", "77.10");
    }, []);

    let prayerTimes = [];

    if (prayerTimess !== null) {
        prayerTimes = Object.entries(prayerTimess)
            .filter(([name]) => name !== "Sunrise")
            .map(([name, time]) => ({
                name,
                time,
                image: imageMap[name] || null,
            }));
    }

    useEffect(() => {
        if (!prayerTimes || prayerTimes.length === 0) return;

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const toMinutes = (timeStr) => {
            const [hour, minute] = timeStr.split(":").map(Number);
            return hour * 60 + minute;
        };

        let current = null;
        let next = null;

        for (let i = 0; i < prayerTimes.length; i++) {
            const thisPrayer = prayerTimes[i];
            const nextPrayerTime = prayerTimes[i + 1];

            const thisMinutes = toMinutes(thisPrayer.time);
            const nextMinutes = nextPrayerTime
                ? toMinutes(nextPrayerTime.time)
                : Infinity;

            if (currentMinutes >= thisMinutes && currentMinutes < nextMinutes) {
                current = thisPrayer;
                next = nextPrayerTime || prayerTimes[0];
                break;
            }
        }

        // After Isha
        if (!current && prayerTimes.length) {
            current = prayerTimes[prayerTimes.length - 1];
            next = prayerTimes[0];
        }

        setCurrentPrayer(current);
        setNextPrayer(next);
    }, [prayerTimess]);

    const formatTo12Hour = (timeStr) => {
        const [hourStr, minuteStr] = timeStr.split(":");
        let hour = parseInt(hourStr);
        const minute = parseInt(minuteStr);
        const ampm = hour >= 12 ? "PM" : "AM";

        hour = hour % 12;
        hour = hour ? hour : 12; // 0 becomes 12

        return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
    };

    const hijriMonthNames = [
        "", // index 0 unused
        "Muharram",
        "Safar",
        "Rabiʿ al-Awwal",
        "Rabiʿ al-Thani",
        "Jumada al-Awwal",
        "Jumada al-Thani",
        "Rajab",
        "Shaʿban",
        "Ramadan",
        "Shawwal",
        "Dhu al-Qiʿdah",
        "Dhu al-Ḥijjah",
    ];

    return (
        <div className="Collection">
            <div className="Collection-main">
                <div className="Collection-box">
                    <div className="Collection-box-left adhaz-box">
                        <div className="adhan-left">
                            <p>
                                {date
                                    ? `${date.hijri.day} ${hijriMonthNames[date.hijri.month]} ${date.hijri.year} AH`
                                    : ""}
                            </p>
                            <h2>{currentPrayer ? formatTo12Hour(currentPrayer.time) : "--:--"}</h2>
                            <div className="next-prayer">
                                <IoMdTime />
                                <div className="next-time">
                                    <p>Next Prayer</p>
                                    <span>{nextPrayer?.name} - {nextPrayer ? formatTo12Hour(nextPrayer.time) : "--:--"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="adhan-right">
                            <img src={mashjid} alt="Masjid" />
                        </div>
                    </div>

                    <div className="Collection-box-right adhan">
                        <div className="adhan-right-box">
                            {prayerTimes.map((prayer, index) => (
                                <div className="adhan-card" key={index}>
                                    <p>{prayer.name}</p>
                                    {prayer.image}
                                    <p>{formatTo12Hour(prayer.time)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Adhan;