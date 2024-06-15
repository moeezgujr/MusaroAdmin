import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "./Slider.css";
import { getRatings } from "Apis/Customer";
import { ReactComponent as Staricon } from "../../assets/img/star.svg";
import { ReactComponent as DotIcon } from "../../assets/img/dot.svg";
import { getcustomerbyid } from "Apis/Customer";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const FullScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end; /* Align to the right */
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
`;

const SliderWrapper = styled.div`
  position: relative;
  top: 20%; /* Leave space from the top */
  left: 17%; /* Leave space from the left */
  width: 82%; /* Cover 3 quarters of the screen width */
  height: 80%; /* Cover 3 quarters of the screen height */
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 20px 20px 0 0; /* Rounded corners at the top */
`;

const Content = styled.div`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

const OpenButton = styled.button`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1000;
  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  position: fixed;
  top: 100px;
  right: 10px;
  color: white;
  padding: 10px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 1000;
  &:hover {
    color: red;
  }
`;
const handleChange=()=>{

}
const CustomerSlider = ({ open, callback, id }) => {
  const [isOpen, setIsOpen] = useState(open);
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
  const ratings = async (id) => {
    await getRatings(id);
  };

  useEffect(() => {
    setIsOpen(open);
    if (open) {
      ratings(id);
    }
  }, [open]);

  const slideStyles = useSpring({
    transform: isOpen ? "translateY(0%)" : "translateY(100%)",
    from: { transform: "translateY(100%)" },
  });

  return (
    <>
      <FullScreenWrapper isOpen={isOpen}>
        <CloseButton
          onClick={() => {
            setIsOpen(false);
            callback();
          }}
        >
          &times;
        </CloseButton>
        <animated.div
          style={{
            ...slideStyles,
            width: "100%",
            height: "100%",
          }}
        >
          <SliderWrapper>
            <Content
              style={{
                background: "#f6f9fc",
                borderRadius: "20px",
              }}
            >
              {" "}
              <div className="d-flex">
                <div style={{marginLeft:'20px'}}>
                  <h2 className="rating_heading">Customer Details</h2>
                  <p className="heading_customer_text">View the customer details</p>
                </div>
                <div style={styles.addButton}>
                  <button
                    // onClick={handleSubmit}
                    className="addaccountBtn"
                    style={{ width: "200px", marginRight:'10px' }}
                  >
                    {"Delete Account"}
                  </button>
                </div>
              </div>
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
            </Content>
          </SliderWrapper>
        </animated.div>
      </FullScreenWrapper>
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

export default CustomerSlider;
