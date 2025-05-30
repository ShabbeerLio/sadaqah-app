import React from "react";
import "./Home.css";
import Banners from "../../Components/Banner/Banner";
import Collection from "../../Components/Collection/Collection";
import Searchbox from "../../Components/Searchbox/Searchbox";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <div className="Home">
      <div className="Home-main">
        <Banners />
        <Collection />
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
