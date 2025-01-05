import React, { useEffect, useState } from "react";
import ".././ContentManagement/Professionform.css"; // Import your CSS file for styling
import { Container, Form, Row, Col } from "react-bootstrap";
import Header from "views/UserManagement/TableHeader";
import { patchUser } from "Apis/User";
import { toast } from "react-toastify";
import { resetPassword } from "Apis/Auth";

const Setting = ({ goBack }) => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");

  const [username, setusername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleTitleChange = (e) => {
    // setTitle(e.target.value);
  };

  const handleusernameChange = (e) => {
    setusername(e.target.value);
  };

  const handleFnameChange = (e) => {
    setfname(e.target.value);
  };
  const handleLnameChange = (e) => {
    setlname(e.target.value);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      username,
      name: fname + " " + lname,
      // oldPassword,
      // newPassword,
    };
    const res = await patchUser(form);
    if (res.message === "Success") {
      toast.success("User updated successfully");
    } else {
      toast.error("Error occurred while updating user");
    }
    if (
      newPassword &&
      confirmNewPassword &&
      newPassword !== confirmNewPassword
    ) {
      toast.error("New password and confirm password do not match");
    }
    if (
      newPassword &&
      confirmNewPassword &&
      newPassword === confirmNewPassword
    ) {
      const response = await resetPassword({ oldPassword, newPassword });
      if (response.message === "Password updated!") {
        toast.success("Password updated successfully");
      } else {
        toast.error("Error occurred while updating password");
      }
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setfname(userData.data.user.name.split(" ")[0]);
    setlname(userData.data.user.name.split(" ")[1]);
    setusername(userData.data.user.username);
  }, []);

  return (
    <>
      <Header
        btntext={"Save Changes"}
        // secondarybtn={"Cancel"}
        isSearchHide
        title={"Settings & Integration"}
        onAddAccount={(e) => handleSubmit(e)}
        onSecondarybtnCallback={(e) => {
          // handleCancel();
        }}
      />
      <p className="ml-3 mt-2">Personal Info</p>
      <Row className="mt-1 ml-1">
        <div
          style={{
            background: "#F8FAFC",
            height: "220px",
            borderRadius: "10px",
          }}
        >
          <div
            className="d-flex mt-3"
            style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
          >
            <div>
              <label htmlFor="fname">First Name:</label>
              <input
                type="text"
                className="workshop-input"
                id="fname"
                placeholder="Enter First Name"
                value={fname}
                onChange={handleFnameChange}
              />
            </div>
            <div className="ml-3">
              <label htmlFor="lname">Last Name:</label>
              <input
                type="text"
                className="workshop-input"
                id="lname"
                placeholder="Enter Last Name"
                value={lname}
                onChange={handleLnameChange}
              />
            </div>
          </div>

          <div
            className="d-flex mt-3"
            style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
          >
            <div>
              <label htmlFor="username">User Name:</label>
              <input
                style={{ width: "1195px" }}
                type="text"
                className="workshop-input"
                id="username"
                placeholder="Enter UserName"
                value={username}
                onChange={handleusernameChange}
              />
            </div>
          </div>
        </div>
      </Row>

      <p className="ml-3 mt-2">Change Password</p>
      <Row className="mt-1 ml-1">
        <div
          style={{
            background: "#F8FAFC",
            height: "300px",
            borderRadius: "10px",
          }}
        >
          <div
            className="d-flex mt-3"
            style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
          >
            <div>
              <label htmlFor="oldPassword">Old Password:</label>
              <input
                type="password"
                className="workshop-input"
                id="oldPassword"
                placeholder="Enter your old password"
                value={oldPassword}
                onChange={handleOldPasswordChange}
              />
            </div>
          </div>
          <div
            className="d-flex mt-3"
            style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
          >
            <div>
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                className="workshop-input"
                id="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
            </div>
          </div>
          <div
            className="d-flex mt-3"
            style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
          >
            <div>
              <label htmlFor="confirmNewPassword">Confirm New Password:</label>
              <input
                type="password"
                className="workshop-input"
                id="confirmNewPassword"
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={handleConfirmNewPasswordChange}
              />
            </div>
          </div>
        </div>
      </Row>
    </>
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

export default Setting;
