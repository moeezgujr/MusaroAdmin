import React from "react";
import { Dropdown } from "react-bootstrap";

const Header = ({
  onSearch,
  onAddAccount,
  btntext,
  title,
  hideButton,
  secondarybtn,
  isSearchHide,
  filter,
}) => {
  return (
    <div style={styles.container}>
      <div className="dashboard-title">{title}</div>
      <div style={styles.container2}>
        {!isSearchHide && (
          <div style={styles.search}>
            <input
              type="text"
              placeholder="Search..."
              onChange={onSearch}
              // style={{ marginRight: "10px"}}
              className="search"
            />
          </div>
        )}
        {secondarybtn && (
          <div style={styles.addButton}>
            <button className="rejectbtn mr-1" onClick={onAddAccount}>
              {secondarybtn}
            </button>
          </div>
        )}
        {!hideButton && (
          <div style={styles.addButton}>
            <button className="addaccountBtn" onClick={onAddAccount}>
              {btntext || "Add Account"}
            </button>
          </div>
        )}
        {filter && (
          // <div style={styles.addButton}>
          //   <button className="addaccountBtn" onClick={onAddAccount}>
          //     {btntext || "Add Account"}
          //   </button>
          // </div>
          <>
            <Dropdown style={{ marginRight: "10px" }}>
              <Dropdown.Toggle id="dropdown-basic">Posted</Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
           
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ccc",
    width: "100%",
    height: "50px",
    backgroundColor: "White",
    borderBlockEnd: "none",
  },
  container2: {
    display: "flex",
  },
  // title: {
  //   fontSize: "24px",
  //   fontWeight: "bold",
  // },
  search: {
    marginRight: "10px",
  },
  addButton: {
    marginLeft: "auto",
  },
};

export default Header;
