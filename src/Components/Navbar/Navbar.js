import "./Navbar.css"
import { Link } from "react-router-dom";
import { IoMdNotifications, IoMdHelpCircleOutline } from "react-icons/io";



const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-main">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid nav-name">
                        <Link className="navbar-brand" to="/">
                            {/* <img src={logo} alt="" /> */}
                            <span>My Sadaqah</span>
                            <h5>Shabbeer</h5>
                        </Link>
                        {/* <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button> */}
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    Home
                                </Link>
                                <Link className="nav-link" to="/feeds">
                                    Feeds
                                </Link>
                                <Link className="nav-link" to="/profile">
                                    Profile
                                </Link>
                                <Link className="nav-link" to="/history">
                                    History
                                </Link>
                            </div>
                        </div>
                        <div className="profile">
                            <div className="notification">
                                <Link to={"/notification"}>
                                    <IoMdNotifications />
                                </Link>
                            </div>
                            <div className="help">
                                <Link to={"/help"}>
                                    <IoMdHelpCircleOutline />
                                    <p>help</p>
                                </Link>
                            </div>
                            {/* <div className="dropdown">
                                <Link className="btn help" to="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    <IoMdHelpCircleOutline />
                                    help
                                </Link>

                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/">Logout</Link></li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </nav>
            </div>
        </div>

    );
};

export default Navbar;
