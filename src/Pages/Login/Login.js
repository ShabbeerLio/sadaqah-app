import React, { useState } from "react";
import logo from "../../Assets/Logo/logo-sadaqah-app-white.png";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Signup = () => {
    const navigate = useNavigate();
    const [orgActive, setOrgActive] = useState(false)
    const handleClickOrg = (isInstitute) => {
        setOrgActive(null)
        setTimeout(() => {
            navigate('/signup', { state: { orgActive: isInstitute } });
        }, 500);
    }
    // console.log(orgActive, "orgActive")
     const handleClickLogin = () => {
        setOrgActive(null)
    }
    return (
        <div className="Login">
            <div className="Login-main">
                <div className={`signup-box ${orgActive === true ? 'active' :
                    orgActive === false ? '' :
                        'nonactive'}`}>
                    <div className="form-box register-user">
                        <form>
                            <h2>Login</h2>
                            <div className="form-group">
                                <input type="email" id="email" className="form-input" placeholder="Enter Email" />
                            </div>

                            <div className="form-group">
                                <input type="password" id="password" className="form-input" placeholder="Enter Password" />
                            </div>
                            <button onClick={handleClickLogin} type="button" className="submit-button">
                                Login
                            </button>
                            <div className="login-dash">
                                <span></span>
                                <p>OR</p>
                                <span></span>
                            </div>
                            <div className="form-googleverify">
                                <FaGoogle />
                                <p>Login with Google</p>
                            </div>
                        </form>
                    </div>

                    <div className="toggle-box">
                        <div className="toggle-panel toggle-left">
                            {/* <img src={logo} alt="" /> */}
                            <h3>Welcome!</h3>
                            <span>Dont have an account</span>
                            <button onClick={() => handleClickOrg(false)} className="btn register-btn">Register as User</button>
                            <button onClick={() => handleClickOrg(true)} className="btn register-btn">Register as Institute</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
