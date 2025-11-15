import React, { useContext, useEffect, useRef, useState } from "react";
import "./DonateReq.css";
import avtar from "../../Assets/Posts/hadith.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosClose, IoIosAdd } from "react-icons/io";
import DonateCard from "../../Components/DonateCard/DonateCard";
import HistoryCard from "../../Components/HistoryCard/HistoryCard";
import nofund from "../../Assets/history2.png";
import DonateForm from "../../Components/DonateCard/DonateForm";
import NoteContext from "../../Context/SadaqahContext";
import avatar2 from "../../Assets/avtar2.jpg";

const DonateReq = () => {
  const {
    donationDetail,
    getAllDonationsRequests,
    userDetail,
    getAccountDetails,
  } = useContext(NoteContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAllDonationsRequests();
      getAccountDetails();
    }
  }, [navigate]);

  const donateRef = useRef(null);

  const [donateActive, setDonateActive] = useState("");
  const [donateBoxMode, setDonateBoxMode] = useState(""); // "form" or "list"

  const user = userDetail;
  const [donationType, setDonationType] = useState("following");

  const userData = userDetail?.wallet?.transactions;
  const [filterRange, setFilterRange] = useState({
    from: "",
    to: "",
    type: "",
  });

  const [selectedDonationId, setSelectedDonationId] = useState(null);

  const handleDonet = (mode, donationId = null) => {
    setDonateBoxMode(mode); // "form" or "list"
    setDonateActive("active");
    setSelectedDonationId(donationId); // store the specific donation id
  };

  // console.log(selectedDonationId, "selectedDonationId")
  const handleCloseDonet = () => {
    setDonateActive("");
  };

  if (!user) return null; // Don't render until user is loaded

  let filteredDonation = donationDetail?.donations ?? [];

  if (user?.role === "user") {
    filteredDonation = filteredDonation.filter((i) => {
      const isFollowing = user?.followingInstitutes?.includes(i?.institute?._id);
      if (donationType === "following") {
        return isFollowing;
      } else {
        return !isFollowing;
      }
    });
  } else if (user?.role === "institute") {
    filteredDonation = (donationDetail?.donations ?? []).filter(
      (i) =>
        i?.institute?._id === user?._id ||
        i?.institute?.userName === user?.userName
    );
  } else {
    // Institute view → only donations created by this institute
    filteredDonation = (donationDetail?.donations ?? []).filter(
      (i) => i?.institute?._id === user?._id
    );
  }

  let activeDonations = [];
  let completedDonations = [];

  if (user?.role === "user") {
    // Only show donations that are not fully funded
    activeDonations = filteredDonation.filter(
      (i) => i.amountReceived < i.totalPrice
    );
  } else if (user?.role === "institute") {
    // Institute sees all donations, but completed ones at the bottom
    activeDonations = filteredDonation.filter(
      (i) => i.amountReceived < i.totalPrice
    );
    completedDonations = filteredDonation.filter(
      (i) => i.amountReceived >= i.totalPrice
    );
  }

  const sortedTransactions = userData
    ? [...userData].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  const filteredTransactions = sortedTransactions.filter((tx) => {
    // Only Donation transactions
    const isDonation = tx.type && tx.type.toLowerCase() === "donation";

    // Match by selected donation ID if provided
    const matchesDonation =
      !selectedDonationId ||
      (tx.donationRequestId && tx.donationRequestId === selectedDonationId);

    const inDateRange =
      (!filterRange.from || new Date(tx.date) >= new Date(filterRange.from)) &&
      (!filterRange.to || new Date(tx.date) <= new Date(filterRange.to));

    const typeMatch =
      !filterRange.type ||
      (tx.type && tx.type.toLowerCase() === filterRange.type.toLowerCase());

    return isDonation && matchesDonation && inDateRange && typeMatch;
  });

  const totalAmount = filteredTransactions.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  // console.log(activeDonations,"activeDonations")

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="donation-request">
          <div className="donate-boxes">
            <div className="donate-top">
              <div className="donate-top-head">
                {user.role === "user" ? (
                  <>
                    <h4>Donation Requests</h4>
                    <div className="radio-options">
                      <label
                        className={`radio-label ${donationType === "following"
                          ? "purple"
                          : ""
                          }`}
                      >
                        <input
                          type="radio"
                          value="following"
                          checked={donationType === "following"}
                          onChange={() => setDonationType("following")}
                        />
                        Your Location
                      </label>
                      <label
                        className={`radio-label ${donationType === "others" ? "blue" : ""
                          }`}
                      >
                        <input
                          type="radio"
                          value="others"
                          checked={donationType === "others"}
                          onChange={() => setDonationType("others")}
                        />
                        System Requested
                      </label>
                    </div>
                  </>
                ) : (
                  <div className="institute-donatereq">
                    <h4>Your Donation Requests</h4>
                    <p onClick={() => handleDonet("form")} className="add-req">
                      <IoIosAdd /> Add
                    </p>
                  </div>
                )}
              </div>
              {/* <IoIosClose onClick={handleCloseDonet} /> */}
            </div>
            <div className="donate-card-box">
              {activeDonations.length > 0 ? (
                activeDonations.map((i, index) => (
                  <DonateCard
                    key={index}
                    user={user}
                    i={i}
                    donationType={donationType}
                    handleCloseDonet={handleCloseDonet}
                    handleDonet={handleDonet}
                  />
                ))
              ) : (
                <p>No Active Donations</p>
              )}

              {user?.role === "institute" && completedDonations.length > 0 && (
                <div className="completed-donations">
                  <h5>Completed Donations</h5>
                  {completedDonations.map((i, index) => (
                    <DonateCard
                      key={index}
                      user={user}
                      i={i}
                      donationType={donationType}
                      handleCloseDonet={handleCloseDonet}
                      handleDonet={handleDonet}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={`donate-box ${donateActive}`} ref={donateRef}>
          <div className="donate-boxes">
            <div className="donate-top">
              <div className="donate-top-head">
                <div className="institute-donatereq">
                  {donateBoxMode === "form" ? (
                    <h4>Add your donation request</h4>
                  ) : (
                    <h4>
                      {selectedDonationId
                        ? `Transactions for Donation #${selectedDonationId.slice(-6)}`
                        : "All Donation Transactions"}
                    </h4>
                  )}
                  <IoIosClose onClick={handleCloseDonet} />
                </div>
              </div>
            </div>
            <div className="donate-card-box">
              {donateBoxMode === "form" ? (
                <DonateForm getAllDonationsRequests={getAllDonationsRequests} handleCloseDonet={handleCloseDonet} />
              ) : (
                <div
                  className={`donate-card-right ${totalAmount === 0 ? "empty" : ""
                    }`}
                >
                  {totalAmount === 0 ? (
                    <>
                      <img src={nofund} alt="No Transactions" />
                      <h5>No Transactions Found</h5>
                      <p>No transactions in this date range.</p>
                    </>
                  ) : (
                    filteredTransactions.map((tx) => (
                      <HistoryCard key={tx.id} tx={tx} userDetail={userDetail} />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateReq;
