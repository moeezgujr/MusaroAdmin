import React, { useState } from "react";
import "./Professionform.css"; // Import your CSS file for styling
import ImageUploadButton from "components/ImageUploader/Imageuploader";
import { Container, Form, Row, Col } from "react-bootstrap";

const ProfessionFormComponent = ({ goBack }) => {
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
          <div style={styles.title}>{"View Workshop Details"}</div>
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
              <button className="addaccountBtn">{"Approve Changes"}</button>
            </div>
          </div>
        </div>

        {/* <Row>
          <Col>
            <Form style={{ width: "500px" }}>
              <Form.Group controlId="input1">
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text" placeholder="Wood CNC Workshop" />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form style={{ width: "500px" }}>
              <Form.Group controlId="input2">
                <Form.Label>Owner of Workshop:</Form.Label>
                <Form.Control type="text" placeholder="Owner Name" />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form style={{ width: "500px" }}>
              <Form.Group controlId="input1">
                <Form.Label>Start Date:</Form.Label>
                <Form.Control type="date" placeholder="Wood CNC Workshop" />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form style={{ width: "500px" }}>
              <Form.Group controlId="input2">
                <Form.Label>End Date:</Form.Label>
                <Form.Control type="date" placeholder="Owner Name" />
              </Form.Group>
            </Form>
          </Col>
        </Row> */}
      </Container>
      <div
        className="d-flex"
        style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
      >
        <div className="">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="workshop-input"
            id="title"
            placeholder="Enter Title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="ml-3">
          <label htmlFor="title">Owner of workshop:</label>
          <input
            type="text"
            className="workshop-input"
            id="title"
            placeholder="Enter Owner"
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
          <label htmlFor="title">Start Date:</label>
          <input
            type="date"
            className="workshop-input"
            id="title"
            placeholder="Enter Title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="ml-3">
          <label htmlFor="title">End Date:</label>
          <input
            type="date"
            className="workshop-input"
            id="title"
            placeholder="Enter Owner"
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
          <label htmlFor="title">Start Time:</label>
          <input
            type="time"
            className="workshop-input"
            id="title"
            placeholder="Enter Title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="ml-3">
          <label htmlFor="title">End Time:</label>
          <input
            type="time"
            className="workshop-input"
            id="title"
            placeholder="Enter Owner"
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
          <label htmlFor="title">Price per coupon:</label>
          <input
            type="text"
            className="workshop-input"
            id="title"
            placeholder="Enter Price per coupon"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="ml-3">
          <label htmlFor="title">Max. no of applicants:</label>
          <input
            type="text"
            className="workshop-input"
            id="title"
            placeholder="Enter Max. no of applicants"
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
          <label htmlFor="title">City of workshop:</label>
          <input
            type="text"
            className="workshop-input"
            id="title"
            placeholder="Enter City"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="ml-3">
          <label htmlFor="title">Location:</label>
          <input
            type="text"
            className="workshop-input"
            id="title"
            placeholder="Location"
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
          <label htmlFor="description">Description:</label>
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
export default ProfessionFormComponent;
