import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import CombinedFeedData from "../AppData";
import { ChevronLeft, Plus } from "lucide-react";
import NoteContext from "../../Context/SadaqahContext";
import Host from "../../Host";
import avatar2 from "../../Assets/avtar2.jpg";

const Profile = () => {
  const { userDetail, getAccountDetails } = useContext(NoteContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  // console.log(id, "id");

  // console.log(userDetail,"userDetail")
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAccountDetails();
      if (id !== undefined) {
        fetchProfile(id);
        fetchPostbyInstituteId(id);
      }
    }
  }, [id, navigate]);

  useEffect(() => {
  if (userDetail?.role === "institute") {
    const instituteId = userDetail?._id;
    fetchProfile(instituteId);
    fetchPostbyInstituteId(instituteId);
  }
}, [userDetail]);

  const fetchProfile = async (id) => {
    try {
      setLoading(true);

      const response = await fetch(`${Host}/auth/institute/${id}`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();

      setProfileData(json);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchPostbyInstituteId = async (id) => {
    try {
      setLoading(true);

      const response = await fetch(`${Host}/posts/institute/${id}`, {
        method: "GET",
      });
      const json = await response.json();

      setPosts(json.posts);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const user = userDetail;
  const data = profileData ? profileData.institute : user;
  console.log(posts, "posts");
  // console.log(user, "user");
  console.log(data, "data");

  if (!data) {
    return (
      <div className="Home">
        <p>User not found.</p>
      </div>
    );
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleFollow = async () => {
    const response = await fetch(`${Host}/follow/follow/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json.success) {
      getAccountDetails()
    } else {
      console.log("error")
    }
  }

  const handleUnfollow = async () => {
    const response = await fetch(`${Host}/follow/unfollow/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json.success) {
      getAccountDetails()
    } else {
      console.log("error")
    }
  }

  console.log(user, "user")

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="profile-container">
          <div className="profile-header">
            <button className="back-button" onClick={() => navigate(-1)}>
              <ChevronLeft />
            </button>
            <h2>Profile</h2>
          </div>
          <div className="profile-header-top">
            <div className="profile-pic">
              <img src={data.avatar ? data.avatar : avatar2} alt="Profile" />
            </div>
            <div className="profile-info">
              <div className="profile-stats">
                {posts && posts?.length > 0 && (
                  <span>
                    <strong>{posts?.length} </strong>
                    posts
                  </span>
                )}
                {data.followers &&
                  (user.role === "institute" ? (
                    <span
                      onClick={() =>
                        navigate(`/connections/${data.userName}?type=followers`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <strong>{data.followers.length} </strong>
                      followers
                    </span>
                  ) : (
                    <span style={{ cursor: "pointer" }}>
                      <strong>{data.followers.length} </strong>
                      followers
                    </span>
                  ))}
                {data.followingInstitutes &&
                  (user.role === "user" ? (
                    <span
                      onClick={() =>
                        navigate(`/connections/${data.userName}?type=following`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <strong>{data.followingInstitutes.length} </strong>
                      following
                    </span>
                  ) : (
                    <span style={{ cursor: "pointer" }}>
                      <strong>{data.followingInstitutes.length} </strong>
                      following
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <div className="profile-details">
            <p>{data.userName} {data.role === "institute" && <span className="verified">Verified</span>} </p>
            {data.role === "institute" &&
              (<>
                <p>{data.instituteType}</p>
              </>
              )
            }
            <p>{data.location}</p>
            <p>{data.pincode}</p>
            <p>{data.email}</p>
          </div>

          <div className="profile-highlights">
            {!id ? (
              // Viewing own profile
              <>
                <Link to="/profile-edit" className="highlight follow">
                  Edit Profile
                </Link>
                <Link to="/blocked-post" className="highlight">Blocked Posts</Link>
              </>
            ) : (
              // Viewing someone else's profile
              <>
                {user.role === "institute" ? (
                  data.role === "user" ? (
                    <Link className="highlight follow">Invite</Link>
                  ) : (
                    <Link className="highlight follow">Share Profile</Link>
                  )
                ) : user.role === "user" ? (
                  data.role === "institute" ? (
                    <>
                      {user?.followingInstitutes?.includes(data._id) ? (
                        <Link className="highlight" onClick={handleUnfollow}>Following</Link>
                      ) : (
                        <Link className="highlight follow" onClick={handleFollow}>Follow</Link>
                      )}
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
            {posts?.map((i) => (
              <div
                className="gallery-item"
                key={i.id}
                onClick={() => navigate(`/feeds?postId=${i._id}`)}
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
