import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import dosadaqa from "../../Assets/payment.png";
import CombinedFeedData from "../../Pages/AppData";
import Sidebar from "./Sidebar";
import { Bell, CircleQuestionMark, WalletMinimal } from "lucide-react";
import NoteContext from "../../Context/SadaqahContext";

const Navbar = () => {
  const { userDetail, getAccountDetails } = useContext(NoteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAccountDetails();
    }
  }, [navigate]);

  const sideRef = useRef(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  const [sideactive, setSideactive] = useState("");

  const handleSidebar = () => {
    setSideactive("active");
  };
  const handleCloseSidebar = () => {
    setSideactive("");
  };

  // Handle scroll to toggle "isScrolled"
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!userDetail) return null;

  return (
    <div className="navbar">
      <div className="navbar-main">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid nav-name">
            <Link className="navbar-brand" onClick={handleSidebar}>
              <img
                src={
                  userDetail.avatar
                    ? userDetail.avatar
                    : "https://static.vecteezy.com/system/resources/previews/068/013/243/large_2x/muslim-male-character-free-vector.jpg"
                }
                alt={userDetail?.userName}
              />
              <div className="navbar-title">
                <h5>Assalamu Alaikum</h5>
                <span>{userDetail?.userName}</span>
              </div>
            </Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/feeds">
                  Feeds
                </Link>
                <Link className="nav-link" to="/add">
                  Add
                </Link>
                <Link className="nav-link" to="/search">
                  Search
                </Link>
                <Link className="nav-link" to="/history">
                  History
                </Link>
              </div>
            </div>
            <div className="profile">
              <div className="notification">
                <Link to={"/notification"}>
                  <Bell />
                </Link>
              </div>
              <div className="help">
                {userDetail?.role === "user" ? (
                  <Link to={"/help"}>
                    <CircleQuestionMark />
                    <p>Help</p>
                  </Link>
                ) : (
                  <Link to={"/wallet"}>
                    <WalletMinimal />
                    <p>Wallet</p>
                  </Link>
                )}
              </div>
              {/* Show Pay Now only on / */}
              {currentPath === "/" && userDetail?.role === "user" && (
                <div className={`nav-pay-now ${isScrolled ? "scrolled" : ""}`}>
                  <Link to="/payment">
                    <img className="pay-imag" src={dosadaqa} alt="" />
                    {/* <LuScanQrCode /> */}
                    <span className="pay-text">Do Sadaqah</span>
                  </Link>
                </div>
              )}
            </div>
            <Sidebar
              sideactive={sideactive}
              sideRef={sideRef}
              handleCloseSidebar={handleCloseSidebar}
              userDetail={userDetail}
            />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
