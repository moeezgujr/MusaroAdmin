import React from "react";
import { ReactComponent as PlusIcon } from "../../assets/img/Plus.svg";

const Header = ({
  onSearch,
  onAddAccount,
  btntext,
  title,
  hideButton,
  secondarybtn,
  isSearchHide,
  icon
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
        {!hideButton && icon && (
          <div style={styles.addButton}>
            <button className="addaccountBtn" onClick={onAddAccount}>
              <div className="d-flex">
                {/* <PlusIcon className="mt-1" style={{ marginRight: "3px" }} />{" "} */}
                {btntext || "Add Account"}
              </div>
            </button>
          </div>
        )}
        {!hideButton && !icon && (
          <div style={styles.addButton}>
            <button className="addaccountBtn" onClick={onAddAccount}>
              <div className="d-flex">{btntext || "Add Account"}</div>
            </button>
          </div>
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
  title: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  search: {
    marginRight: "10px",
  },
  addButton: {
    marginLeft: "auto",
  },
};

export default Header;
