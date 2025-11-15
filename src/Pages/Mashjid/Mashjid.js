import React, { useContext, useEffect, useRef, useState } from "react";
import "./Mashjid.css";
import Adhan from "../../Components/Adhan/Adhan";
import Ads from "../../Components/Ads/Ads";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../Context/SadaqahContext";
import Host from "../../Host";

const Mashjid = () => {
  const {
    userDetail,
    getAccountDetails,
    institutefollowDetail,
    getAllInstitutebyFollowing,
  } = useContext(NoteContext);
  const navigate = useNavigate();
  const institutes = institutefollowDetail?.followingInstitutes;
  const [selectedMasjid, setSelectedMasjid] = useState(null);
  const [selectedAdhans, setSelectedAdhans] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAccountDetails();
    }
  }, [navigate]);

  const user = userDetail;
  const masjids = institutes;

  useEffect(() => {
    if (user?.role === "institute") {
      // For institute, use their own adhanTimes
      setSelectedMasjid(user);
    } else if (user?.role === "user" && user?.defaultInstitute) {
      getAllInstitutebyFollowing();
      const defaultMasjid = institutes?.find(
        (inst) => String(inst._id) === String(user.defaultInstitute)
      );
      if (defaultMasjid) {
        setSelectedMasjid(defaultMasjid);
      }
    }
  }, [user, institutes]);

  const handleCheckboxChange = (prayer) => {
    setSelectedAdhans((prev) =>
      prev.includes(prayer)
        ? prev.filter((p) => p !== prayer)
        : [...prev, prayer]
    );
  };

  const handlePlayAdhans = async () => {
    setLoading(true);
    const selectedMashjidId = selectedMasjid?._id;
    const enabledTimes = {
      Fajr: selectedAdhans.includes("Fajr"),
      Dhuhr: selectedAdhans.includes("Dhuhr"),
      Asr: selectedAdhans.includes("Asr"),
      Maghrib: selectedAdhans.includes("Maghrib"),
      Isha: selectedAdhans.includes("Isha"),
      Jumma: selectedAdhans.includes("Jumma"),
    };
    try {
      const res = await fetch(
        `${Host}/auth/set-default-institute/${selectedMashjidId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ enabledTimes }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  // Inside the institute role block
  const saveAdhanTimes = async () => {
    try {
      const res = await fetch(`${Host}/auth/add-adhan`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(selectedMasjid.adhanTimes),
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Adhan times updated successfully");
      } else {
        alert("❌ Failed to update Adhan times");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    }
  };

  useEffect(() => {
    if (user?.adhanPreferences?.length > 0) {
      const prefs = user.adhanPreferences[0];
      if (prefs.enabledTimes) {
        const truePrayers = Object.entries(prefs.enabledTimes)
          .filter(([_, isEnabled]) => isEnabled)
          .map(([prayer]) => prayer);
        setSelectedAdhans(truePrayers);
      }
    }
  }, [user]);

  const formatTo24Hour = (time12h) => {
    if (!time12h) return "";
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="Home">
      <div className="Home-main">
        <Adhan />
        <div className="masjid-box">
          {user.role === "institute" && user.instituteType === "masjid" ? (
            <div className="post-card">
              <label>Adhan Times</label>

              {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha", "Jumma"].map(
                (prayer) => (
                  <div className="mashjid-adan-add" key={prayer}>
                    <label>{prayer.toUpperCase()}: </label>
                    <input
                      className="search__input"
                      type="time"
                      value={formatTo24Hour(selectedMasjid?.adhanTimes?.[prayer] || "")}
                      onChange={(e) => {
                        const updatedAdhanTimes = {
                          ...user.adhanTimes,
                          [prayer]: e.target.value, // 24-hour string from input
                        };

                        // Update the selectedMasjid state to trigger re-render
                        setSelectedMasjid({
                          ...selectedMasjid,
                          adhanTimes: updatedAdhanTimes,
                        });
                      }}
                    />
                  </div>
                )
              )}

              <button className="post-button" onClick={saveAdhanTimes}>
                Save Adhan Times
              </button>
            </div>
          ) : (
            <div className="post-card">
              <label>Select Mashjid</label>
              <select
                className="search__input"
                value={selectedMasjid?.userName}
                onChange={(e) => {
                  const masjid = masjids.find(
                    (m) => m.userName === e.target.value
                  );
                  setSelectedMasjid(masjid);
                  setSelectedAdhans([]);
                }}
              >
                <option value="">Select Masjid</option>
                {masjids?.map((m) => (
                  <option key={m._id} value={m.userName}>
                    {m.userName} ({m.location})
                  </option>
                ))}
              </select>

              {selectedMasjid && selectedMasjid?.adhanTimes ? (
                <div className="adhan-times">
                  <label>Adhan Times of {selectedMasjid?.userName}</label>
                  <ul>
                    {Object.entries(selectedMasjid?.adhanTimes).map(
                      ([prayer, time], index) => (
                        <li key={prayer}>
                          <p>
                            {prayer.toUpperCase()} - {time}
                          </p>
                          <div className="container-adhan">
                            <input
                              type="checkbox"
                              className="checkbox"
                              id={`adhan-toggle-${index}`}
                              checked={selectedAdhans.includes(prayer)}
                              onChange={() => handleCheckboxChange(prayer)}
                            />
                            <label
                              className="switch"
                              htmlFor={`adhan-toggle-${index}`}
                            >
                              <span className="slider"></span>
                            </label>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                  {loading ? (
                    <button className="post-button" disabled>
                      Setting default mashjid and playing selected adhans...
                    </button>
                  ) : (
                    <button
                      className="post-button"
                      onClick={handlePlayAdhans}
                      style={{ marginTop: "10px" }}
                    >
                      Hear Adhans
                    </button>
                  )}
                </div>
              ) : selectedMasjid ? (
                <p>No Adhan times set yet for {selectedMasjid.username}.</p>
              ) : (
                <Ads />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mashjid;
