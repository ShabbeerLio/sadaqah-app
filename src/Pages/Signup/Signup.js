import React, { useEffect, useRef, useState } from "react";
import logo from "../../Assets/Logo/logo-sadaqah-app-white.png";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [overed, setOvered] = useState(null);
    const overedRef = useRef(null);
    const timeoutRef = useRef(null);
    const loginClickedRef = useRef(false);

    const [userData, setUserData] = useState({
        name: "",
        number: "",
        email: "",
        password: "",
        currentPincode: "",
        villagePincode: "",
    });

    const [instituteData, setInstituteData] = useState({
        instituteName: "",
        instituteType: "",
        email: "",
        password: "",
        pincode: "",
        authorizedPersonName: "",
        authorizedDesignation: "",
        authorizedNumber: "",
    });

    useEffect(() => {
        // only run if login is NOT clicked
        if (loginClickedRef.current) return;

        const initial = location.state?.orgActive ?? false;
        console.log(initial, "initial")

        timeoutRef.current = setTimeout(() => {
            if (loginClickedRef.current) return;

            setOvered(initial);
            overedRef.current = initial;
            console.log("useEffect set:", initial);
        }, 100);

        return () => clearTimeout(timeoutRef.current);
    }, [location.key]);

    const handleClickLogin = () => {
        loginClickedRef.current = true;

        clearTimeout(timeoutRef.current);

        setOvered(null);
        overedRef.current = null;
        console.log("✅ Immediately set to null:", overedRef.current); // null

        setTimeout(() => {
            console.log("✅ 1 second later, still:", overedRef.current); // still null
            navigate("/login");
        }, 1000);
    };
    const handleClickUser = () => {
        setOvered(true);
    };

    const handleClickOrg = () => {
        setOvered(false);
    };

    const handleUserSubmit = (e) => {
        e.preventDefault();
        console.log("User Data:", userData);
    };

    const handleInstituteSubmit = (e) => {
        e.preventDefault();
        console.log("Institute Data:", instituteData);
    };

    // console.log(overed,"overed")
    return (
        <div className="Login">
            <div className="Login-main">
                <div className={`signup-box ${overed === true ? 'active' :
                    overed === false ? '' :
                        'nonactive'}`}>
                    <div className="form-box register-user">
                        <form onSubmit={handleUserSubmit}>
                            <h2>Signup as User</h2>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter Name"
                                    value={userData.name}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    id="number" className="form-input" placeholder="Enter Number"
                                    value={userData.number}
                                    onChange={(e) => setUserData({ ...userData, number: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    id="email" className="form-input" placeholder="Enter Email"
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    id="password" className="form-input" placeholder="Enter Password"
                                    value={userData.password}
                                    onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    id="currentPincode" className="form-input" placeholder="Enter Current Pincode"
                                    value={userData.currentPincode}
                                    onChange={(e) => setUserData({ ...userData, currentPincode: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    id="villagePincode" className="form-input" placeholder="Enter Village Pincode"
                                    value={userData.villagePincode}
                                    onChange={(e) => setUserData({ ...userData, villagePincode: e.target.value })} />
                            </div>
                            <button type="submit" className="submit-button">
                                Signup
                            </button>
                            <div className="login-dash">
                                <span></span>
                                <p>OR</p>
                                <span></span>
                            </div>
                            <div className="form-googleverify">
                                <FaGoogle />
                                <p>Signup with Google</p>
                            </div>
                        </form>
                    </div>
                    <div className="form-box register-organisation">
                        <form onSubmit={handleInstituteSubmit}>
                            <h2>Signup as Institute</h2>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Institution Name"
                                    value={instituteData.instituteName}
                                    onChange={(e) =>
                                        setInstituteData({ ...instituteData, instituteName: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <select
                                    id="type"
                                    className="form-input"
                                    value={instituteData.instituteType}
                                    onChange={(e) =>
                                        setInstituteData({ ...instituteData, instituteType: e.target.value })
                                    }
                                >
                                    <option value="">Select Institution Type</option>
                                    <option value="Masjid">Masjid</option>
                                    <option value="Madrasa">Madrasa</option>
                                    <option value="Charity Organization">Charity Organization</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    id="email"
                                    className="form-input"
                                    placeholder="Enter Email"
                                    value={instituteData.email}
                                    onChange={(e) =>
                                        setInstituteData({ ...instituteData, email: e.target.value })
                                    } />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    id="password"
                                    className="form-input"
                                    placeholder="Enter Password"
                                    value={instituteData.password}
                                    onChange={(e) =>
                                        setInstituteData({ ...instituteData, password: e.target.value })
                                    } />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    id="pincode"
                                    className="form-input"
                                    placeholder="Enter pincode"
                                    value={instituteData.pincode}
                                    onChange={(e) =>
                                        setInstituteData({ ...instituteData, pincode: e.target.value })
                                    } />
                            </div>
                            <div className="login-dash">
                                <p>Authorized Person (Imam or committee Head)</p>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="authorized"
                                    className="form-input"
                                    placeholder="Person Name"
                                    value={instituteData.authorizedPersonName}
                                    onChange={(e) =>
                                        setInstituteData({ ...instituteData, authorizedPersonName: e.target.value })
                                    } />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="designation"
                                    className="form-input"
                                    placeholder="Designation"
                                    value={instituteData.authorizedDesignation}
                                    onChange={(e) =>
                                        setInstituteData({ ...instituteData, authorizedDesignation: e.target.value })
                                    } />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    id="number"
                                    className="form-input"
                                    placeholder="Number"
                                    value={instituteData.authorizedNumber}
                                    onChange={(e) =>
                                        setInstituteData({ ...instituteData, authorizedNumber: e.target.value })
                                    } />
                            </div>
                            <button type="submit" className="submit-button">
                                Signup
                            </button>
                            <div className="login-dash">
                                <span></span>
                                <p>OR</p>
                                <span></span>
                            </div>
                            <div className="form-googleverify">
                                <FaGoogle />
                                <p>Signup with Google</p>
                            </div>
                        </form>
                    </div>
                    <div className="toggle-box">
                        <div className="toggle-panel toggle-left">
                            {/* <img src={logo} alt="" /> */}
                            <h3>Welcome!</h3>
                            <span>have an account</span>
                            <Link onClick={handleClickLogin}>Login</Link>
                            <span>OR</span>
                            <button onClick={handleClickUser} className="btn register-btn">Register as Organisation</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            {/* <img src={logo} alt="" /> */}
                            <h3>Welcome!</h3>
                            <span>have an account</span>
                            <Link onClick={handleClickLogin}>Login</Link>
                            <span>OR</span>
                            <button onClick={handleClickOrg} className="btn login-btn">Register as User</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
