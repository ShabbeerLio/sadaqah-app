import { useState } from "react";
import "./Filters.css";

const ZakatFilters = ({ onFilterChange }) => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [activeType, setActiveType] = useState(""); // new state to track "Zakat"

    const handleMonthClick = (label) => {
  const today = new Date();
  let fromDate = "";
  let toDate = today.toISOString().split("T")[0];
  let type = activeType;

  // ✅ Handle Month Filters
  setActiveFilter(label);

  switch (label.toLowerCase()) {
    case "july":
      fromDate = new Date(today.getFullYear(), 6, 1).toISOString().split("T")[0];
      break;
    case "june":
      fromDate = new Date(today.getFullYear(), 5, 1).toISOString().split("T")[0];
      toDate = new Date(today.getFullYear(), 5, 30).toISOString().split("T")[0];
      break;
    case "may":
      fromDate = new Date(today.getFullYear(), 4, 1).toISOString().split("T")[0];
      toDate = new Date(today.getFullYear(), 4, 31).toISOString().split("T")[0];
      break;
    case "last 3 months":
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(today.getMonth() - 2);
      fromDate = new Date(threeMonthsAgo.getFullYear(), threeMonthsAgo.getMonth(), 1)
        .toISOString()
        .split("T")[0];
      break;
    case "last 6 months":
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(today.getMonth() - 5);
      fromDate = new Date(sixMonthsAgo.getFullYear(), sixMonthsAgo.getMonth(), 1)
        .toISOString()
        .split("T")[0];
      break;
    case "2025":
      fromDate = "2025-01-01";
      toDate = "2025-12-31";
      break;
    case "all":
    default:
      fromDate = "";
      toDate = "";
      type = "";
      setActiveType("");
      break;
  }

  onFilterChange({ from: fromDate, to: toDate, type });
};

    const filters = [
        "july",
        "june",
        "May",
        "Last 3 months",
        "Last 6 months",
        "2025"
    ];
    return (
        <div className="Filters">
            <div className="filter-ala">
                <p
                    className={activeFilter === "All" ? "active" : ""}
                    onClick={() => handleMonthClick("All")}
                >
                    All
                </p>
            </div>
            <div className="filter-boxes">
                <div className="filter-box">
                    {filters.map((label, index) => (
                        <p
                            key={index}
                            className={
                                (activeFilter === label || activeType === label) ? "active" : ""
                            }
                            onClick={() => handleMonthClick(label)}
                        >
                            {label}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ZakatFilters;