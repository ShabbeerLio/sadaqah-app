import React, { useContext, useEffect, useState } from "react";
import "./DonateReq.css";
import avtar from "../../Assets/Posts/hadith.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosClose } from "react-icons/io";
import Ads from "../../Components/Ads/Ads";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Host from "../../Host";
import NoteContext from "../../Context/SadaqahContext";
import avatar2 from "../../Assets/avtar2.jpg";

const DonationReqDetail = () => {
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

  const location = useLocation();
  const stateItem = location.state?.item;
  const item = donationDetail?.donations?.find(
    (i) => String(i._id) === String(stateItem)
  );

  const [responsiblity, setResponsiblity] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [fulfillBox, setFulfillBox] = useState("");
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [showcancelBox, setShowcancelBox] = useState(false);
  const [showStatusBox, setShowStatusBox] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [cancelation, setCancel] = useState(null);
  const [showInstituteBox, setShowInstituteBox] = useState(false);
  const [instituteActionType, setInstituteActionType] = useState(""); // "pending" | "awaited"

  const handleGoBack = () => window.history.back();

  const progressPercent = Math.min(
    Math.round((item?.amountReceived / item?.totalPrice) * 100),
    100
  );

  const requirementList = item?.items;

  const handleConfirmYes = () => {
    if (confirmAction) {
      confirmAction();
      setConfirmAction(null); // Reset
    }
    if (cancelation) {
      cancelation();
      setCancel(null); // Reset
    }

    setShowConfirmBox(false);
    setShowcancelBox(false);
  };

  const handleConfirmNo = () => {
    setShowConfirmBox(false);
    setShowcancelBox(false);
  };

  // ✅ Take Responsibility -> Confirm -> Yes/No
  const handleTakeRes = (index) => {
    setSelectedIndex(index);
    setResponsiblity("active"); // open pledge modal
  };

  // ✅ Responsibility Taken -> Cancel or Product Sent
  const handleFullfilled = (index) => {
    setSelectedIndex(index);
    setFulfillBox("active"); // open responsibility modal
  };
  // ✅ Confirm Pledge (pending → taken)
  const handleConfirmPledge = () => {
    setConfirmAction(() => async () => {
      if (selectedIndex !== null) {
        const requestId = item._id;
        const itemId = requirementList[selectedIndex]._id;

        try {
          const updated = await updateItemStatus(requestId, itemId, {
            status: "taken",
            updatedBy: "user",
            takenByName: "John Doe", // replace with logged-in user
            takenByLocation: "Mumbai, IN", // replace with user location
          });

          const updatedList = [...requirementList];
          updatedList[selectedIndex] = updated.item;
        } catch (err) {
          alert("Failed to update status");
        }
      }
      setSelectedIndex(null);
      setResponsiblity("");
    });
    setShowConfirmBox(true);
  };

  // ✅ Cancel Responsibility (taken → pending)
  const handleCancelResponsibility = () => {
    setCancel(() => async () => {
      if (selectedIndex !== null) {
        const requestId = item._id;
        const itemId = requirementList[selectedIndex]._id;

        try {
          const updated = await updateItemStatus(requestId, itemId, {
            status: "pending",
            updatedBy: "user",
          });

          const updatedList = [...requirementList];
          updatedList[selectedIndex] = updated.item;
        } catch (err) {
          alert("Failed to cancel responsibility");
        }
      }
      setSelectedIndex(null);
      setFulfillBox("");
    });
    setShowcancelBox(true);
  };

  // ✅ Product Sent (taken → awaited)
  const handleProductSent = async () => {
    if (selectedIndex !== null) {
      const requestId = item._id;
      const itemId = requirementList[selectedIndex]._id;

      try {
        const updated = await updateItemStatus(requestId, itemId, {
          status: "awaited",
          updatedBy: "user",
        });

        const updatedList = [...requirementList];
        updatedList[selectedIndex] = updated.item;
      } catch (err) {
        alert("Failed to update to awaited");
      }
      setSelectedIndex(null);
      setFulfillBox("");
    }
  };

  // utils/api.js
  const updateItemStatus = async (requestId, itemId, body) => {
    try {
      const res = await fetch(
        `${Host}/donation/item-status/${requestId}/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update status");
      getAllDonationsRequests();
      console.log(data, "data");
      return data;
    } catch (error) {
      console.error("Update item status error:", error);
      throw error;
    }
  };

  const handleInstituteStatus = (index, type) => {
    setSelectedIndex(index);
    setInstituteActionType(type);
    setShowInstituteBox(true);
  };

  const handleInstituteConfirm = async (action) => {
    if (selectedIndex === null) return;

    const requestId = item._id;
    const itemId = requirementList[selectedIndex]._id;

    try {
      if (instituteActionType === "pending" && action === "fulfilled") {
        await updateItemStatus(requestId, itemId, {
          status: "fulfilled",
          updatedBy: "institute",
        });
      } else if (instituteActionType === "awaited" && action === "fulfilled") {
        await updateItemStatus(requestId, itemId, {
          status: "fulfilled",
          updatedBy: "institute",
        });
      } else if (instituteActionType === "awaited" && action === "pending") {
        await updateItemStatus(requestId, itemId, {
          status: "pending",
          updatedBy: "institute",
        });
      }

      // Refresh data
      await getAllDonationsRequests();
    } catch (err) {
      alert("Failed to update status");
    }

    setShowInstituteBox(false);
    setSelectedIndex(null);
  };

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="donatereq">
          <div className="donatereq-title">
            <h5>
              <button className="back-button" onClick={handleGoBack}>
                <IoIosArrowBack />
              </button>
              Donation Requested
            </h5>
            <p>
              These donations will be used to build what has been requested.
            </p>
          </div>

          <div className="SearchCard institute-info">
            <div className="SearchCard-left">
              <img src={item?.avatar ? item.avatar : avatar2} alt="" />
            </div>
            <div className="SearchCard-right">
              <h6>{item?.institute.userName}</h6>
              <p>{item?.institute.location}</p>
            </div>
          </div>

          <div className="donationreq-box2">
            <h5>{item?.title}</h5>
            <p>{item?.description}</p>
          </div>

          <h5 className="list-title">List Of Requirements</h5>
          <div className="donationreq-box3">
            <div className="donationreq-items">
              {requirementList?.map((item, index) => (
                <div className="donationreq-card" key={index}>
                  <div className="req-card-top">
                    <div className="reqtop-left">
                      <h6>
                        {item.title}{" "}
                        <span>
                          ({item.quantity} {item?.unit})
                        </span>
                      </h6>
                      <p>
                        ₹ {item.price}
                        {item?.unit ? `/ ${item.unit}` : ""} X {item.quantity} =
                        ₹{item.total.toLocaleString()}
                      </p>
                    </div>
                    <div className={`reqtop-right ${item.status}`}>
                      {userDetail.role === "user" && (
                        <>
                          {item.status === "pending" && (
                            <p onClick={() => handleTakeRes(index)}>
                              Take Responsibility
                            </p>
                          )}
                          {item.status === "collected" && <p>Collected</p>}
                          {item.status === "fulfilled" && <p>Fulfilled</p>}
                          {item.status === "awaited" && <p>Awaited</p>}
                          {item.status === "taken" && (
                            <>
                              {item.takenBy === userDetail._id ? (
                                <p onClick={() => handleFullfilled(index)}>
                                  Responsibility Taken
                                </p>
                              ) : (
                                <p>Responsibility Taken</p>
                              )}
                            </>
                          )}
                        </>
                      )}
                      {/* --- INSTITUTE MODE --- */}
                      {userDetail.role === "institute" && (
                        <>
                          {item.status === "pending" && (
                            <p
                              onClick={() =>
                                handleInstituteStatus(index, "pending")
                              }
                            >
                              Pending
                            </p>
                          )}
                          {item.status === "collected" && <p>Collected</p>}
                          {item.status === "fulfilled" && <p>Fulfilled</p>}
                          {item.status === "awaited" && (
                            <p
                              onClick={() =>
                                handleInstituteStatus(index, "awaited")
                              }
                            >
                              Awaited
                            </p>
                          )}
                          {item.status === "taken" && (
                            <p>Responsibility Taken</p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="req-card-bottom">
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="donationreq-box4">
            <div className="donate-progress-box">
              <div
                className="fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="donate-box4-box">
              <div className="btn4-reqbtn">
                {userDetail.role === "user" && (
                  <Link to={"/payment"} state={{ item: item }}>
                    Do Sadaqah
                  </Link>
                )}
              </div>
              <div className="donate-payable">
                <span>Amount Received / Required</span>
                <p>
                  ₹{item?.amountReceived} / ₹{item?.totalPrice}
                </p>
              </div>
            </div>
          </div>

          {/* Pledge Modal */}
          <div className={`responsiblity-box ${responsiblity}`}>
            <div className="responsiblity-box-item">
              <div className="responsiblity-top">
                <p>I pledge to fulfill this requirement</p>
                <IoIosClose onClick={() => setResponsiblity("")} />
              </div>
              {selectedIndex !== null && (
                <div className="donationreq-card">
                  <div className="req-card-top">
                    <div className="reqtop-left">
                      <h6>
                        {requirementList[selectedIndex].title}{" "}
                        <span>({requirementList[selectedIndex].quantity})</span>
                      </h6>
                      <p>
                        ₹ {requirementList[selectedIndex].price} X
                        {requirementList[selectedIndex].quantity} = ₹
                        {requirementList[selectedIndex].total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="req-card-bottom">
                    <p>{requirementList[selectedIndex].description}</p>
                  </div>
                </div>
              )}
              <div className="responsiblity-note">
                <p>
                  <span>Note: </span>This pledge will mark canceled if you won’t
                  able to send this product within 7 days from today.
                </p>
              </div>
              <div className="responsiblity-btns">
                <p onClick={() => setResponsiblity("")}>Cancel</p>
                <p className="confirm" onClick={handleConfirmPledge}>
                  Confirm
                </p>
              </div>
            </div>
            <div className="responsiblity-filter"></div>
          </div>

          {/* Fulfilled Modal */}
          <div className={`responsiblity-box ${fulfillBox}`}>
            <div className="responsiblity-box-item">
              <div className="responsiblity-top">
                <p>I pledge to fulfill this requirement</p>
                <IoIosClose onClick={() => setFulfillBox("")} />
              </div>
              {selectedIndex !== null && (
                <div className="donationreq-card">
                  <div className="req-card-top">
                    <div className="reqtop-left">
                      <h6>
                        {requirementList[selectedIndex].title}{" "}
                        <span>({requirementList[selectedIndex].quantity})</span>
                      </h6>
                      <p>
                        ₹ {requirementList[selectedIndex].price} X{" "}
                        {item.quantity} = ₹
                        {requirementList[selectedIndex].total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="req-card-bottom">
                    <p>{requirementList[selectedIndex].description}</p>
                  </div>
                </div>
              )}
              <div className="responsiblity-note">
                <p>
                  <span>Note: </span>This pledge will mark canceled if you won’t
                  able to send this product within 7 days from today.
                </p>
              </div>
              <div className="responsiblity-btns">
                <p onClick={handleCancelResponsibility}>Cancel</p>
                <p className="confirm" onClick={handleProductSent}>
                  Product Sent
                </p>
              </div>
            </div>
            <div className="responsiblity-filter"></div>
          </div>

          {/* Confirmation Modals */}
          {showConfirmBox && (
            <div className="confirmation-modal">
              <div className="confirmation-box">
                <p>Are you sure to take the Pledge?</p>
                <div className="confirmation-buttons">
                  <button onClick={handleConfirmNo}>No</button>
                  <button onClick={handleConfirmYes}>Yes</button>
                </div>
              </div>
              <div
                className="confirmation-backdrop"
                onClick={handleConfirmNo}
              ></div>
            </div>
          )}

          {showcancelBox && (
            <div className="confirmation-modal">
              <div className="confirmation-box">
                <p>Are you sure want to withdraw the Pledge?</p>
                <div className="confirmation-buttons">
                  <button onClick={handleConfirmNo}>No</button>
                  <button onClick={handleConfirmYes}>Yes</button>
                </div>
              </div>
              <div
                className="confirmation-backdrop"
                onClick={handleConfirmNo}
              ></div>
            </div>
          )}

          {showStatusBox && (
            <div className="confirmation-modal">
              <div className="confirmation-box">
                <div className="wallet-status">
                  <DotLottieReact
                    className="wallet-success"
                    src="https://lottie.host/b08d0607-b021-4196-ba76-e6596d9332e5/o1EFjMW31w.lottie"
                    loop
                    autoplay
                    onError={(e) => console.error("Lottie load error:", e)}
                  />
                </div>
                <p>
                  Institute have received your notificaation. Once they receive
                  the items, they will update the status to ‘Fulfilled’.
                </p>
                <Ads />
              </div>
              <div className="confirmation-backdrop"></div>
            </div>
          )}

          {showInstituteBox && (
            <div className="confirmation-modal">
              <div className="confirmation-box">
                {instituteActionType === "pending" && (
                  <>
                    <p>Mark this item as collected?</p>
                    <div className="confirmation-buttons">
                      <button onClick={() => setShowInstituteBox(false)}>
                        Cancel
                      </button>
                      <button
                        onClick={() => handleInstituteConfirm("fulfilled")}
                      >
                        Collected
                      </button>
                    </div>
                  </>
                )}

                {instituteActionType === "awaited" && (
                  <>
                    <p>Has the institute received the product?</p>
                    <div className="confirmation-buttons">
                      <button onClick={() => handleInstituteConfirm("pending")}>
                        Haven’t Received
                      </button>
                      <button
                        onClick={() => handleInstituteConfirm("fulfilled")}
                      >
                        Confirm Received
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div
                className="confirmation-backdrop"
                onClick={() => setShowInstituteBox(false)}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationReqDetail;
