import React, { useEffect } from "react";
import "./Home.css";
import Banners from "../../Components/Banner/Banner";
import Collection from "../../Components/Collection/Collection";
import Searchbox from "../../Components/Searchbox/Searchbox";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import Ads from "../../Components/Ads/Ads";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (!authUser) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="Home">
      <div className="Home-main">
        <Banners />
        <Collection />
        <Ads />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
