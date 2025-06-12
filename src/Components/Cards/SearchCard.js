import React from "react";
import "./SearchCard.css";
import { useNavigate } from "react-router-dom";

const SearchCard = ({ searchItem }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/profile/${searchItem.id}`);
    };

    return (
        <div className="SearchCard" onClick={handleClick}>
            <div className="SearchCard-left">
                <img src={searchItem.avatar} alt={searchItem.username} />
            </div>
            <div className="SearchCard-right">
                <h6>{searchItem.username} {searchItem?.type === "institute" ? (
                    <span>({searchItem?.instituteType})</span>
                ) : (
                    <span>({searchItem?.type})</span>
                )} </h6>
                <p>{searchItem.location}</p>
            </div>
        </div>
    );
};

export default SearchCard;