import React, { useEffect, useRef, useState } from "react";
import logo from "../../Assets/Logo/logo-sadaqah-app-white.png";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Signup.css";
import Host from "../../Host";
import Loading from "../../Components/Loading/Loading";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [overed, setOvered] = useState(null);
  const overedRef = useRef(null);
  const timeoutRef = useRef(null);
  const loginClickedRef = useRef(false);

  const [userData, setUserData] = useState({
    avatar: "",
    userName: "",
    number: "",
    email: "",
    password: "",
    pincode: "",
  });

  const [instituteData, setInstituteData] = useState({
    userName: "",
    email: "",
    password: "",
    instituteType: "",
    pincode: "",
    AuthorizedPerson: {
      name: "",
      number: "",
    },
  });

  useEffect(() => {
    // only run if login is NOT clicked
    if (loginClickedRef.current) return;

    const initial = location.state?.orgActive ?? false;
    console.log(initial, "initial");

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

  const handleCreateUser = async (e) => {
    console.log(userData, "userData");
    e.preventDefault();
    setErrorMessage("");
    setOvered(null);
    try {
      const res = await fetch(`${Host}/auth/createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
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
        setOvered(false);
        setErrorMessage(data.error || "Invalid email or password");
      }
    } catch (err) {
      setOvered(false);
      setErrorMessage("Server Error");
    }
  };
  const handleCreateInstitute = async (e) => {
    console.log(instituteData, "instituteData");
    e.preventDefault();
    setErrorMessage("");
    setOvered(null);
    try {
      const res = await fetch(`${Host}/auth/createinstitute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(instituteData),
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
        setOvered(false);
        setErrorMessage(data.error || "Invalid email or password");
      }
    } catch (err) {
      setOvered(false);
      setErrorMessage("Server Error");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${Host}/auth/google`;
  };

  if (loading) {
    return <Loading />;
  }

  // console.log(overed,"overed")
  return (
    <div className="Login">
      <div className="Login-main">
        <div
          className={`signup-box ${
            overed === true ? "active" : overed === false ? "" : "nonactive"
          }`}
        >
          <div className="form-box register-user">
            <form onSubmit={handleCreateUser}>
              <h2>Signup as User</h2>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Name"
                  value={userData.userName}
                  onChange={(e) =>
                    setUserData({ ...userData, userName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  id="number"
                  className="form-input"
                  placeholder="Number"
                  value={userData.number}
                  onChange={(e) =>
                    setUserData({ ...userData, number: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="Password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  id="pincode"
                  className="form-input"
                  placeholder="Current Pincode"
                  value={userData.pincode}
                  onChange={(e) =>
                    setUserData({ ...userData, pincode: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  className="form-input"
                  placeholder="Profile Picture"
                  value={userData.avatar}
                  onChange={(e) =>
                    setUserData({ ...userData, avatar: e.target.value })
                  }
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Signup
              </button>
              <div className="login-dash">
                <span></span>
                <p>OR</p>
                <span></span>
              </div>
              <div className="form-googleverify" onClick={handleGoogleSignup}>
                <FaGoogle />
                <p>Signup with Google</p>
              </div>
            </form>
          </div>
          <div className="form-box register-organisation">
            <form onSubmit={handleCreateInstitute}>
              <h2>Signup as Institute</h2>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Institution Name"
                  value={instituteData.userName}
                  onChange={(e) =>
                    setInstituteData({
                      ...instituteData,
                      userName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <select
                  id="type"
                  className="form-input"
                  value={instituteData.instituteType}
                  onChange={(e) =>
                    setInstituteData({
                      ...instituteData,
                      instituteType: e.target.value,
                    })
                  }
                >
                  <option value="">Select Institution Type</option>
                  <option value="masjid">Masjid</option>
                  <option value="madrasa">Madrasa</option>
                  <option value="kabristan">Kabristan</option>
                  <option value="khanqah">Khanqua</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Email"
                  value={instituteData.email}
                  onChange={(e) =>
                    setInstituteData({
                      ...instituteData,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="Password"
                  value={instituteData.password}
                  onChange={(e) =>
                    setInstituteData({
                      ...instituteData,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  id="pincode"
                  className="form-input"
                  placeholder="pincode"
                  value={instituteData.pincode}
                  onChange={(e) =>
                    setInstituteData({
                      ...instituteData,
                      pincode: e.target.value,
                    })
                  }
                />
              </div>
              <div className="login-dash">
                <p>Authorized Person (Imam or Committee Head)</p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="authorized"
                  className="form-input"
                  placeholder="Person Name"
                  value={instituteData.AuthorizedPerson.name}
                  onChange={(e) =>
                    setInstituteData({
                      ...instituteData,
                      AuthorizedPerson: {
                        ...instituteData.AuthorizedPerson,
                        name: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  id="number"
                  className="form-input"
                  placeholder="Mobile Number"
                  value={instituteData.AuthorizedPerson.number}
                  onChange={(e) =>
                    setInstituteData({
                      ...instituteData,
                      AuthorizedPerson: {
                        ...instituteData.AuthorizedPerson,
                        number: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <button type="submit" className="submit-button">
                Signup
              </button>
              <div className="login-dash">
                <span></span>
                <p>OR</p>
                <span></span>
              </div>
              <div className="form-googleverify" onClick={handleGoogleSignup}>
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
              <button onClick={handleClickUser} className="btn register-btn">
                Register as Organisation
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              {/* <img src={logo} alt="" /> */}
              <h3>Welcome!</h3>
              <span>have an account</span>
              <Link onClick={handleClickLogin}>Login</Link>
              <span>OR</span>
              <button onClick={handleClickOrg} className="btn login-btn">
                Register as User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
