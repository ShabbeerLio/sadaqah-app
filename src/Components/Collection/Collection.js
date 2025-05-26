import React from "react";
import "./Collection.css"
import { GoArrowUpRight,GoShareAndroid } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";

const Collection = () => {
    return (
        <div className="Collection">
            <div className="Collection-main">
                <div className="Collection-box">
                    <div className="Collection-box-left">
                        <span>Total 0 Payment</span>
                        <h2>₹0</h2>
                        <div className="collection-left-bottom">
                            <p><FaArrowTrendUp />Discover new Insights!</p>
                            <h6>View Analytics</h6>
                        </div>
                    </div>
                    <div className="Collection-box-right">
                        <div className="collection-right-card">
                            <p><GoArrowUpRight /></p>
                            <span>Send Money</span>
                        </div>
                        <div className="collection-right-card">
                            <p><GoShareAndroid /></p>
                            <span>Share</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Collection;
