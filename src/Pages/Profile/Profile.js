import React, { useEffect } from "react";
import "./Profile.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import CombinedFeedData from "../AppData";
import { Plus } from "lucide-react";

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
                  <span
                    onClick={() =>
                      navigate(`/connections/${data.username}?type=followers`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <strong>{data.followers} </strong>
                    followers
                  </span>
                )}
                {data.following && (
                  <span
                    onClick={() =>
                      navigate(`/connections/${data.username}?type=following`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <strong>{data.following} </strong>
                    following
                  </span>
                )}
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
            {/* First + Box for Institute */}
            {!id && user.type === "institute" && (
              <div
                className="gallery-item add-post"
                onClick={() => navigate("/add-feed")}
                title="Add New Post"
              >
                <div className="plus-icon">
                  {" "}
                 <Plus />
                </div>
              </div>
            )}

            {/* Existing Posts */}
            {data?.posts?.map((i) => (
              <div
                className="gallery-item"
                key={i.id}
                onClick={() => navigate(`/feeds?postId=${i.id}`)}
                style={{ cursor: "pointer" }}
              >
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
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
