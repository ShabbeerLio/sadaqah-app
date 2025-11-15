import React, { useContext, useEffect, useState, useRef } from "react";
import FeedCard from "../../Components/Cards/FeedCard";
import "./Feeds.css";
import CombinedFeedData from "../AppData";
import Searchbox from "../../Components/Searchbox/Searchbox";
import { useNavigate, useLocation } from "react-router-dom";
import Filters from "../../Components/Filters/Filters";
import NoteContext from "../../Context/SadaqahContext";
import { Plus } from "lucide-react";
import Host from "../../Host";

const Feeds = () => {
  const {
    userDetail,
    getAccountDetails,
    postDetail,
    getAllPosts,
    instituteDetail,
    getAllInstitute,
  } = useContext(NoteContext);

  const navigate = useNavigate();
  const location = useLocation();
  const postRefs = useRef({});

  const queryParams = new URLSearchParams(location.search);
  const postIdFromQuery = queryParams.get("postId");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRange, setFilterRange] = useState({ from: "", to: "", type: "" });
  const [institutePosts, setInstitutePosts] = useState([]);

  const user = userDetail;
  // ✅ Initial Data Fetch
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAccountDetails();
      getAllPosts();
      getAllInstitute();
    }
  }, [navigate]);

  // ✅ Fetch posts only for institute when logged in as institute
  useEffect(() => {
    if (userDetail?.role === "institute" && userDetail?._id) {
      fetchPostByInstituteId(userDetail._id);
    }
  }, [userDetail]);

  // ✅ Scroll to specific post if postId query is present
  useEffect(() => {
    if (postIdFromQuery && postRefs.current[postIdFromQuery]) {
      postRefs.current[postIdFromQuery].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [postIdFromQuery]);

  // ✅ Fetch institute-specific posts
  const fetchPostByInstituteId = async (id) => {
    if (!id) return;
    try {
      const response = await fetch(`${Host}/posts/institute/${id}`, {
        method: "GET",
      });
      const json = await response.json();
      setInstitutePosts(json.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // console.log(institutePosts,"institutePosts")
  // ✅ Helper: Format post time
  const getTimeAgo = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffTime = now - postDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    if (diffDays < 21) return "2 weeks ago";
    if (diffDays < 30) return "3 weeks ago";

    return postDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ✅ Normalize institute list
  const institutesArray = Array.isArray(instituteDetail)
    ? instituteDetail
    : instituteDetail?.institutes || [];

  // ✅ Flatten + enrich post data
  const allPosts = postDetail.map((post) => {
    const institute = institutesArray.find(
      (inst) => inst?._id === (post?.institute?._id || post?.institute)
    );

    return {
      ...post,
      userName: institute ? institute.userName : post?.userName,
      avatar: institute ? institute.avatar : post?.avatar,
      followers: institute ? institute.followers : post?.followers,
      daysAgo: getTimeAgo(post?.createdAt),
    };
  });

  // ✅ Normalize followed institute IDs
  const followedInstituteIds = (userDetail?.followingInstitutes || []).map(
    (inst) => (typeof inst === "string" ? inst : inst._id)
  );

  // ✅ Only show posts from followed institutes
  const visiblePosts = allPosts.filter((post) =>
    followedInstituteIds.includes(post?.institute?._id)
  );

  // ✅ Sort by newest first
  const sortedPosts = visiblePosts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // ✅ Filtering Logic
  let filteredPosts = [];

  if (user?.role === "institute") {
    // Map institute posts to include daysAgo + username from userDetail
    const enrichedInstitutePosts = institutePosts.map((post) => ({
      ...post,
      userName: userDetail?.userName || "Your Institute",
      daysAgo: getTimeAgo(post?.createdAt),
    }));

    filteredPosts = enrichedInstitutePosts.filter((post) => {
      const postDate = new Date(post.createdAt);
      const fromDate = filterRange.from ? new Date(filterRange.from) : null;
      const toDate = filterRange.to ? new Date(filterRange.to) : null;

      const matchesDate =
        (!fromDate || postDate >= fromDate) && (!toDate || postDate <= toDate);

      const matchesType =
        !filterRange.type ||
        post.type?.toLowerCase() === filterRange.type.toLowerCase();

      return matchesDate && matchesType;
    });
  } else {
    filteredPosts = sortedPosts.filter((post) => {
      const terms = searchTerm.toLowerCase().split(" ");
      const combined = `${post?.userName} ${post?.location}`.toLowerCase();
      return terms.every((term) => combined.includes(term));
    });
  }

  // console.log(filteredPosts, "filteredPosts");

  return (
    <div className="Home">
      <div className="Home-main">
        {/* ✅ If no posts */}
        {!filteredPosts || filteredPosts.length === 0 ? (
          <>
            {user?.role === "institute" ? (
              <div className="institute-feeds-box">
                <h5>Your Posts</h5>
                <p>Add your posts so users can get all your updates.</p>
                <button
                  onClick={() => navigate("/add-feed")}
                  className="institute-feed-btn"
                >
                  <Plus /> Add Post
                </button>
              </div>
            ) : (
              <div className="institute-feeds-box">
                <p>Follow your institute from Search to get its updates!</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* ✅ Header Section */}
            {user?.role === "institute" ? (
              <div className="institute-feeds-box">
                <h5>Your Feeds</h5>
                {/* <div className="institute-feeds-filter">
                  <Filters onFilterChange={setFilterRange} />
                </div> */}
              </div>
            ) : (
              <Searchbox value={searchTerm} setSearch={setSearchTerm} />
            )}

            {/* ✅ Feed Grid */}
            <div className="Feeds-box">
              {filteredPosts.map((post) => (
                <FeedCard
                  key={post._id}
                  ref={(el) => {
                    if (el) postRefs.current[post._id] = el;
                  }}
                  post={post}
                  user={user}
                  instituteDetail={instituteDetail}
                  getAllPosts={getAllPosts}
                  getAccountDetails={getAccountDetails}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Feeds;