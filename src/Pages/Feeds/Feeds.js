import React, { useState } from "react";
import FeedCard from "../../Components/Cards/FeedCard";
import "./Feeds.css";
import CombinedFeedData from "../AppData";

const Feeds = () => {
  const [searchTerm, setSearchTerm] = useState("");

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
  const allPosts = CombinedFeedData.flatMap((user) =>
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
        <div className="search">
          <input
            type="text"
            className="search__input"
            placeholder="Search by username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search__button">
            <svg
              className="search__icon"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </button>
        </div>
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