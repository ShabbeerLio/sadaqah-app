import React from "react";
import Slider from "react-slick";
import banner1 from "../../Assets/Banner/1.jpg";
import banner2 from "../../Assets/Banner/2.jpg";
import banner3 from "../../Assets/Banner/3.jpg";
import banner4 from "../../Assets/Banner/4.jpg";
import banner5 from "../../Assets/Banner/5.jpg";
import banner6 from "../../Assets/Banner/6.jpg";
import "./Banner.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Banners = () => {
  const images = [banner1, banner2, banner3, banner4, banner5, banner6];
  const user = JSON.parse(localStorage.getItem("authUser"));

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="Banners">
      <div className="Banners-main">
        <Slider {...settings} className="banner-slider">
          {images.map((img, index) => (
            <div className="banner-image" key={index}>
              <img src={img} alt={`banner-${index}`} />
              {user?.type === "institute" ? (
                ""
              ) : (
                <div className="banner-btn">
                  <Link to={"/payment"}>Donate Now</Link>
                </div>
              )}

            </div>
          ))
          }
        </Slider >
      </div >
    </div >
  );
};

export default Banners;
