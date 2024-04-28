import React, { useState } from "react";
import ".././ContentManagement/Professionform.css"; // Import your CSS file for styling
import { Container, Form, Row, Col } from "react-bootstrap";
import Header from "views/UserManagement/TableHeader";

const Setting = ({ goBack }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Image:", image);
  };

  return (
    <>
      <Header
        btntext={"Save Changes"}
        secondarybtn={"Cancel"}
        isSearchHide
        title={"Settings & Integration"}
        onAddAccount={() => history.push("/admin/adduser")}
      />
      {/* <Row> */}
      <p className="ml-3 mt-2">Personal Info</p>
      {/* </Row> */}
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
            <div className="">
              <label htmlFor="title">First Name:</label>
              <input
                type="text"
                className="workshop-input"
                id="title"
                placeholder="Enter First Name"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="ml-3">
              <label htmlFor="title">Last Name:</label>
              <input
                type="text"
                className="workshop-input"
                id="title"
                placeholder="Enter Last Name"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
          </div>

          <div
            className="d-flex mt-3"
            style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
          >
            <div className="">
              <label htmlFor="title">Email Address:</label>
              <input
                style={{ width: "1195px" }}
                type="email"
                className="workshop-input"
                id="title"
                placeholder="Enter Email"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
          </div>
          {/* <div
          className="d-flex mt-3"
          style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
        >
          <div className="">
            <label htmlFor="title">Whatsapp Contact Number:</label>
            <input
              type="text"
              className="subscription-input"
              id="title"
              placeholder="City"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="ml-3">
            <label htmlFor="title">Work Force Number:</label>
            <input
              type="text"
              className="subscription-input"
              id="title"
              placeholder="Contact Mobile Number"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="ml-3">
            <label htmlFor="title">Years of experience:</label>
            <input
              type="text"
              className="subscription-input"
              id="title"
              placeholder="Contact Mobile Number"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
        </div> */}
          {/* <div
          className="d-flex mt-3"
          style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
        >
          <div className="">
            <label htmlFor="description">Server Description:</label>
            <textarea
              id="description"
              className="workshop-input-textarea"
              value={description}
              placeholder="Enter Description"
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
        </div> */}
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
            <div className="">
              <label htmlFor="title">Old Password:</label>
              <input
                type="password"
                className="workshop-input"
                id="title"
                placeholder="Enter your old password"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
          </div>
          <div
            className="d-flex mt-3"
            style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
          >
            <div className="">
              <label htmlFor="title">Confirm New Password:</label>
              <input
                type="password"
                className="workshop-input"
                id="Confirm New Password"
                placeholder="Enter Email"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
          </div>
          <div
            className="d-flex mt-3"
            style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
          >
            <div className="">
              <label htmlFor="title">Confirm New Password:</label>
              <input
                type="password"
                className="workshop-input"
                id="Confirm New Password"
                placeholder="Enter Email"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
          </div>

          {/* <div
          className="d-flex mt-3"
          style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
        >
          <div className="">
            <label htmlFor="title">Whatsapp Contact Number:</label>
            <input
              type="text"
              className="subscription-input"
              id="title"
              placeholder="City"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="ml-3">
            <label htmlFor="title">Work Force Number:</label>
            <input
              type="text"
              className="subscription-input"
              id="title"
              placeholder="Contact Mobile Number"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="ml-3">
            <label htmlFor="title">Years of experience:</label>
            <input
              type="text"
              className="subscription-input"
              id="title"
              placeholder="Contact Mobile Number"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
        </div> */}
          {/* <div
          className="d-flex mt-3"
          style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
        >
          <div className="">
            <label htmlFor="description">Server Description:</label>
            <textarea
              id="description"
              className="workshop-input-textarea"
              value={description}
              placeholder="Enter Description"
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
        </div> */}
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
