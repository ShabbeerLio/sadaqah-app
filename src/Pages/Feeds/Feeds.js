import React, { useEffect, useState } from "react";
import FeedCard from "../../Components/Cards/FeedCard";
import "./Feeds.css";
import CombinedFeedData from "../AppData";
import Searchbox from "../../Components/Searchbox/Searchbox";
import { useNavigate } from "react-router-dom";

const Feeds = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (!authUser) {
      navigate("/login");
    }
  }, [navigate]);

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
    }); // e.g., "Mar 14, 2025"
  };

  // Flatten and enrich all posts with user info and relative date
  const allPosts = CombinedFeedData.filter((user) => user.type === "institute") // only institutes
    .flatMap((user) =>
      user.posts.map((post) => ({
        ...post,
        username: user.username,
        avatar: user.avatar,
        followers: user.followers,
        daysAgo: getTimeAgo(post.time),
      }))
    );

  // Sort newest posts first
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  // Search filter
  const filteredPosts = sortedPosts.filter((post) =>
    post.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Home">
      <div className="Home-main">
        <Searchbox value={searchTerm} setSearch={setSearchTerm} />
        <div className="Feeds-box">
          {filteredPosts.map((post, index) => (
            <FeedCard key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feeds;
