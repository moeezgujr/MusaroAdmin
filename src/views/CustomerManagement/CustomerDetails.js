import React, { useEffect, useState } from "react";
import "../ContentManagement/Professionform.css"; // Import your CSS file for styling
import ImageUploadButton from "components/ImageUploader/Imageuploader";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { getWorkshop } from "Apis/Workshop";
import { getcustomerbyid } from "Apis/Customer";

const CustomerFormComponent = ({ goBack }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    city: "",
    mobile: "",
    createdAt: "",
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
  const mapCustomerToFormValues = (data) => {
    return {
      title: data?.name || "",
      city: data?.city || "",
      mobile: data?.mobile || "",
    };
  };
  const { id } = useParams();
  const fetchCustomer = async (id) => {
    const data = await getcustomerbyid(id);
    setFormValues(mapCustomerToFormValues(data.data));
  };
  useEffect(() => {
    fetchCustomer(id);
  }, [id]);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormValues((prevValues) => ({
      ...prevValues,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form Values:", formValues);
  };
  const imageUrl = "https://musaro-public.s3.me-south-1.amazonaws.com/";

  return (
    <div style={{ background: "#F8FAFC", height:'100vh' }}>
      <Container fluid className="d-flex justify-content-center">
        <div style={styles.container}>
          <div style={styles.title}>{"View Workshop Details"}</div>
          <div style={styles.container2}>
            <div style={styles.cancelButton}>
              <button
                className="rejectbtn mr-1"
                style={{width:'200px'}}
                onClick={() => window.history.back()}
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
          <label htmlFor="title">Name:</label>
          <input
            type="text"
            className="workshop-input"
            id="name"
            disabled
            placeholder="Enter Name"
            value={formValues.name}
            onChange={handleChange}
          />
        </div>
        <div className="ml-3">
          <label htmlFor="title">City:</label>
          <input
            type="text"
            className="workshop-input"
            disabled
            id="city"
            placeholder="Enter City"
            value={formValues.city}
            onChange={handleChange}
          />
        </div>
      </div>
      <div
        className="d-flex mt-3"
        style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }}
      >
        <div className="">
          <label htmlFor="title">Contact Mobile Number:</label>
          <input
            type="text"
            disabled
            className="workshop-input"
            id="mobile"
            placeholder="Enter Mobile#"
            value={formValues.mobile}
            onChange={handleChange}
          />
        </div>
        <div className="ml-3">
          <label htmlFor="title">Created On:</label>
          <input
            type="date"
            className="workshop-input"
            id="createdAt"
            placeholder="Enter Date"
            disabled
            value={formValues.createdAt}
            onChange={handleChange}
          />
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
export default CustomerFormComponent;
