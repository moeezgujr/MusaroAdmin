import React from "react";

const NoAccountsFound = () => {
  return (
    <div style={styles.container}>
      <p className="nodatafoundtext">No Accounts Found!</p>
      <p className="nodatafoundtextindetail">You can add account by clicking on Add Account button</p>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    top: "50%",
    left: "55%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    color: "red",
    borderRadius: "5px",
    zIndex: "999",
  },
  text:{

  }
};

export default NoAccountsFound;
