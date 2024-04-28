import Reactt, { useState } from "react";
import "./tab.css"; // Import your CSS file for styling
import ProfessionCard from "./PerfessionCard";
import WorkshopsList from "./Workshoplist";
import Header from "views/UserManagement/TableHeader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabtitle, setTabTitle] = useState('Profession');

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
    if (tabNumber === 1) {
      setTabTitle("Profession");
    } else if (tabNumber === 2) {
      setTabTitle("Trend");
    } else {
      setTabTitle("Workshop");
    }
  };
  const history = useHistory();

  return (
    <div className="tabs-container">
      <Header
        btntext={"Add"+" "+tabtitle}
        title={"Content Management"}
        icon
        onAddAccount={() => history.push("/admin/add"+tabtitle)}
      />
      <div className="tabs">
        <div
          className={`tab-1 tab ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Professions
        </div>
        <div
          className={`tab ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Trends
        </div>
        <div
          className={`tab ${activeTab === 3 ? "active" : ""}`}
          onClick={() => handleTabClick(3)}
        >
          Workshops
        </div>
      </div>
      <div className="tab-content">
        {activeTab === 1 && (
          <div>
            {["Welder", "Plumber", "Doctor", "Electrician", "Carpentar"].map(
              (i) => {
                return <ProfessionCard title={i} />;
              }
            )}
          </div>
        )}
        {activeTab === 2 && (
          <div>
            {[
              "Paint for kids",
              "Paint for kids",
              "Paint for kids",
              "Paint for kids",
              "Paint for kids",
            ].map((i) => {
              return <ProfessionCard title={i} />;
            })}
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <WorkshopsList />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
