import React, { useState } from 'react';
import Slider from "react-slick";
import './FeedCard.css';
import { GoHeart, GoPaperAirplane } from "react-icons/go";
import { LuMessageCircle, LuBookmark } from "react-icons/lu";
import defaultimg from "../../Assets/Posts/vecteezy_holy-book-quran-and-tasbih-isolated-on-white-background_5714464.jpg"
import hadith from "../../Assets/Posts/hadith.png"

const FeedCard = ({ index, post }) => {
    const [showFull, setShowFull] = useState(false);

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    // console.log(post,"post")

    return (
        <div className="feedcard" key={index}>
            {/* Header */}
            <div className="feedcard-header">
                <img src={post.avatar} alt="avatar" className="avatar" />
                <div>
                    <span className="username">{post.username} <span className="verified">Verified</span></span>
                    <span className="user-location">{post.location}</span>
                </div>
            </div>
            {post.type === "Quran" || post.type === "Hadith" ? (
                <>
                    {post.image && post.image.length > 0 ? (
                        <div className="feedcard-carousel">
                            <Slider {...sliderSettings}>
                                {post.image.map((img, idx) => (
                                    <div key={idx} className="carousel-image-wrapper">
                                        <img src={img} alt={`slide-${idx}`} className="carousel-image" />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    ) : post.type === "Quran" ? (
                        <div className="feedcard-carousel">
                            <div className="carousel-image-wrapper">
                                <img src={defaultimg} alt="default" className="carousel-image" />
                            </div>
                        </div>
                    ) : post.type === "Hadith" ? (
                        <div className="feedcard-carousel">
                            <div className="carousel-image-wrapper">
                                <img src={hadith} alt="hadith" className="carousel-image" />
                            </div>
                        </div>
                    ) : (
                        <div className="feedcard-carousel">
                            <div className="carousel-image-wrapper">
                                <img src={defaultimg} alt="default" className="carousel-image" />
                            </div>
                        </div>
                    )}
                    <div className="feedcard-buttons">
                        <div className="left-icons">
                            <div className="options">
                                <GoHeart className="icon" />{post.likes}
                            </div>
                            <div className="options">
                                <LuMessageCircle className="icon" /> 435
                            </div>
                            <div className="options">
                                <GoPaperAirplane className="icon" /> 25
                            </div>
                        </div>
                        <LuBookmark className="icon" />
                    </div>

                    {/* Description */}
                    <div className="feedcard-description">
                        <h6>
                            {post.title.length > 60 ? `${post.title.slice(0, 60)}...` : post.title}
                        </h6>
                        {showFull || post.description.length <= 120
                            ? post.description
                            : `${post.description.slice(0, 120)}... `}
                        {!showFull && post.description.length > 120 && (
                            <span className="more-link" onClick={() => setShowFull(true)}>more</span>
                        )}
                    </div>
                </>
            ) : (
                <>
                    {post.image && post.image.length > 0 && (
                        <div className="feedcard-carousel">
                            <Slider {...sliderSettings}>
                                {post.image.map((img, idx) => (
                                    <div key={idx} className="carousel-image-wrapper">
                                        <img src={img} alt={`slide-${idx}`} className="carousel-image" />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}
                    {/* Buttons */}
                    <div className="feedcard-buttons">
                        <div className="left-icons">
                            <div className="options">
                                <GoHeart className="icon" />{post.likes}
                            </div>
                            <div className="options">
                                <LuMessageCircle className="icon" /> 435
                            </div>
                            <div className="options">
                                <GoPaperAirplane className="icon" /> 25
                            </div>
                        </div>
                        <LuBookmark className="icon" />
                    </div>

                    {/* Description */}
                    <div className="feedcard-description">
                        <strong>{post.username}</strong>{" "}
                        {showFull || post.description.length <= 100
                            ? post.description
                            : `${post.description.slice(0, 100)}... `}
                        {!showFull && post.description.length > 100 && (
                            <span className="more-link" onClick={() => setShowFull(true)}>more</span>
                        )}
                    </div>
                </>

            )}



            <span className="time">{post.daysAgo}</span>
        </div>
    );
};

export default FeedCard;