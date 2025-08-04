import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useEffect, useState } from "react";
import Ads from "../../Components/Ads/Ads";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Info, SquarePlus } from "lucide-react";
import "./Pages.css";

const StaticTickets = [
  {
    id: 1,
    ticket: "#8rj39",
    postedBy: "Shabbeer",
    date: "1 Aug, 2025",
    status: "Replied",
    title: "this is ticket1",
    lastUpdate: "1 Aug, 2025 06:45 PM",
    messages: [
      {
        title: "Initial title",
        message: "initial message",
        attachments: null,
        timestamp: "2025-08-01T18:45:00",
      },
      {
        title: "Follow up",
        message: "Some reply...",
        attachments: null,
        timestamp: "2025-08-04T15:49:00",
      }
    ],
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
    messages: [
      {
        title: "Initial title",
        message: "initial message",
        attachments: null,
        timestamp: "2025-08-01T18:45:00",
      },
      {
        title: "Follow up",
        message: "Some reply...",
        attachments: null,
        timestamp: "2025-08-04T15:49:00",
      }
    ],
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
    messages: [
      {
        title: "Initial title",
        message: "initial message",
        attachments: null,
        timestamp: "2025-08-01T18:45:00",
      },
      {
        title: "Follow up",
        message: "Some reply...",
        attachments: null,
        timestamp: "2025-08-04T15:49:00",
      }
    ],
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
    messages: [
      {
        title: "Initial title",
        message: "initial message",
        attachments: null,
        timestamp: "2025-08-01T18:45:00",
      },
      {
        title: "Follow up",
        message: "Some reply...",
        attachments: null,
        timestamp: "2025-08-04T15:49:00",
      }
    ],
    description:
      "Team Fikr – Thoughtful Planning & Vision Inspired by the word Fikr (deep thought and concern), this team is responsible for strategy, planning, and continuous improvement. They think ahead to ensure the app grows with purpose and impact.",
  },
];

const Help = () => {
  const navigate = useNavigate();
  const [selectedPosition, setSelectedPosition] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [newTicketMode, setNewTicketMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    attachments: null,
  });

  const [applications, setApplications] = useState([]);
  const [ticketReplies, setTicketReplies] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("ticket");
    if (saved) {
      const parsed = JSON.parse(saved);
      const updated = parsed.map((t, index) => ({
        id: StaticTickets.length + index + 1,
        status: t.status || "On Going",
        ticket: t.ticket || `#${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        postedBy: t.name || "User",
        date: t.date,
        lastUpdate: t.lastUpdate || t.date,
        title: t.title,
        description: t.message,
        ...t,
      }));
      setApplications(updated);
    }

    const savedReplies = localStorage.getItem("ticketReplies");
    if (savedReplies) {
      setTicketReplies(JSON.parse(savedReplies));
    }
  }, []);

  const mergedTickets = [...StaticTickets, ...applications];
  const selectedTicket = mergedTickets.find((t) => t.id === selectedPosition);

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

    if (selectedPosition) {
      // Add reply to existing ticket
      const newReply = {
        title: formData.title,
        message: formData.message,
        attachments: formData.attachments,
        timestamp: new Date().toISOString(),
      };
      const existing = ticketReplies[selectedPosition] || [];
      const updatedReplies = {
        ...ticketReplies,
        [selectedPosition]: [newReply, ...existing],
      };
      setTicketReplies(updatedReplies);
      localStorage.setItem("ticketReplies", JSON.stringify(updatedReplies));
      setFormData({ title: "", message: "", attachments: null });
      return;
    }

    const uniqueTicketId = `#${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const newApp = {
      id: StaticTickets.length + applications.length + 1,
      status: "On Going",
      ticket: uniqueTicketId,
      postedBy: formData.name || "User",
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      lastUpdate: new Date().toLocaleString(),
      title: formData.title,
      description: formData.message,
      ...formData,
    };

    const updatedApps = [...applications, newApp];
    setApplications(updatedApps);
    localStorage.setItem("ticket", JSON.stringify(updatedApps));

    setSubmitted(true);
    setShowConfirmation(true);

    setTimeout(() => {
      setSubmitted(false);
      setShowConfirmation(false);
      setSelectedPosition("");
      setFormData({
        title: "",
        message: "",
        attachments: null,
      });
    }, 5000);
  };

  const handleCloseTicket = (id) => {
    const updated = applications.map((ticket) =>
      ticket.id === id ? { ...ticket, status: "Closed" } : ticket
    );
    setApplications(updated);
    localStorage.setItem("ticket", JSON.stringify(updated));
  };

  const handlePositionSelect = (positionId) => {
    setSelectedPosition(positionId);
  };

  const handleFormOpen = () => {
    setNewTicketMode(true);
    setSelectedPosition("");
    setFormData({
      title: "",
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
              {(selectedPosition || newTicketMode) && !submitted && (
                <button
                  className="back-button"
                  onClick={() => {
                    setNewTicketMode(false);
                    setSelectedPosition("");
                  }}
                >
                  <ChevronLeft />
                </button>
              )}
              Help and Support
            </h5>
            <span onClick={handleFormOpen}>
              <SquarePlus />
              Open New Ticket
            </span>
          </div>

          {!selectedPosition && !showConfirmation && !newTicketMode && (
            <div className="help-ticket-boxes">
              {applications.concat(StaticTickets).map((pos) => (
                <div
                  key={pos.id}
                  className={`help-ticket-box ${selectedPosition === pos.id ? "selected" : ""}`}
                  onClick={() => handlePositionSelect(pos.id)}
                >
                  <h6>{pos.ticket} - {pos.title}</h6>
                  <p className={`help application-status ${pos.status}`}>{pos.status}</p>
                  <p>Last Updated : {pos.lastUpdate}</p>
                </div>
              ))}
            </div>
          )}

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
                <>
                  <div className="help-detail-box">
                    <h5>{selectedTicket?.ticket}</h5>
                    <h5>Subject : {selectedTicket?.title}</h5>
                    <h6>
                      Posted By : {selectedTicket?.postedBy} On {selectedTicket?.date}
                    </h6>
                    <p>{selectedTicket?.description}</p>
                  </div>
                  {ticketReplies[selectedPosition]?.length > 0 && (
                    <>
                      {
                        ticketReplies[selectedPosition].map((msg, index) => (
                          <div className="help-detail-box post-card">
                            <h5>Subject : {msg.title}</h5>
                            <h6>
                              Posted By : {selectedTicket?.postedBy} On{" "}
                              {new Date(msg.timestamp).toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </h6>
                            <p>{msg.message}</p>
                          </div>

                        ))
                      }
                    </>
                  )}
                  {selectedTicket?.status !== "Closed" && (
                    <div className="post-card">
                      <button
                        className="post-button"
                        onClick={() => handleCloseTicket(selectedTicket.id)}
                      >
                        Close Ticket
                      </button>
                    </div>
                  )}
                </>
              )}

              <form onSubmit={handleSubmit} className="post-card">
                <label>Title</label>
                <input
                  className="search__input"
                  name="title"
                  placeholder="title"
                  value={formData.title}
                  onChange={handleChange}
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
                />

                <button className="post-button" type="submit">
                  {selectedPosition ? "Add Reply" : "Submit Ticket"}
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
        </div>
      </div>
    </div>
  );
};


export default Help;