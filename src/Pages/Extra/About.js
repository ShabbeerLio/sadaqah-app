import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="Home other">
      <div className="Home-main">
        <div className="profile-header other" style={{ marginTop: "1rem" }}>
          <button className="back-button" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </button>
          <h2>About Us</h2>
        </div>
        <div className="notification-box">
          {/* <h5>About Us</h5> */}
          <div className="about-box">
            <p>
              Sadaqah App is a faith-inspired digital platform designed to make
              Islamic giving easy, transparent, and impactful. Our mission is to
              connect donors with verified Islamic institutions—such as mosques,
              madrasas, orphanages, and welfare organizations—so that acts of
              Sadaqah, Zakat, and Fitrah can be carried out with confidence and
              purpose.
            </p>
            <p>
              We blend modern technology with timeless Islamic values, enabling
              users to contribute individually or collectively through smart
              wallets, track donations, and support causes that matter most to
              them. Each institution goes through a verification process to
              ensure authenticity and trust.
            </p>
            <p>
              Our goal is to create a reliable ecosystem where giving becomes a
              part of everyday life, and where every contribution—no matter how
              small—can make a big difference. With Sadaqah App, charity becomes
              easier, more organized, and deeply rooted in the principles of the
              Deen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
