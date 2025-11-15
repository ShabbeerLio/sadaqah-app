import React, { forwardRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "./FeedCard.css";
import { GoHeart, GoHeartFill, GoPaperAirplane } from "react-icons/go";
import { LuMessageCircle, LuBookmark } from "react-icons/lu";
import defaultimg from "../../Assets/Posts/vecteezy_holy-book-quran-and-tasbih-isolated-on-white-background_5714464.jpg";
import hadith from "../../Assets/Posts/hadith.png";
import avatar2 from "../../Assets/avtar2.jpg";
import Host from "../../Host";
import { ArrowUp, Check, CircleCheck, CircleOff, EllipsisVertical, Pencil, Reply, Trash, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeedCard = forwardRef(({ index, post, user, getAllPosts, getAccountDetails }, ref) => {
  const navigate = useNavigate();
  const [showFull, setShowFull] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likes?.length || 0);
  const [shareCount, setShareCount] = useState(post?.shares?.length || 0);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comments, setComments] = useState(post?.comments || []);
  const [commentText, setCommentText] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState(""); // "delete" | "toggle"
  const [selectedPost, setSelectedPost] = useState(null);

  // ✅ Open modal before action
  const openModal = (type, post) => {
    setConfirmType(type);
    setSelectedPost(post);
    setShowConfirm(true);
  };

  // 🟩 Reply feature state
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  // 🟩 End

  useEffect(() => {
    if (user && post?.likes?.includes(user._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, post]);
  useEffect(() => {
    if (user?.blockedPosts?.includes(post._id)) {
      setBlocked(true);
    } else {
      setBlocked(false);
    }
  }, [user, post]);
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleLike = async () => {
    try {
      const res = await fetch(`${Host}/posts/like/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const data = await res.json();

      if (data.success) {
        if (liked) {
          // user is unliking
          setLikeCount((prev) => prev - 1);
        } else {
          // user is liking
          setLikeCount((prev) => prev + 1);
        }
        setLiked(!liked);
      } else {
        console.log(data.message || "Something went wrong");
      }
    } catch (err) {
      console.log("Error liking post:", err);
    }
  };

  const fetchComments = async () => {
    getAllPosts();
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await fetch(`${Host}/posts/comment/${post._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ text: commentText }),
      });

      const data = await res.json();

      if (data.success) {
        setComments(data.comments);
        setCommentText("");
        getAccountDetails();
      } else {
        console.log(data.message || "Comment failed");
      }
    } catch (err) {
      console.error("Error commenting:", err);
    }
  };

  // console.log(activeReplyId, "activeReplyId")

  const handleReply = async (commentId) => {
    // console.log(commentId, "commentId");
    if (!replyText.trim()) return;

    try {
      const res = await fetch(`${Host}/posts/reply/${post._id}/${commentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ text: replyText }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Update only the replies for the specific comment
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? { ...comment, replies: data.replies }
              : comment
          )
        );
        getAccountDetails();

        console.log(data.replies, "updated replies for comment", commentId);

        setReplyText("");
        setActiveReplyId(null);
      } else {
        console.log(data.message || "Reply failed");
      }
    } catch (err) {
      console.error("Error replying:", err);
    }
  };

  const handleShare = async (platform = "copyLink") => {
    try {
      const res = await fetch(`${Host}/posts/share/${post._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ platform }),
      });

      const data = await res.json();

      if (data.success) {
        setShareCount(data.shares);
        alert(`Post shared on ${platform}!`);
      } else {
        console.log(data.message || "Share failed");
      }
    } catch (err) {
      console.error("Error sharing post:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => setShowOptions(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);
  // console.log(post.userName, "post");
  // console.log(comments, "uscommentser");

  const handleBlock = async () => {
    try {
      const url = `${Host}/posts/block/${post._id}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const data = await res.json();
      if (data.success) {
        setBlocked(!blocked);
        alert(data.msg);
        getAccountDetails();
      } else {
        console.log(data.message || "Action failed");
      }
    } catch (err) {
      console.error("Error blocking/unblocking post:", err);
    }
  };

  if (user?.blockedPosts?.includes(post._id)) {
    return null; // don’t render this post
  }

  // ✅ Perform the action after confirmation
  const handleConfirm = async () => {
    if (!selectedPost) return;

    try {
      if (confirmType === "delete") {
        await fetch(`${Host}/posts/delete/${selectedPost._id}`, {
          method: "DELETE",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
      } else if (confirmType === "toggle") {
        const action =
          selectedPost.status === "active" ? "deactivate" : "activate";
        await fetch(`${Host}/posts/${action}/${selectedPost._id}`, {
          method: "PUT",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
      }

      // Refresh data after success
      getAllPosts();
      getAccountDetails();

    } catch (err) {
      console.error(err);
    } finally {
      setShowConfirm(false);
      setSelectedPost(null);
      setConfirmType("");
    }
  };

  // console.log(post, "post")
  // console.log(comments, "comments")

  return (
    <div ref={ref} className="feedcard" key={index}>
      {/* Header */}
      <div className="feedcard-header">
        <img
          src={post?.avatar ? post?.avatar : avatar2}
          alt="avatar"
          className="avatar"
        />
        <div>
          <span className="username">
            {post?.userName} <span className="verified">Verified</span>
          </span>
          <span className="user-location">{post?.location}</span>
        </div>
        <div className="feedcard-moreitems" onClick={(e) => {
          e.stopPropagation(); // prevent triggering outside click
          setShowOptions(!showOptions);
        }}>
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
                <img src={hadith} alt="hadith" className="carousel-image" />
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
          <div className="feedcard-buttons">
            <div className="left-icons">
              <div className="options">
                {liked ? (
                  <GoHeartFill
                    className="icon"
                    style={{ color: "red" }}
                    onClick={handleLike}
                  />
                ) : (
                  <GoHeart className="icon" onClick={handleLike} />
                )}
                {likeCount}
              </div>
              <div className="options" onClick={() => {
                setShowCommentModal(true);
                fetchComments();
              }}>
                <LuMessageCircle className="icon" />{" "}
                {post?.comments?.length || 0}
              </div>
              <div className="options" onClick={() => handleShare("copyLink")}>
                <GoPaperAirplane className="icon" /> {post.shares.length || 0}
              </div>
            </div>
            {/* <LuBookmark className="icon" /> */}
          </div>

          {/* Description */}
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
              <span className="more-link" onClick={() => setShowFull(true)}>
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
          {/* Buttons */}
          <div className="feedcard-buttons">
            <div className="left-icons">
              {/* ❤️ Like */}
              <div className="options">
                {liked ? (
                  <GoHeartFill
                    className="icon"
                    style={{ color: "red" }}
                    onClick={handleLike}
                  />
                ) : (
                  <GoHeart className="icon" onClick={handleLike} />
                )}
                {likeCount}
              </div>

              {/* 💬 Comment */}
              <div className="options" onClick={() => {
                setShowCommentModal(true);
                fetchComments();
              }}>
                <LuMessageCircle
                  className="icon"

                />
                {comments?.length}
              </div>

              {/* 🚀 Share */}
              <div className="options" onClick={() => handleShare("copyLink")}>
                <GoPaperAirplane
                  className="icon"

                />
                {shareCount}
              </div>
            </div>

            {/* <LuBookmark className="icon" /> */}
          </div>

          {/* Description */}
          <div className="feedcard-description">
            <strong>{post?.userName}</strong>{" "}
            {showFull || post?.description.length <= 100
              ? post?.description
              : `${post?.description.slice(0, 100)}... `}
            {!showFull && post?.description.length > 100 && (
              <span className="more-link" onClick={() => setShowFull(true)}>
                more
              </span>
            )}
          </div>
        </>
      )}

      <span className="time">{post?.daysAgo}</span>
      {showCommentModal && (
        <div
          className="comment-modal-overlay"
          onClick={() => setShowCommentModal(false)}
        >
          <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Comments</h4>
              <button
                className="close-btn"
                onClick={() => setShowCommentModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-comments">
              {comments?.length > 0 ? (
                comments?.map((c, idx) => (
                  <>
                    <div className="comment-modal-box">
                      <img src={c.user?.avatar || "https://static.vecteezy.com/system/resources/previews/008/433/598/non_2x/men-icon-for-website-symbol-presentation-free-vector.jpg"} alt="" />
                      <div className="comment-item" key={idx}>
                        <strong>{c.user?.userName ||
                          c.institute?.userName || "User"}</strong>

                        <p>{c.text}</p>

                      </div>

                      {activeReplyId === c._id ? (
                        <button
                          className="reply-btn"
                          onClick={() =>
                            setActiveReplyId(
                              activeReplyId === c._id ? null : c._id
                            )
                          }
                        >
                          <X />
                        </button>

                      ) : <button
                        className="reply-btn"
                        onClick={() =>
                          setActiveReplyId(
                            activeReplyId === c._id ? null : c._id
                          )
                        }
                      >
                        <Reply />
                        Reply
                      </button>}


                    </div>
                    {activeReplyId === c._id && (
                      <div className="reply-input">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                        />
                        <button onClick={() => handleReply(c._id)}>
                          <ArrowUp />
                        </button>
                      </div>
                    )}
                    {c.replies && c.replies.length > 0 && (
                      <div className="replies">
                        {c.replies.map((r, i) => (
                          <div key={i} className="reply-item">
                            <img
                              src={
                                r.user?.avatar ||
                                r.institute?.avatar ||
                                "https://static.vecteezy.com/system/resources/previews/008/433/598/non_2x/men-icon-for-website-symbol-presentation-free-vector.jpg"
                              }
                              alt=""
                            />
                            <div>
                              <strong>
                                {r.user?.userName ||
                                  r.institute?.userName ||
                                  "Anonymous"}
                              </strong>
                              <p>{r.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ))
              ) : (
                <p className="no-comments">No comments yet.</p>
              )}
            </div>

            <div className="modal-input">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
              />
              <button onClick={handleComment}>
                <ArrowUp />
              </button>
            </div>
          </div>
        </div>
      )}
      {showOptions && (
        <div className="feedcard-options-modal" onClick={(e) => e.stopPropagation()}>
          <ul>
            {user?.role === "user" &&
              <li onClick={() => { handleBlock(); setShowOptions(false); }} style={{
                color: post.status === "active" ? "crimson" : "green"
              }}>
                {blocked ? (
                  <>
                    <CircleCheck />Unblock Post
                  </>
                ) : (
                  <>
                    <CircleOff />Block Post
                  </>
                )}
              </li>
            }
            {user?.role === "institute" &&
              <>
                <li onClick={() => navigate(`/add-feed?edit=${post._id}`)}>
                  <Pencil />Edit
                </li>
                <li
                  onClick={() => openModal("toggle", post)}
                  style={{
                    color: post.status === "active" ? "crimson" : "green",
                  }}
                >
                  {post.status === "active" ?
                    (
                      <>
                        <X />Deactivate
                      </>
                    ) : (
                      <>
                        <Check />Activate
                      </>
                    )}
                </li>

                <li
                  onClick={() => openModal("delete", post)}
                  style={{ color: "crimson" }}
                >
                  <Trash /> Delete
                </li>
              </>
            }
          </ul>
        </div>
      )}
      {/* ✅ Confirmation Modal */}
      {showConfirm && (
        <div className="confirmation-modal">
          <div className="confirmation-box">
            <h4>
              {confirmType === "delete"
                ? "Delete Post"
                : selectedPost?.status === "active"
                  ? "Deactivate Post"
                  : "Activate Post"}
            </h4>
            <p>
              {confirmType === "delete"
                ? "Are you sure you want to delete this post? This action cannot be undone."
                : selectedPost?.status === "active"
                  ? "Are you sure you want to deactivate this post?"
                  : "Are you sure you want to activate this post?"}
            </p>

            <div className="confirmation-buttons">
              <button onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button
                onClick={handleConfirm}
              >
                {confirmType === "delete"
                  ? "Delete"
                  : selectedPost?.status === "active"
                    ? "Deactivate"
                    : "Activate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default FeedCard;
