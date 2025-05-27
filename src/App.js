import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Pnav from "./Components/Navbar/Pnav";
import Profile from "./Pages/Profile/Profile";
import History from "./Pages/History/History";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import { useEffect, useState } from "react";
import Loading from "./Components/Loading/Loading";
import Feeds from "./Pages/Feeds/Feeds";
import ProfileEdit from "./Pages/Profile/ProfileEdit";
import Search from "./Pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Simulate loading on first mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const hideNav =
    location.pathname === "/login" || location.pathname === "/signup";

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="app-container">
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/history" element={<History />} />
      </Routes>
      {!hideNav && <Pnav />}
    </div>
  );
}

export default App;
