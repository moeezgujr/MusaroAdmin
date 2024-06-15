import React, { useEffect, useState } from "react";
import "./Professionform.css"; // Import your CSS file for styling
import ImageUploadButton from "components/ImageUploader/Imageuploader";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { getWorkshop } from "Apis/Workshop";

const ProfessionFormComponent = ({ goBack }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    owner: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    price: "",
    maxApplicants: "",
    city: "",
    location: "",
    description: "",
    image: null,
  });
  function convertTo24Hour(time12h) {
    // Parse the time string to a Date object
    var date = new Date("2000-01-01 " + time12h);

    // Format the time to 24-hour format
    var time24h = date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    return time24h;
  }
  const mapWorkshopToFormValues = (workshop) => {
    const startDate = workshop.startDate
      ? workshop.startDate.split("T")[0]
      : "";
    const endDate = workshop.endDate ? workshop.endDate.split("T")[0] : "";

    return {
      title: workshop.workshopName || "",
      owner: workshop.createdBy || "",
      startDate: startDate || "",
      endDate: endDate || "",
      startTime: convertTo24Hour(workshop.startTime) || "",
      endTime: convertTo24Hour(workshop.endTime) || "",
      price: workshop.pricePerPerson || "",
      maxApplicants: workshop.maxPeople || "",
      city: workshop.city || "",
      location: workshop.location
        ? `${workshop.location.latitude}, ${workshop.location.longitude}`
        : "",
      description: workshop.description || "",
      image:
        workshop.media && workshop.media.length > 0 ? workshop.media[0] : null,
    };
  };
  const { id } = useParams();
  const fetchWorkshop = async (id) => {
    const data = await getWorkshop(id);
    setFormValues(mapWorkshopToFormValues(data.data[0]));
  };
  useEffect(() => {
    fetchWorkshop(id);
  }, [id]);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const history=useHistory()
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form Values:", formValues);
  };
  const imageUrl = "https://musaro-public.s3.me-south-1.amazonaws.com/";

  return (
    <div style={{ background: "#F8FAFC" }}>
      <Container fluid className="d-flex justify-content-center">
        <div style={styles.container}>
          <div style={styles.title}>{"View Workshop Details"}</div>
          <div style={styles.container2}>
            <div style={styles.cancelButton}>
              <button
                className="rejectbtn mr-1"
                onClick={() => history.push("/admin/content")}
              >
                {"Reject with Note"}
              </button>
            </div>
            <div style={styles.addButton}>
              <button
                onClick={handleSubmit}
                className="addaccountBtn"
                style={{ width: "200px" }}
              >
                {"Approve Changes"}
              </button>
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
            disabled
            placeholder="Enter Title"
            value={formValues.title}
            onChange={handleChange}
          />
        </div>
        <div className="ml-3">
          <label htmlFor="title">Owner of workshop:</label>
          <input
            type="text"
            className="workshop-input"
            disabled
            id="owner"
            placeholder="Enter Owner"
            value={formValues.owner}
            onChange={handleChange}
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
            disabled
            className="workshop-input"
            id="startDate"
            placeholder="Enter Title"
            value={formValues.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="ml-3">
          <label htmlFor="title">End Date:</label>
          <input
            type="date"
            className="workshop-input"
            id="endDate"
            placeholder="Enter Owner"
            disabled
            value={formValues.endDate}
            onChange={handleChange}
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
            id="startTime"
            disabled
            placeholder="Enter Title"
            value={formValues.startTime}
            onChange={handleChange}
          />
        </div>
        <div className="ml-3">
          <label htmlFor="title">End Time:</label>
          <input
            type="time"
            className="workshop-input"
            id="endTime"
            placeholder="Enter Owner"
            value={formValues.endTime}
            disabled
            onChange={handleChange}
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
            disabled
            id="price"
            placeholder="Enter Price per coupon"
            value={formValues.price}
            onChange={handleChange}
          />
        </div>
        <div className="ml-3">
          <label htmlFor="title">Max. no of applicants:</label>
          <input
            type="text"
            className="workshop-input"
            id="maxApplicants"
            placeholder="Enter Max. no of applicants"
            disabled
            value={formValues.maxApplicants}
            onChange={handleChange}
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
            id="city"
            disabled
            placeholder="Enter City"
            value={formValues.city}
            onChange={handleChange}
          />
        </div>
        <div className="ml-3">
          <label htmlFor="title">Location:</label>
          <input
            type="text"
            className="workshop-input"
            id="location"
            placeholder="Location"
            value={formValues.location}
            onChange={handleChange}
            disabled
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
            value={formValues.description}
            placeholder="Enter Description"
            onChange={handleChange}
            disabled
          ></textarea>
        </div>
      </div>
      <div
        className="mt-3"
        style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
      >
        <label htmlFor="description">Image:</label>
      </div>
      <div
        className="d-flex"
        style={{
          width: "96%",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        {" "}
        <div className="image-viewer-container">
          {formValues.image ? (
            <img
              src={imageUrl + formValues.image}
              alt="Workshop"
              className="workshop-image"
            />
          ) : (
            <p>No image available</p>
          )}
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
