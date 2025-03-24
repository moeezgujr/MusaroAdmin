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

const Customer = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(1);
  const [tabtitle, setTabTitle] = useState("Customer Management");
  const [search, setSearch] = useState("");
  const storedTab = localStorage.getItem("customerTab");

  const handleTabClick = (tabNumber) => {
    localStorage.setItem("customerTab", tabNumber);

    setSearch("");
    setActiveTab(tabNumber);
    if (tabNumber == 1) {
      setTabTitle("Customer Management");
    } else if (tabNumber == 2) {
      setTabTitle("Service Provider");
    }
  };
  useEffect(() => {
    setActiveTab(parseInt(storedTab));
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
          className={`tab-1 tab ${"activeTab"}`}
          onClick={() => handleTabClick(1)}
        >
          Customers
        </div> */}
        {/* <div
          className={`tab ${activeTab === 2 ? "activeTab" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Service Provider
        </div> */}
      </div>

      <div style={{ width: "98%", height: "100vh" }}>
        {/* {activeTab === 1 ? ( */}
          <CustomerList search={search} />
        {/* // ) : ( */}
        {/* //   <ProviderList search={search} /> */}
        {/* // )} */}
      </div>
    </>
  );
};

export default Customer;
