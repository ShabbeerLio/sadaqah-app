import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useEffect, useState } from "react";
import Ads from "../../Components/Ads/Ads";
import { useNavigate } from "react-router-dom";
import { Info, SquarePlus } from "lucide-react";
import poster1 from "../../Assets/team-ansar.png";
import poster2 from "../../Assets/team-Rahmah.png";
import poster3 from "../../Assets/team-amanah.png";
import poster4 from "../../Assets/team-fikr.png";
import "./Pages.css";

const Tickets = [
  {
    id: 1,
    ticket: "#8rj39",
    status: "Replied",
    title: "this is ticket1",
    lastUpdate: "1 Aug, 2025 06:45 PM",
    description:
      "Team Ansar – Community Connectors Inspired by the Ansar of Madinah, this team works on the ground to connect and enroll Islamic institutions like mosques and madrasas into the Sadaqah App. They build trust, spread awareness, and grow our verified network with dedication and care.",
  },
  {
    id: 2,
    ticket: "#8rj34",
    status: "Closed",
    title: "this is ticket2",
    lastUpdate: "1 Aug, 2025 06:45 PM",
    description:
      "Team Rahmah – Compassion in Action Rooted in the value of Rahmah (mercy and compassion), this team focuses on guiding users, resolving concerns, and offering heartfelt support. They ensure every interaction on the Sadaqah App feels warm, respectful, and caring.",
  },
  {
    id: 3,
    ticket: "#8rj37",
    status: "Closed",
    title: "this is ticket3",
    lastUpdate: "1 Aug, 2025 06:45 PM",
    description:
      "Team Amanah – Trust & Verification Inspired by the Islamic principle of Amanah (trust), this team is responsible for verifying every institution, donor, and transaction. They ensure transparency, safety, and credibility across the Sadaqah App platform.",
  },
  {
    id: 4,
    ticket: "#8rj38",
    status: "On Going",
    title: "this is ticket4",
    lastUpdate: "1 Aug, 2025 06:45 PM",
    description:
      "Team Fikr – Thoughtful Planning & Vision Inspired by the word Fikr (deep thought and concern), this team is responsible for strategy, planning, and continuous improvement. They think ahead to ensure the app grows with purpose and impact.",
  },
];

const Career = () => {
  const navigate = useNavigate();
  const [selectedPosition, setSelectedPosition] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    attachments: null,
  });

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("applications");
    if (saved) {
      setApplications(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachments") {
      setFormData({ ...formData, attachments: files[0]?.name || "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newApp = { ...formData, date: new Date().toLocaleString() };
    const updatedApps = [...applications, newApp];

    localStorage.setItem("applications", JSON.stringify(updatedApps));
    setApplications(updatedApps);

    setSubmitted(true);
    setShowConfirmation(true);

    setTimeout(() => {
      setSubmitted(false);
      setShowConfirmation(false);
      setSelectedPosition("");
      setFormData({
        name: "",
        email: "",
        message: "",
        attachments: null,
      });
    }, 5000); // 5 seconds confirmation modal
  };

  const handlePositionSelect = (positionId) => {
    setSelectedPosition(positionId);
    setFormData({ ...formData, position: positionId });
  };

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="notification-box">
          <h5>Help and Support <span> <SquarePlus />Open New Ticket</span></h5>
          {/* Position Boxes */}
          {!selectedPosition && !showConfirmation && (
            <div className="help-ticket-boxes">
              <h5>Recent Support Tickets</h5>
              {Tickets.map((pos) => (
                <div
                  key={pos.id}
                  className={`help-ticket-box ${selectedPosition === pos.id ? "selected" : ""
                    }`}
                  onClick={() => handlePositionSelect(pos.id)}
                >
                  <h6>{pos.ticket} - {pos.title}</h6>
                  <span>{pos.status}</span>
                  <p>Last Updated : {pos.lastUpdate}</p>
                </div>
              ))}
            </div>
          )}

          {/* Application Form */}
          {selectedPosition && !submitted && (
            <>
              <div className="help-detail-box">
                <h5>{Tickets.find((p) => p.id === selectedPosition)?.ticket || ""}</h5>
                <h5>Subject : {Tickets.find((p) => p.id === selectedPosition)?.title || ""}</h5>
                <p>{Tickets.find((p) => p.id === selectedPosition)?.description || ""}</p>
              </div>
              <form onSubmit={handleSubmit} className="post-card">
                <label>Name</label>
                <input
                  className="search__input"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label>Email</label>
                <input
                  className="search__input"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label>Message</label>
                <textarea
                  className="search__input"
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                />
                <label>Attachments</label>
                <input
                  className="search__input"
                  type="file"
                  name="attachments"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  required
                />
                <button className="post-button" type="submit">
                  Submit Ticket
                </button>
              </form>
            </>
          )}

          {/* Confirmation Modal */}
          {showConfirmation && (
            <div className="confirmation-modal">
              <div className="confirmation-box">
                <div className="wallet-status">
                  <DotLottieReact
                    className="wallet-success"
                    src="https://lottie.host/b08d0607-b021-4196-ba76-e6596d9332e5/o1EFjMW31w.lottie"
                    loop
                    autoplay
                  />
                </div>
                <h5>Application Submitted</h5>
                <p>Thank you for applying! We will contact you soon.</p>
                <Ads />
              </div>
            </div>
          )}

          {/* Show Submitted Applications after confirmation */}
          {!selectedPosition &&
            !showConfirmation &&
            applications.length > 0 && (
              <div className="submitted-list">
                <h5>Submitted Applications</h5>
                {applications.map((app, idx) => (
                  <div className="submitted-item" key={idx}>
                    <strong>{app.name}</strong> ({app.email})<br />
                    Applied for:{" "}
                    {Tickets.find((p) => p.id === app.position)?.label ||
                      app.position}{" "}
                    on {app.date}
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Career;
