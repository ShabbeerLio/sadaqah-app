import React from "react";
import "./SearchCard.css"

const SearchCard = ({ index, searchItem }) => {
    console.log(searchItem,"searchItem")
    return (
        <div className="SearchCard" key={index}>
            <div className="SearchCard-left">
                <img src={searchItem.avatar} alt="" />
            </div>
            <div className="SearchCard-right">
                <h6>{searchItem.username}</h6>
                <p>{searchItem.location}</p>
            </div>
        </div>
    );
};

export default SearchCard;
