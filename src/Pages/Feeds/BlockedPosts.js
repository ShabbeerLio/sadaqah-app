import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import FeedCard from "../../Components/Cards/FeedCard";
import Host from "../../Host";
import NoteContext from "../../Context/SadaqahContext";
import avatar2 from "../../Assets/avtar2.jpg";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import defaultimg from "../../Assets/Posts/vecteezy_holy-book-quran-and-tasbih-isolated-on-white-background_5714464.jpg";
import hadith from "../../Assets/Posts/hadith.png";

const BlockedPosts = () => {
    const {
        userDetail,
        getAccountDetails,
        postDetail,
        getAllPosts,
        instituteDetail,
        getAllInstitute,
    } = useContext(NoteContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        } else {
            getAccountDetails();
            getAllPosts();
            getAllInstitute();
        }
    }, [navigate]);

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const [blockedPosts, setBlockedPosts] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [showFull, setShowFull] = useState(false);

    const user = userDetail;

    // Filter blocked posts
    useEffect(() => {
        if (user?.blockedPosts && postDetail.length > 0) {
            const blocked = postDetail.filter((post) =>
                user.blockedPosts.includes(post._id)
            );
            setBlockedPosts(blocked);
        }
    }, [user, postDetail]);

    // Function to format how long ago the post was
    const getTimeAgo = (dateString) => {
        const postDate = new Date(dateString);
        const now = new Date();

        const diffTime = now - postDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 14) return "1 week ago";
        if (diffDays < 21) return "2 weeks ago";
        if (diffDays < 30) return "3 weeks ago";

        return postDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };
    // console.log(postDetail, "postDetail");
    const institutesArray = Array.isArray(instituteDetail)
        ? instituteDetail
        : instituteDetail?.institutes || [];

    // First flatten/enrich posts
    // Flatten + enrich posts
    const allPosts = blockedPosts.map((post) => {
        const institute = institutesArray.find(
            (inst) => inst?._id === (post?.institute?._id || post?.institute)
        );

        return {
            ...post,
            userName: institute ? institute.userName : post?.userName,
            avatar: institute ? institute.avatar : post?.avatar,
            followers: institute ? institute.followers : post?.followers,
            daysAgo: getTimeAgo(post?.createdAt),
        };
    });
    // Unblock a post
    const handleUnblock = async (postId) => {
        try {
            const url = `${Host}/posts/unblock/${postId}`;
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });

            const data = await res.json();
            if (data.success) {
                alert(data.msg);
                getAccountDetails();
            } else {
                console.log(data.message || "Action failed");
            }
        } catch (err) {
            console.error("Error blocking/unblocking post:", err);
        }
    };
    return (
        <div className="Home">
            <div className="Home-main">
                <div className="profile-header other" style={{marginTop:"1rem"}}>
          <button className="back-button" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </button>
          <h2>Blocked Feeds</h2>
        </div>
                <div className="Feeds-box">
                    {allPosts.length === 0 ? (
                            <p style={{textAlign:"center", marginTop:"1rem"}}>No blocked posts.</p>
                    ) : (
                        allPosts.map((post, idx) => (
                            <div className="feedcard" key={idx}>
                                <div className="feedcard-header">
                                    <img
                                        src={post?.avatar ? post?.avatar : avatar2}
                                        alt="avatar"
                                        className="avatar"
                                    />
                                    <div>
                                        <span className="username">
                                            {post?.userName}{" "}
                                            <span className="verified">Verified</span>
                                        </span>
                                        <span className="user-location">{post?.location}</span>
                                    </div>
                                    <div
                                        className="feedcard-moreitems"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowOptions(!showOptions);
                                        }}
                                    >
                                        <EllipsisVertical className="icon" />
                                    </div>
                                </div>
                                {post?.type === "Quran" || post?.type === "Hadith" ? (
                                    <>
                                        {post?.image && post?.image.length > 0 ? (
                                            <div className="feedcard-carousel">
                                                <Slider {...sliderSettings}>
                                                    {post.image.map((img, idx) => (
                                                        <div key={idx} className="carousel-image-wrapper">
                                                            <img
                                                                src={img}
                                                                alt={`slide-${idx}`}
                                                                className="carousel-image"
                                                            />
                                                        </div>
                                                    ))}
                                                </Slider>
                                            </div>
                                        ) : post.type === "Quran" ? (
                                            <div className="feedcard-carousel">
                                                <div className="carousel-image-wrapper">
                                                    <img
                                                        src={defaultimg}
                                                        alt="default"
                                                        className="carousel-image"
                                                    />
                                                </div>
                                            </div>
                                        ) : post.type === "Hadith" ? (
                                            <div className="feedcard-carousel">
                                                <div className="carousel-image-wrapper">
                                                    <img
                                                        src={hadith}
                                                        alt="hadith"
                                                        className="carousel-image"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="feedcard-carousel">
                                                <div className="carousel-image-wrapper">
                                                    <img
                                                        src={defaultimg}
                                                        alt="default"
                                                        className="carousel-image"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="feedcard-description">
                                            <h6>
                                                {post.title.length > 60
                                                    ? `${post.title.slice(0, 60)}...`
                                                    : post.title}
                                            </h6>
                                            {showFull || post.description.length <= 120
                                                ? post.description
                                                : `${post.description.slice(0, 120)}... `}
                                            {!showFull && post.description.length > 120 && (
                                                <span
                                                    className="more-link"
                                                    onClick={() => setShowFull(true)}
                                                >
                                                    more
                                                </span>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {post?.image && post?.image.length > 0 && (
                                            <div className="feedcard-carousel">
                                                <Slider {...sliderSettings}>
                                                    {post.image.map((img, idx) => (
                                                        <div key={idx} className="carousel-image-wrapper">
                                                            <img
                                                                src={img}
                                                                alt={`slide-${idx}`}
                                                                className="carousel-image"
                                                            />
                                                        </div>
                                                    ))}
                                                </Slider>
                                            </div>
                                        )}

                                        <div className="feedcard-description">
                                            <strong>{post?.userName}</strong>{" "}
                                            {showFull || post?.description.length <= 100
                                                ? post?.description
                                                : `${post?.description.slice(0, 100)}... `}
                                            {!showFull && post?.description.length > 100 && (
                                                <span
                                                    className="more-link"
                                                    onClick={() => setShowFull(true)}
                                                >
                                                    more
                                                </span>
                                            )}
                                        </div>
                                    </>
                                )}

                                <span className="time">{post?.daysAgo}</span>
                                {showOptions && (
                                    <div
                                        className="feedcard-options-modal"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ul>
                                            <li
                                                onClick={() => {
                                                    handleUnblock(post._id);
                                                    setShowOptions(false);
                                                }}
                                            >
                                                Unblock Post
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlockedPosts;
