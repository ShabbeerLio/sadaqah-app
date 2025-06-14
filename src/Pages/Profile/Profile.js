import React, { useEffect } from "react";
import "./Profile.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import CombinedFeedData from "../AppData";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (!authUser) {
      navigate("/login");
    }
  }, [navigate]);
  const user = JSON.parse(localStorage.getItem("authUser"));
  console.log(user, "user");

  if (!user) return null;

  let data = [];
  if (id) {
    data = CombinedFeedData.find((item) => item.id === Number(id));
  } else {
    data = CombinedFeedData.find((item) => item.username === user.username);
  }

  console.log(CombinedFeedData, "user");
  console.log(data, "dara");
  if (!data) {
    return (
      <div className="Home">
        <p>User not found.</p>
      </div>
    );
  }
  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/login");
  };

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
                {data.posts && data.posts.length > 0 && (
                  <span>
                    <strong>{data.posts.length} </strong>
                    posts
                  </span>
                )}
                {data.followers && (
                  <span>
                    <strong>{data.followers} </strong>
                    followers
                  </span>
                )}
                {data.following && (
                  <span>
                    <strong>{data.following} </strong>
                    following
                  </span>
                )}

                {/* <span>
                  <strong>
                    {data.followers ? data.followers : data.following}
                  </strong>
                  {id ? "followers" : "following"}
                </span> */}
              </div>
            </div>
          </div>
          <div className="profile-details">
            <p>{data.username}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
              et.
            </p>
            <Link>Lorem, ipsum dolor.</Link>
          </div>

          <div className="profile-highlights">
            {!id ? (
              // Viewing own profile
              <>
                <Link to="/profile-edit" className="highlight follow">
                  Edit Profile
                </Link>
                <Link className="highlight">Share Profile</Link>
              </>
            ) : (
              // Viewing someone else's profile
              <>
                {user.type === "institute" ? (
                  data.type === "user" ? (
                    <Link className="highlight follow">Invite</Link>
                  ) : (
                    <Link className="highlight follow">Share Profile</Link>
                  )
                ) : user.type === "user" ? (
                  data.type === "institute" ? (
                    <>
                      <Link className="highlight follow">Follow</Link>
                      <Link className="highlight">Share Profile</Link>
                    </>
                  ) : (
                    <Link className="highlight follow">Share Profile</Link>
                  )
                ) : null}
              </>
            )}
          </div>

          <div className="profile-gallery">
            {data?.posts?.map((i) => (
              <div className="gallery-item" key={i.id}>
                <img src={i.image[0]} alt="" />
              </div>
            ))}
          </div>
          {!id ? (
            <p
            style={{ marginTop: "1rem" }}
            onClick={handleLogout}
            className="highlight"
          >
            Log Out
          </p>
          ) :("")}
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
