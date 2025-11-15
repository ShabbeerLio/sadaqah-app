import { useContext, useEffect, useState } from "react";
import "./Filters.css";
import NoteContext from "../../Context/SadaqahContext";
import { useNavigate } from "react-router-dom";

const Filters = ({ onFilterChange }) => {
  const { userDetail, getAccountDetails } = useContext(NoteContext);
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeType, setActiveType] = useState(""); // for Zakat

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAccountDetails();
    }
  }, [navigate]);

  const handleFilterClick = (label) => {
    const today = new Date();
    let fromDate = "";
    let toDate = today.toISOString().split("T")[0];
    let type = "";

    // Handle Zakat toggle
    if (label === "Zakat") {
      const isAlreadyActive = activeType === "Zakat";
      const newType = isAlreadyActive ? "" : "Zakat";
      setActiveType(newType);
      setActiveFilter(newType === "" ? "All" : "Zakat");

      onFilterChange({ from: "", to: "", type: newType });
      return;
    }

    setActiveFilter(label);
    setActiveType(""); // reset Zakat

    switch (label) {
      case "This Month":
        fromDate = new Date(today.getFullYear(), today.getMonth(), 1)
          .toISOString()
          .split("T")[0];
        break;

      case "Last Month":
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        fromDate = lastMonth.toISOString().split("T")[0];
        toDate = lastMonthEnd.toISOString().split("T")[0];
        break;

      case "Last 3 Months":
        const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);
        fromDate = threeMonthsAgo.toISOString().split("T")[0];
        break;

      case "Last 6 Months":
        const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);
        fromDate = sixMonthsAgo.toISOString().split("T")[0];
        break;

      case "Current Year":
        fromDate = `${today.getFullYear()}-01-01`;
        toDate = `${today.getFullYear()}-12-31`;
        break;

      case "All":
      default:
        fromDate = "";
        toDate = "";
        type = "";
        break;
    }

    onFilterChange({ from: fromDate, to: toDate, type });
  };

  const filters =
    userDetail?.role === "institute"
      ? ["This Month", "Last Month", "Last 3 Months", "Last 6 Months", "Current Year"]
      : ["Zakat", "This Month", "Last Month", "Last 3 Months", "Last 6 Months", "Current Year"];

  return (
    <div className="Filters">
      <div className="filter-ala">
        <p
          className={activeFilter === "All" ? "active" : ""}
          onClick={() => handleFilterClick("All")}
        >
          All
        </p>
      </div>
      <div className="filter-boxes">
        <div className="filter-box">
          {filters.map((label, index) => (
            <p
              key={index}
              className={activeFilter === label || activeType === label ? "active" : ""}
              onClick={() => handleFilterClick(label)}
            >
              {label}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;