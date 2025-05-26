import React from 'react';
import './Profile.css';
import ProfileData from './ProfileData';
import { Link } from 'react-router-dom';

const Profile = () => {

    const data = ProfileData[0];
    console.log(data, "data")
    return (
        <div className="Home">
            <div className="Home-main">
                <div className="profile-container">
                    <div className="profile-header">
                        <div className="profile-pic">
                            <img src={data.profile} alt="Profile" />
                        </div>
                        <div className="profile-info">
                            <div className="profile-stats">
                                <span><strong>{data.post.length}</strong> posts</span>
                                <span><strong>{data.followers}</strong> followers</span>
                            </div>

                        </div>
                    </div>

                    <div className="profile-highlights">
                        <Link to={"/profile-edit"} className="highlight">Edit Profile</Link>
                        <Link className="highlight">Share Profile</Link>
                    </div>

                    <div className="profile-gallery">
                        {data.post.map((i) => (
                            <div className="gallery-item" key={i.id}>
                                <img src={i.image} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;