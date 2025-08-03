import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useEffect, useState } from "react";
import Ads from "../../Components/Ads/Ads";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Info, SquarePlus } from "lucide-react";
import "./Pages.css";

const Tickets = [
  {
    id: 1,
    ticket: "#8rj39",
    postedBy: "Shabbeer",
    date: "1 Aug, 2025",
    status: "Replied",
    title: "this is ticket1",
    lastUpdate: "1 Aug, 2025 06:45 PM",
    description:
      "Team Ansar – Community Connectors Inspired by the Ansar of Madinah, this team works on the ground to connect and enroll Islamic institutions like mosques and madrasas into the Sadaqah App. They build trust, spread awareness, and grow our verified network with dedication and care.",
  },
  {
    id: 2,
    ticket: "#8rj34",
    postedBy: "System",
    date: "2 Aug, 2025",
    status: "Closed",
    title: "this is ticket2",
    lastUpdate: "1 Aug, 2025 06:45 PM",
    description:
      "Team Rahmah – Compassion in Action Rooted in the value of Rahmah (mercy and compassion), this team focuses on guiding users, resolving concerns, and offering heartfelt support. They ensure every interaction on the Sadaqah App feels warm, respectful, and caring.",
  },
  {
    id: 3,
    ticket: "#8rj37",
    postedBy: "System",
    date: "2 Aug, 2025",
    status: "Closed",
    title: "this is ticket3",
    lastUpdate: "1 Aug, 2025 06:45 PM",
    description:
      "Team Amanah – Trust & Verification Inspired by the Islamic principle of Amanah (trust), this team is responsible for verifying every institution, donor, and transaction. They ensure transparency, safety, and credibility across the Sadaqah App platform.",
  },
  {
    id: 4,
    ticket: "#8rj38",
    postedBy: "Nawaz Akhtar",
    date: "1 Aug, 2025",
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
  const [newTicketMode, setNewTicketMode] = useState(false);
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

  const handleFormOpen = () => {
    setNewTicketMode(true);
    setSelectedPosition(""); // make sure no ticket is selected
    setFormData({
      name: "",
      email: "",
      message: "",
      attachments: null,
    });
  };

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="notification-box">
          <div className="page-heading">
            <h5>
              {(selectedPosition || newTicketMode) && !submitted && (<button
                className="back-button"
                onClick={() => {
                  setNewTicketMode(false);
                  setSelectedPosition("");
                }}
              >
                <ChevronLeft />
              </button>)} Help and Support </h5>
            <span onClick={handleFormOpen}> <SquarePlus />Open New Ticket</span>
          </div>
          {/* Position Boxes */}
          {!selectedPosition && !showConfirmation && !newTicketMode && (
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

          {(selectedPosition || newTicketMode) && !submitted && (
            <>
              {selectedPosition && (
                <div className="help-detail-box">
                  <h5>{Tickets.find((p) => p.id === selectedPosition)?.ticket || ""}</h5>
                  <h5>Subject : {Tickets.find((p) => p.id === selectedPosition)?.title || ""}</h5>
                  <h6>
                    Posted By : {Tickets.find((p) => p.id === selectedPosition)?.postedBy || ""} On{" "}
                    {Tickets.find((p) => p.id === selectedPosition)?.date || ""}
                  </h6>
                  <p>{Tickets.find((p) => p.id === selectedPosition)?.description || ""}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="post-card">
                {newTicketMode && (
                  <>
                    <label>Subject</label>
                    <input
                      className="search__input"
                      type="text"
                      name="position"
                      placeholder="Ticket Subject"
                      value={formData.position || ""}
                      onChange={handleChange}
                      required
                    />
                  </>
                )}

                {/* common fields */}
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

                <button
                  type="button"
                  className="post-button cancel-button"
                  onClick={() => {
                    setNewTicketMode(false);
                    setSelectedPosition("");
                  }}
                >
                  Cancel
                </button>
              </form>
            </>
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
    </div >
  );
};

export default Career;
