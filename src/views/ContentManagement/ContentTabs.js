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
import Pagination from "views/UserManagement/Pagination";
import { searchTrend, deleteTrend } from "Apis/Trend";
import { searchProfession } from "Apis/Profession";
import { toast } from "react-toastify";
import { deleteProfession } from "Apis/Profession";
import DeletePopup from "components/DeletePopup.";
import DragAndDropList from "views/DragandDrop/DragDrop";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabtitle, setTabTitle] = useState("Profession");
  const [trend, setTrend] = useState([]);
  const [profession, setProfession] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [pagination, setPagination] = useState(""); // State for loading indicator
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

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
    localStorage.setItem("tab", tabNumber);
  };
  const getTrends = async (page) => {
    setLoading(true); // Set loading to false when data is fetched
    const data = await getAllTrend(page);
    setTrend(data.data.trends);
    setPagination(data.data.meta);
    setLoading(false); // Set loading to false when data is fetched
  };
  const getProfessions = async (page) => {
    setLoading(true); // Set loading to false when data is fetched
    const data = await getAllProfession(page);
    setProfession(data.data);
    // setPagination(data.data.meta);
    setLoading(false); // Set loading to false when data is fetched
  };
  const storedTab = localStorage.getItem("tab");
  useEffect(() => {
    if (storedTab) {
      setActiveTab(parseInt(storedTab));
    }
    setLoading(true); // Set loading to true when tab changes
    let tab = storedTab || activeTab;
    if (tab == 1) {
      getProfessions(0);
    } else {
      setTabTitle("Trend");
      getTrends(0);
    }
  }, [activeTab, storedTab]);
  const history = useHistory();
  const editCallback = async (id, type) => {
    if (activeTab == 2) {
      if (type === "delete") {
        setDeleteId(id);
        setDeleteModal(true);
      } else {
        history.push("/admin/edittrend/" + id);
      }
    } else {
      if (type === "delete") {
        setDeleteId(id);

        setDeleteModal(true);
      } else {
        history.push("/admin/editProfession/" + id);
      }
    }
  };
  const onPageChange = (val) => {
    if (val - 1 > pagination.pages - 1) {
      return;
    }
    if (val - 1 < 0) {
      return;
    }
    let tab = activeTab;

    if (tab == 1) {
      getProfessions(val - 1);
    } else {
      getTrends(val - 1);
    }
  };
  const onSearch = async (e) => {
    setLoading(true);
    if (activeTab == 2) {
      if (e.target.value) {
        const data = await searchTrend(e.target.value);
        setTrend(data.data.trends);
        setPagination(data.data.meta);
      } else {
        getTrends(0);
      }
    } else {
      if (e.target.value) {
        const data = await searchProfession(e.target.value);
        setProfession(data.data.professions);
        setPagination(data.data.meta);
      } else {
        getProfessions(0);
      }
    }
    setLoading(false);
  };
  function stripHTMLAndTruncate(htmlString) {
    if (typeof htmlString !== "string") return "";

    // Remove all <img> tags using a regular expression
    let noImgString = htmlString.replace(/<img[^>]*>/gi, "");

    // Remove all other HTML tags
    let strippedString = noImgString.replace(/<\/?[^>]+(>|$)/g, "");

    // Set the maximum length to 252 to account for the "..." and the space before the link.
    const maxLength = 252;

    // Trim the resulting string to maxLength characters and add "..." if it exceeds maxLength characters
    let truncatedString =
      strippedString.length > 255
        ? strippedString.slice(0, maxLength) + "..."
        : strippedString;

    return truncatedString;
  }
  const onClose = () => {
    setDeleteModal(false);
  };
  const handleDelete = async (val) => {
    if (activeTab === 2) {
      const res = await deleteTrend(deleteId);
      if (!res.errors) {
        toast.success("Trend deleted successfully");
        setTrend(trend.filter((item) => item._id !== deleteId));
      }
    } else {
      const res = await deleteProfession(deleteId);
      if (!res.errors) {
        toast.success("Profession deleted successfully");
        setProfession(profession.filter((item) => item._id !== deleteId));
      }
    }
    setDeleteModal(false);
  };
  return (
    <div className="tabs-container">
      <DeletePopup
        isOpen={deleteModal}
        heading={"Delete Action"}
        cb={handleDelete}
        onClose={onClose}
        text={"Are you sure you want to delete? This action cannot be undone."}
      />

      <Header
        btntext={"Add" + " " + tabtitle}
        title={"Content Management"}
        icon
        onSearch={onSearch}
        onAddAccount={() => history.push("/admin/add" + tabtitle)}
        isSearchHide={activeTab === 3 && true}
        hideButton={activeTab === 3 && true}
      />
      <div className="tabs">
        <div
          className={`tab-1 tab ${activeTab === 1 ? "activeTab" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Professions
        </div>
        <div
          className={`tab ${activeTab === 2 ? "activeTab" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Trends
        </div>
        <div
          className={`tab ${activeTab === 3 ? "activeTab" : ""}`}
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
              profession?.length > 0 && (
                <DragAndDropList
                  profession={profession}
                  handleTabClick={editCallback}
                  setProfession={setProfession}
                />
              )
            )}
            {/* {pagination?.pages > 1 && (
              <div className="pagination" style={{ margin: 0, float: "unset" }}>
                <>
                  <button onClick={() => onPageChange(pagination.page - 1)}>
                    Previous
                  </button>
                  {Array.from({ length: pagination.pages }, (_, index) => (
                    <button
                      key={index}
                      className={index + 1 === pagination.page ? "active" : ""}
                      onClick={() => onPageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button onClick={() => onPageChange(pagination.page + 1)}>
                    Next
                  </button>
                </>
              </div>
            )} */}
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
                    createdOn={item.createdAt}
                    title={item.title}
                    imageUrl={imageUrl + item.img}
                    paragraph={stripHTMLAndTruncate(item.description)}
                    id={item._id}
                    handleTabClick={editCallback}
                  />
                );
              })
            )}
            {pagination?.pages > 1 && (
              <div className="pagination" style={{ margin: 0, float: "unset" }}>
                <>
                  <button onClick={() => onPageChange(pagination.page - 1)}>
                    Previous
                  </button>
                  {Array.from({ length: pagination.pages }, (_, index) => (
                    <button
                      key={index}
                      className={index + 1 === pagination.page ? "active" : ""}
                      onClick={() => onPageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button onClick={() => onPageChange(pagination.page + 1)}>
                    Next
                  </button>
                </>
              </div>
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
