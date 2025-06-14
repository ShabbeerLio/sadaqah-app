import React from "react";
import Slider from "react-slick";
import banner1 from "../../Assets/Banner/Banner.jpg";
import banner2 from "../../Assets/Posts/post3.jpg";
import banner3 from "../../Assets/Posts/post4.jpg";
import "./Banner.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banners = () => {
  const images = [banner1, banner2, banner3];

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
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banners;
