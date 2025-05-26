import React from 'react';
import './Profile.css';
import ProfileData from './ProfileData';
import { Link } from 'react-router-dom';
import CombinedFeedData from '../AppData';

const Profile = () => {

    const data = CombinedFeedData[0];
    console.log(data, "data")
    return (
        <div className="Home">
            <div className="Home-main">
                <div className="profile-container">
                    <div className="profile-header">
                        <div className="profile-pic">
                            <img src={data.avatar} alt="Profile" />
                        </div>
                        <div className="profile-info">
                            <div className="profile-stats">
                                <span><strong>{data.posts.length}</strong> posts</span>
                                <span><strong>{data.followers}</strong> followers</span>
                            </div>

                        </div>
                    </div>
                    <div className="profile-details">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, et.</p>
                        <Link>Lorem, ipsum dolor.</Link>
                    </div>

                    <div className="profile-highlights">
                        <Link to={"/profile-edit"} className="highlight">Edit Profile</Link>
                        <Link className="highlight">Share Profile</Link>
                    </div>

                    <div className="profile-gallery">
                        {data.posts.map((i) => (
                            <div className="gallery-item" key={i.id}>
                                <img src={i.image[0]} alt="" />
                            </div>
                        ))}
                    </div>
                    <Link style={{ marginTop: "1rem" }} to={"/login"} className="highlight">Log Out</Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;