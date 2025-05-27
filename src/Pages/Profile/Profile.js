import React from 'react';
import './Profile.css';
import { Link, useParams } from 'react-router-dom';
import CombinedFeedData from '../AppData';

const Profile = () => {
    const { id } = useParams();

    const user = CombinedFeedData.find((item) => item.id === Number(id));
    let data = []

    if (id) {
        data = user;
    }
    else {
        data = CombinedFeedData[0];
    }
    // console.log(CombinedFeedData[0],"user")
    // console.log(data)
    if (!data) {
        return <div className="Home"><p>User not found.</p></div>;
    }
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
                                <span><strong>{data.followers}</strong>{id ? "followers": "following" }</span>
                            </div>

                        </div>
                    </div>
                    <div className="profile-details">
                        <p>{data.username}</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, et.</p>
                        <Link>Lorem, ipsum dolor.</Link>
                    </div>

                    {id ? (
                        <>
                            <div className="profile-highlights">
                                <Link className="highlight follow">Follow</Link>
                                <Link className="highlight">Share Profile</Link>
                            </div>
                        </>
                    ) : (<>
                        <div className="profile-highlights">
                            <Link to={"/profile-edit"} className="highlight">Edit Profile</Link>
                            <Link className="highlight">Share Profile</Link>
                        </div>
                    </>)
                    }



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