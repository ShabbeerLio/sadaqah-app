import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import CombinedFeedData from "../AppData";
import Loading from "../../Components/Loading/Loading";
import Host from "../../Host";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [orgActive, setOrgActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleClickOrg = (isInstitute) => {
    setOrgActive(null);
    setTimeout(() => {
      navigate("/signup", { state: { orgActive: isInstitute } });
    }, 500);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setOrgActive(null);
    try {
      const res = await fetch(`${Host}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setTimeout(() => {
          setLoading(true);
        }, 1000);
        localStorage.setItem("token", data.authToken);
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 4000);
      } else {
        setLoading(false);
        setErrorMessage(data.error || "Invalid email or password");
        setOrgActive(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setTimeout(() => {
        setLoading(false);
      }, 1100);
      setOrgActive(false);
      setErrorMessage("Server error. Please try again later.");
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  };

  const handleGoogleSignup = () => {
    window.location.href = `${Host}/auth/google`;
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="Login">
      <div className="Login-main">
        <div
          className={`signup-box ${orgActive === true
            ? "active"
            : orgActive === false
              ? ""
              : "nonactive"
            }`}
        >
          <div className="form-box register-user">
            <form onSubmit={(e) => e.preventDefault()}>
              <h2>Login</h2>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errorMessage && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    margin: "0",
                  }}
                >
                  {errorMessage}
                </p>
              )}
              <div className="forgot-link">
                <Link>Forgot Password</Link>
              </div>
              <button
                onClick={handleLoginSubmit}
                type="button"
                className="submit-button"
              >
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
              <button
                onClick={() => handleClickOrg(false)}
                className="btn register-btn"
              >
                Register as User
              </button>
              <button
                onClick={() => handleClickOrg(true)}
                className="btn register-btn"
              >
                Register as Institute
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
