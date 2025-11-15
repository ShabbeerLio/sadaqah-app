import react from "react";
import SadaqahContext from "./SadaqahContext";
import { useState } from "react";
import Host from "../Host";

const ContextState = (props) => {
  const postData = [];
  const userData = [];
  const instituteData = [];
  const instituteFollowData = [];
  const donationRData = [];

  const [userDetail, setUserDetail] = useState(userData);
  const [postDetail, setPostDetail] = useState(postData);
  const [instituteDetail, setInstituteDetail] = useState(instituteData);
  const [donationDetail, setDonationDetail] = useState(donationRData);
  const [institutefollowDetail, setInstitutefollowDetail] =
    useState(instituteFollowData);

  // Get getAccount detail
  const getAccountDetails = async () => {
    const response = await fetch(`${Host}/auth/getaccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json, "json");
    setUserDetail(json);
  };

  // Get All Posta 
  const getAllPosts = async () => {
    const response = await fetch(`${Host}/posts/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // console.log(json, "json");
    setPostDetail(json);
  };

  // Get Institute by following 
  const getAllInstitutebyFollowing = async () => {
    const response = await fetch(`${Host}/auth/following-institutes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json, "json");
    setInstitutefollowDetail(json);
  };

  // Get All Institutes
  const getAllInstitute = async () => {
    const response = await fetch(`${Host}/auth/all-institutes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // console.log(json, "json");
    setInstituteDetail(json);
  };

  // Get all Donation Requests
  const getAllDonationsRequests = async () => {
    const response = await fetch(`${Host}/donation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // console.log(json, "json");
    setDonationDetail(json);
  };

  return (
    <SadaqahContext.Provider
      value={{
        userDetail,
        getAccountDetails,

        postDetail,
        getAllPosts,

        instituteDetail,
        getAllInstitute,

        institutefollowDetail,
        getAllInstitutebyFollowing,

        donationDetail,
        getAllDonationsRequests,
      }}
    >
      {props.children}
    </SadaqahContext.Provider>
  );
};

export default ContextState;
