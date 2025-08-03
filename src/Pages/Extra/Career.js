import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useEffect, useState } from "react";
import Ads from "../../Components/Ads/Ads";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Info } from "lucide-react";
import poster1 from "../../Assets/team-ansar.png"
import poster2 from "../../Assets/team-Rahmah.png"
import poster3 from "../../Assets/team-amanah.png"
import poster4 from "../../Assets/team-fikr.png"

const positions = [
  { id: "Team Ansar", label: "Team Ansar", poster: poster1, status: "Coming Soon", description: "Team Ansar – Community Connectors Inspired by the Ansar of Madinah, this team works on the ground to connect and enroll Islamic institutions like mosques and madrasas into the Sadaqah App. They build trust, spread awareness, and grow our verified network with dedication and care." },
  { id: "Team Rahmah", label: "Team Rahmah", poster: poster2, status: "Coming Soon", description: "Team Rahmah – Compassion in Action Rooted in the value of Rahmah (mercy and compassion), this team focuses on guiding users, resolving concerns, and offering heartfelt support. They ensure every interaction on the Sadaqah App feels warm, respectful, and caring." },
  { id: "Team Amanah", label: "Team Amanah", poster: poster3, status: "Coming Soon", description: "Team Amanah – Trust & Verification Inspired by the Islamic principle of Amanah (trust), this team is responsible for verifying every institution, donor, and transaction. They ensure transparency, safety, and credibility across the Sadaqah App platform." },
  { id: "Team Fikr", label: "Team Fikr", poster: poster4, status: "Coming Soon", description: "Team Fikr – Thoughtful Planning & Vision Inspired by the word Fikr (deep thought and concern), this team is responsible for strategy, planning, and continuous improvement. They think ahead to ensure the app grows with purpose and impact." },
];

const Career = () => {
  const navigate = useNavigate();
  const [selectedPosition, setSelectedPosition] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    coverLetter: "",
    resume: null,
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
    if (name === "resume") {
      setFormData({ ...formData, resume: files[0]?.name || "" });
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
        phone: "",
        position: "",
        coverLetter: "",
        resume: null,
      });
    }, 5000); // 5 seconds confirmation modal
  };

  const handlePositionSelect = (positionId) => {
    setSelectedPosition(positionId);
    setFormData({ ...formData, position: positionId });
  };

  console.log(activeTooltip, "activeTooltip")

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="notification-box">
          <div className="page-heading">
          <h5> {selectedPosition && !submitted && (
            <button
              className="back-button"
              onClick={() => setSelectedPosition("")}
            >
              <ChevronLeft />
            </button>
          )}Career Opportunities</h5>
          </div>
          {/* Position Boxes */}
          {!selectedPosition && !showConfirmation && (
            <div className="position-boxes">
              {positions.map((pos) => (
                <div
                  key={pos.id}
                  className={`position-box ${selectedPosition === pos.id ? "selected" : ""
                    }`}

                >
                  <img onClick={() => handlePositionSelect(pos.id)} src={pos.poster} alt="" />
                  <div className="career-info">
                    <Info onClick={() => setActiveTooltip(activeTooltip === pos.id ? null : pos.id)} />
                    {activeTooltip === pos.id && (
                      <div className={`career-tooltip ${pos.id}`}>
                        {pos.description}
                      </div>
                    )}
                  </div>
                  <div className="career-status">
                    <p>
                      {pos.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Application Form */}
          {selectedPosition && !submitted && (
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
              <label>Number</label>
              <input
                className="search__input"
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <label>Position</label>
              <input
                className="search__input"
                type="text"
                name="position"
                value={
                  positions.find((p) => p.id === selectedPosition)?.label || ""
                }
                disabled
              />
              <label>About Yourself</label>
              <textarea
                className="search__input"
                name="coverLetter"
                placeholder="Cover Letter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={5}
              />
              <label>CV (.pdf, .doc, .docx)</label>
              <input
                className="search__input"
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                required
              />
              <button className="post-button" type="submit">
                Submit Application
              </button>
            </form>
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
          {!selectedPosition && !showConfirmation && applications.length > 0 && (
            <div className="submitted-list">
              <h5>Submitted Applications</h5>
              {applications.map((app, idx) => (
                <div className="submitted-item" key={idx}>
                  <strong>{app.name}</strong> ({app.email})<br />
                  Applied for:{" "}
                  {
                    positions.find((p) => p.id === app.position)?.label ||
                    app.position
                  }{" "}
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