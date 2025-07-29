import React, { useEffect, useState } from "react";
import FeedCard from "../../Components/Cards/FeedCard";
import "./Feeds.css";
import CombinedFeedData from "../AppData";
import Searchbox from "../../Components/Searchbox/Searchbox";
import { useNavigate } from "react-router-dom";
import Filters from "../../Components/Filters/Filters";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

const Feeds = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postIdFromQuery = queryParams.get("postId");

  console.log(postIdFromQuery,"postIdFromQuery")
  const postRefs = useRef({});
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("authUser"));
  const [filterRange, setFilterRange] = useState({
    from: "",
    to: "",
    type: "",
  });

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
    });
  };

  // Flatten and enrich all posts with user info and relative date
  const allPosts = CombinedFeedData
    .filter((u) => {
      if (user?.type === "institute") {
        return u.username === user.username;
      }
      return u.type === "institute";
    })
    .flatMap((u) =>
      u.posts.map((post) => ({
        ...post,
        username: u.username,
        avatar: u.avatar,
        followers: u.followers,
        daysAgo: getTimeAgo(post.time),
      }))
    );

  // Sort newest posts first
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  // Search filter
  // Apply institute filters (only if institute)
  let filteredPosts = sortedPosts;

  if (user?.type === "institute") {
    filteredPosts = filteredPosts.filter((post) => {
      const postDate = new Date(post.time);
      const fromDate = filterRange.from ? new Date(filterRange.from) : null;
      const toDate = filterRange.to ? new Date(filterRange.to) : null;

      const matchesDate =
        (!fromDate || postDate >= fromDate) &&
        (!toDate || postDate <= toDate);

      const matchesType =
        !filterRange.type || post.type?.toLowerCase() === filterRange.type.toLowerCase();

      return matchesDate && matchesType;
    });
  } else {
    // For users, apply search filtering
    filteredPosts = filteredPosts.filter((post) => {
      const terms = searchTerm.toLowerCase().split(" ");
      const combined = `${post.username} ${post.location}`.toLowerCase();
      return terms.every((term) => combined.includes(term));
    });
  }

  useEffect(() => {
    if (postIdFromQuery && postRefs.current[postIdFromQuery]) {
      postRefs.current[postIdFromQuery].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [postIdFromQuery, filteredPosts]);

  return (
    <div className="Home">
      <div className="Home-main">
        {user?.type === "institute" ? (
          <div className="institute-feeds-box">
            <h5>Your Feeds</h5>
            <div className="institute-feeds-filter">
              <Filters onFilterChange={setFilterRange} />
            </div>
          </div>
        ) : (
          <Searchbox value={searchTerm} setSearch={setSearchTerm} />
        )}

        <div className="Feeds-box">
          {filteredPosts.map((post, index) => (
            <FeedCard
              key={index}
              ref={(el) => {
                if (el) postRefs.current[post.id] = el;
              }}
              post={post}
              user={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feeds;
