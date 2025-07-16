import "./Search.css";
import React, { useEffect, useState } from "react";
import Searchbox from "../../Components/Searchbox/Searchbox";
import CombinedFeedData from "../AppData";
import SearchCard from "../../Components/Cards/SearchCard";
import defaultImage from "../../Assets/app-bg.png";
import { useNavigate } from "react-router-dom";
import Ads from "../../Components/Ads/Ads";
import searchimg from "../../Assets/search.png"

const Search = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (!authUser) {
      navigate("/login");
    }
  }, [navigate]);
  const [searchTerm, setSearchTerm] = useState("");

  // Flatten and enrich all posts with user info and relative date
  const allPosts = CombinedFeedData.filter((user) => user.type === "institute");

  // Sort newest posts first
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  // Search filter
 const filteredPosts = sortedPosts.filter((post) => {
  const terms = searchTerm.toLowerCase().split(" ");
  const combined = `${post.username} ${post.location}`.toLowerCase();
  return terms.every(term => combined.includes(term));
});

  return (
    <div className="Search">
      <div className="Home-main">
        <Searchbox value={searchTerm} setSearch={setSearchTerm} />
        {searchTerm && filteredPosts.length === 0 ? (
          <div className="search-image">
            <img src={defaultImage} alt="No results found" />
            <div className="searchimg">
              <img src={searchimg} alt="" />
              <h5>No results found.</h5>
            </div>
          </div>
        ) : !searchTerm ? (
          <div className="search-image">
            <img src={defaultImage} alt="Search something" />
            <div className="searchimg">
              <img src={searchimg} alt="" />
              <h5>Start typing to search Institute.</h5>
            </div>
          </div>
        ) : (
          <div className="search-instittute-box">
            {filteredPosts.map((post, index) => (
              <>
                <SearchCard key={index} searchItem={post} />
              </>
            ))}
          </div>
        )}
        <Ads />
      </div>
    </div>
  );
};

export default Search;
