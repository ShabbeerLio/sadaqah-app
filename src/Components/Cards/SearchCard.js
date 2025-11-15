import React from "react";
import "./SearchCard.css";
import { useNavigate } from "react-router-dom";
import avatar2 from "../../Assets/avtar2.jpg";

const SearchCard = ({ searchItem }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(searchItem._id, "id");
    navigate(`/profile/${searchItem._id}`);
  };

  return (
    <div className="SearchCard" onClick={handleClick}>
      <div className="SearchCard-left">
        <img
          src={searchItem.avatar ? searchItem.avatar : avatar2}
          alt={searchItem.userName}
        />
      </div>
      <div className="SearchCard-right">
        <h6>
          {searchItem.userName.slice(0, 25)}{" "}
          {searchItem?.role === "institute" ? (
            <span>
              ({searchItem?.instituteType}){" "}
              <span className="verified">Verified</span>
            </span>
          ) : (
            <span>({searchItem?.type})</span>
          )}{" "}
        </h6>
        <p>{searchItem.location}</p>
      </div>
    </div>
  );
};

export default SearchCard;
