import React, { useState } from "react";
import ".././ContentManagement/Professionform.css"; // Import your CSS file for styling
import ImageUploadButton from "components/ImageUploader/Imageuploader";
import { Container, Form, Row, Col } from "react-bootstrap";

const SubscriptionDetail = ({ goBack }) => {
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
    <div style={{ background: "#F8FAFC" }}>
      <Container fluid className="d-flex justify-content-center">
        <div style={styles.container}>
          <div style={styles.title}>{"View Subscription Details"}</div>
          <div style={styles.container2}>
            <div style={styles.cancelButton}>
              <button
                className="rejectbtn mr-1"
                onClick={() => window.history.back()}
              >
                {"Reject with Note"}
              </button>
            </div>
            <div style={styles.addButton}>
              <button className="addaccountBtn">{"Approve"}</button>
            </div>
          </div>
        </div>

   
      </Container>
      <div
        className="d-flex"
        style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
      >
        <div className="">
          <label htmlFor="title">Business:</label>
          <input
            type="text"
            className="workshop-input"
            id="title"
            placeholder="Business"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="ml-3">
          <label htmlFor="title">ID (Igama)#:</label>
          <input
            type="text"
            className="workshop-input"
            id="title"
            placeholder="14654165456"
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
          <label htmlFor="title">City:</label>
          <input
            type="text"
            className="workshop-input"
            id="title"
            placeholder="City"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="ml-3">
          <label htmlFor="title">Contact Mobile Number:</label>
          <input
            type="text"
            className="workshop-input"
            id="title"
            placeholder="Contact Mobile Number"
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
      </div>
      <div
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
      </div>
      <div
        className="d-flex mt-3"
        style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
      >
        <div className="">
          <label htmlFor="image">Image:</label>
          {/* <input type="file" id="image"  className="fileinputcontainer" onChange={handleImageChange} /> */}
          <ImageUploadButton className="fileinputcontainerWorkshop" />
        </div>
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
export default SubscriptionDetail;
