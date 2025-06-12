import "./Search.css";
import React, { useEffect, useState } from "react";
import Searchbox from "../../Components/Searchbox/Searchbox";
import CombinedFeedData from "../AppData";
import SearchCard from "../../Components/Cards/SearchCard";
import defaultImage from "../../Assets/app-bg.png"; // Make sure to add the image path correctly
import { useNavigate } from "react-router-dom";

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
  const allPosts = CombinedFeedData.filter((user) => user.type === "institute" || "user");

  // Sort newest posts first
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  // Search filter
  const filteredPosts = sortedPosts.filter((post) =>
    post.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="Search">
      <div className="Home-main">
        <Searchbox value={searchTerm} setSearch={setSearchTerm} />
        {searchTerm && filteredPosts.length === 0 ? (
          <div className="search-image">
            <img src={defaultImage} alt="No results found" />
            <p>No results found.</p>
          </div>
        ) : !searchTerm ? (
          <div className="search-image">
            <img src={defaultImage} alt="Search something" />
            <p>Start typing to search users.</p>
          </div>
        ) : (
          <div className="Feeds-box">
            {filteredPosts.map((post, index) => (
              <SearchCard key={index} searchItem={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
