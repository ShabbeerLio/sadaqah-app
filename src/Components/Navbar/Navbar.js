import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import dosadaqa from "../../Assets/payment.png"
import CombinedFeedData from "../../Pages/AppData";
import Sidebar from "./Sidebar";
import { Bell, CircleQuestionMark, WalletMinimal } from "lucide-react";


const Navbar = () => {
  const sideRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("authUser"));
  const location = useLocation();
  const currentPath = location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);

  const [sideactive, setSideactive] = useState("")

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

  if (!user) return null;

  const data = CombinedFeedData.find((item) => item.username === user.username);

  return (
    <div className="navbar">
      <div className="navbar-main">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid nav-name">
            <Link className="navbar-brand" onClick={handleSidebar}>
              <img src={data.avatar} alt="" />
              <div className="navbar-title">
                <h5>Assalamu Alaikum</h5>
                <span>{user?.username}</span>
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
                {user.type === "user" ? (
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
              {currentPath === "/" && user.type === "user" && (
                <div className={`nav-pay-now ${isScrolled ? "scrolled" : ""}`}>
                  <Link to="/payment">
                    <img className="pay-imag" src={dosadaqa} alt="" />
                    {/* <LuScanQrCode /> */}
                    <span className="pay-text">Do Sadaqah</span>
                  </Link>
                </div>
              )}

            </div>
            <Sidebar sideactive={sideactive} sideRef={sideRef} handleCloseSidebar={handleCloseSidebar} />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
