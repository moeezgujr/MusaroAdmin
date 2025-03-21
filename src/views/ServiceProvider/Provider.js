import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Header from "../UserManagement/TableHeader";
import NoAccountsFound from "../UserManagement/NoDataFound";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CustomerList from "./CustomerList";
import ProviderList from "./ProviderList";
import TicketTable from "views/RevenueManagement/RevenueTable";
import Subscription from "views/Subscription/Subscription";

const Provider = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(1);
  const [tabtitle, setTabTitle] = useState("Service Provider");
  const [search, setSearch] = useState("");
  const storedTab = localStorage.getItem("customerTab");

  const handleTabClick = (tabNumber) => {
    localStorage.setItem("customerTab", tabNumber);
    setSearch("");
    setActiveTab(tabNumber);
    if (tabNumber == 1) {
      setTabTitle("Service Provider");
    } else if (tabNumber == 2) {
      // setTabTitle("Service Provider");
    }
  };
  useEffect(() => {
    setActiveTab(parseInt(storedTab) || 1);
  }, [storedTab]);
  const callback = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Header
        hideButton
        btntext={"Add Account"}
        title={tabtitle}
        onAddAccount={() => history.push("/admin/customermanagement")}
        onSearch={callback}
      />
      <div className="tabs mt-3">
        {/* <div
          className={`tab-1 tab ${activeTab === 1 ? "activeTab" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Customers
        </div> */}
        <div
          className={`tab ${activeTab === 1 ? "activeTab" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Service Provider
        </div>
        <div
          className={`tab ${activeTab === 2 ? "activeTab" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          New Subscriptions
        </div>
        <div
          className={`tab ${activeTab === 3 ? "activeTab" : ""}`}
          onClick={() => handleTabClick(3)}
        >
          Active Subscriptions
        </div>
        <div
          className={`tab ${activeTab === 4 ? "activeTab" : ""}`}
          onClick={() => handleTabClick(4)}
        >
          Canceled Subscriptions
        </div>
      </div>

      <div style={{ width: "98%", height: "100vh" }}>
        {activeTab === 1 && <ProviderList search={search} />}
        {activeTab === 2 && <Subscription tab={1} />}

        {activeTab === 3 && <TicketTable tab={1} />}
        {activeTab === 4 && <TicketTable tab={2} />}
      </div>
    </>
  );
};

export default Provider;
