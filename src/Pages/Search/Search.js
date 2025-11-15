import "./Search.css";
import React, { useContext, useEffect, useState } from "react";
import Searchbox from "../../Components/Searchbox/Searchbox";
import CombinedFeedData from "../AppData";
import SearchCard from "../../Components/Cards/SearchCard";
import defaultImage from "../../Assets/app-bg.png";
import { useNavigate } from "react-router-dom";
import Ads from "../../Components/Ads/Ads";
import searchimg from "../../Assets/search.png";
import NoteContext from "../../Context/SadaqahContext";

const Search = () => {
  const { instituteDetail, getAllInstitute } = useContext(NoteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAllInstitute();
    }
  }, [navigate]);

  const [searchTerm, setSearchTerm] = useState("");

  // Search filter
  const filteredPosts = instituteDetail?.institutes?.filter((institute) => {
    const terms = searchTerm.toLowerCase().split(" ");
    const combined =
      `${institute.userName} ${institute.location}`.toLowerCase();
    return terms.every((term) => combined.includes(term));
  });

  // console.log(filteredPosts, "filteredPosts");

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
