import React, { useEffect, useState } from "react";
import "./tab.css"; // Import your CSS file for styling
import ProfessionCard from "./PerfessionCard";
import WorkshopsList from "./Workshoplist";
import Header from "views/UserManagement/TableHeader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAllTrend } from "Apis/Trend";
import { getAllProfession } from "Apis/Profession";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabtitle, setTabTitle] = useState("Profession");
  const [trend, setTrend] = useState([]);
  const [profession, setProfession] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator

  const imageUrl = process.env.REACT_APP_IMAGE_SRC;
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
  const getTrends = async () => {
    const data = await getAllTrend(0);
    setTrend(data.data.trends);
    setLoading(false); // Set loading to false when data is fetched
  };
  const getProfessions = async () => {
    const data = await getAllProfession(0);
    setProfession(data.data.professions);
    setLoading(false); // Set loading to false when data is fetched
  };
  useEffect(() => {
    setLoading(true); // Set loading to true when tab changes
    if (activeTab === 1) {
      getProfessions();
    } else {
      getTrends();
    }
  }, [activeTab]);
  const history = useHistory();
  const editCallback = (id) => {
    if (activeTab == 2) history.push("/admin/edittrend/" + id);
    else history.push("/admin/editProfession/" + id)
  };
  return (
    <div className="tabs-container">
      <Header
        btntext={"Add" + " " + tabtitle}
        title={"Content Management"}
        icon
        onAddAccount={() => history.push("/admin/add" + tabtitle)}
        isSearchHide={activeTab === 3 && true}
        hideButton={activeTab === 3 && true}
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
      <div className={`tab-content ${activeTab === 3 ? "border_zero" : ""}`}>
        {activeTab === 1 && (
          <div>
            {loading ? ( // Render skeleton or loading indicator when loading
              <>
                <Skeleton height={40} count={5} style={{ marginBottom: 10 }} />{" "}
              </> // Assuming you have a Skeleton component for loading
            ) : (
              profession.length > 0 &&
              profession.map((item) => {
                return (
                  <ProfessionCard
                    title={item.name}
                    imageUrl={imageUrl + item.img}
                    paragraph={item.description}
                    id={item._id}
                    handleTabClick={editCallback}
                  />
                );
              })
            )}
          </div>
        )}
        {activeTab === 2 && (
          <div>
            {loading ? ( // Render skeleton or loading indicator when loading
              <>
                <Skeleton height={40} count={5} style={{ marginBottom: 10 }} />{" "}
              </> // Assuming you have a Skeleton component for loading
            ) : (
              trend.length > 0 &&
              trend.map((item) => {
                return (
                  <ProfessionCard
                    title={item.title}
                    imageUrl={imageUrl + item.img}
                    paragraph={item.description}
                    id={item._id}
                    handleTabClick={editCallback}
                  />
                );
              })
            )}
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
