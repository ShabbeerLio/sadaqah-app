import React, { useContext, useEffect } from "react";
import "./Collection.css";
import { GoArrowUpRight, GoShareAndroid, GoArrowRight } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import HistoryCard from "../HistoryCard/HistoryCard";
import { Link, useNavigate } from "react-router-dom";
import makka from "../../Assets/suggest2 (1).png";
import donate from "../../Assets/donate.png";
import calender from "../../Assets/calender.png";
import suggest from "../../Assets/suggest3.png";
import { LuWalletMinimal } from "react-icons/lu";
import calculator from "../../Assets/calculator.png";
import NoteContext from "../../Context/SadaqahContext";
import nofund from "../../Assets/history2.png";

const Collection = () => {
  const { userDetail, getAccountDetails } = useContext(NoteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAccountDetails();
    }
  }, [navigate]);
  const transactions =
    userDetail?.role === "user"
      ? userDetail?.transactions || []
      : userDetail?.wallet?.transactions || [];

  const progressPercent = 60;
  const totalAmount =
    userDetail?.role === "user"
      ? transactions.reduce((sum, tx) => sum + (tx.amount || 0), 0)
      : userDetail?.wallet?.totalReceived || 0;

  const handleWallet = () => {
    navigate("/wallet");
  };

  // console.log(userDetail, "userDetail");

  // useEffect(() => {
  //   if (userDetail.role === "institute") {

  //   }else if(userDetail.role === "user"){

  //   }
  // });

  return (
    <div className="Collection">
      <div className="Collection-main">
        <div className="Collection-box">
          <div className="Collection-box-left">
            <div className="collection-left-top">
              <div className="collection-left-top-left">
                <span>Total {userDetail?.transactions?.length} Payment</span>
                <h2>₹{totalAmount.toFixed(2)}</h2>
              </div>
              {userDetail?.role === "institute" ? (
                <div
                  className="collection-left-top-right"
                  onClick={handleWallet}
                >
                  <span>
                    <LuWalletMinimal />
                    Total
                  </span>
                  <h2>{userDetail?.wallet?.balance.toFixed(2)}</h2>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="collection-left-bottom">
              <p>
                <FaArrowTrendUp />
                Discover new Insights!
              </p>
              <h6>
                {" "}
                <Link to={"/history"}>View Analytics</Link>
              </h6>
            </div>
          </div>
          {userDetail?.role === "institute" ? (
            <div className="Collection-box-right institute">
              <h5>Recent Transactions</h5>
              {userDetail?.wallet?.transactions.length !== 0 ? (
                <>
                  {userDetail?.wallet?.transactions
                    ?.slice() // make a shallow copy to avoid mutating original array
                    .reverse() // reverse to get latest first
                    .slice(0, 5) // take the latest 5
                    .map((tx) => (
                      <HistoryCard
                        tx={tx}
                        key={tx._id || Math.random()}
                        userDetail={userDetail}
                      />
                    ))}
                  <Link to={"/history"} className="View-more-transatction">
                    View More <GoArrowRight />
                  </Link>
                </>
              ) : (
                <div className="collection-institute-fund">
                  <img src={nofund} alt="No Transactions" />
                  <h5>No Transactions Found</h5>
                  <p>No transactions in this date range.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="Collection-box-right">
              {/* <h5>Zakat</h5> */}
              <div className="Collection-box-right-box">
                <div className="collection-right-card item1">
                  <h6>Zakat</h6>
                  <p>Donate your zakat here</p>
                  <div className="donate-progress-box">
                    <div
                      className="fill"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <p>Total ₹12344</p>
                  <p>Donated ₹2344</p>
                  <Link to={"/zakat-payment"} className="donate-btn">
                    Donate Now
                  </Link>
                  <img src={makka} alt="" />
                </div>
                <div className="collection-right-card item2">
                  <h6>Zakat (This Month)</h6>
                  <div className="donate-progress-box">
                    <div
                      className="fill"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <p>Total ₹12344</p>
                  <p>Donated ₹1344</p>
                  <Link to={"/zakat-history"} className="donate-btn">
                    View
                  </Link>
                  <img src={calender} alt="" />
                </div>
                <div className="collection-right-card item3">
                  <h6>Zakat Calculator</h6>
                  <p>Calculate your Zakat</p>
                  <Link to={"/calculator"} className="donate-btn">
                    Calculate
                  </Link>
                  <img src={calculator} alt="" />
                </div>
              </div>
              <div className="collection-right-card item4">
                <h6>Suggest Masakeen (345)</h6>
                <p>
                  A needy person who is eligible to receive Zakat is referred to
                  as "Miskeen" (مسکین).
                </p>
                <Link to={"/suggest"} className="donate-btn">
                  Suggest Us!
                </Link>
                <img src={suggest} alt="" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
