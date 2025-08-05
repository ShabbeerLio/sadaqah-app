import React, { useEffect, useState } from "react";
import "./Home.css";
import Banners from "../../Components/Banner/Banner";
import Collection from "../../Components/Collection/Collection";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import Ads from "../../Components/Ads/Ads";
import Adhan from "../../Components/Adhan/Adhan";
import RegistrationForm from "./RegistrationForm";
import { X } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [registerformopen, setRegisterformopen] = useState("");

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (!authUser) {
      navigate("/login");
    }
    setTimeout(() => setRegisterformopen("active"), 1000);
  }, [navigate]);

  const handleTakeRes = () => {
    setRegisterformopen("active");
  };

  const handlecloseTakeRes = () => {
    setRegisterformopen("exiting");
    setTimeout(() => setRegisterformopen(""), 300);
  };

  return (
    <div className="Home">
      <div className="Home-main">
        <Adhan />
        <Banners />
        <Collection />
        <Ads />
        <Footer />
        <div className={`responsiblity-box ${registerformopen}`}>
          <div className="responsiblity-box-item">
            <div className="responsiblity-top">
              <h5>Registration Form</h5>
              <X onClick={handlecloseTakeRes} />
            </div>
            <div className="responsiblity-note">
              <RegistrationForm handlecloseTakeRes={handlecloseTakeRes}/>
            </div>
          </div>
          <div className="responsiblity-filter"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
