import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "./Slider.css";
import { getRatings, getcustomerbyid, deleteCustomer } from "Apis/Customer";
import { toast } from "react-toastify";
import ImageUploadButton from "components/ImageUploader/Imageuploader";

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
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
`;

const SliderWrapper = styled.div`
  position: relative;
  top: 20%;
  left: 17%;
  width: 82%;
  height: 80%;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 20px 20px 0 0;
`;

const Content = styled.div`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
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

const SubscriptionSlider = ({ open, callback, id, data }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [formValues, setFormValues] = useState({
    name: "",
    city: "",
    mobile: "",
    createdAt: "",
    business: "",
    igama: "",
    contactMobile: "",
    whatsapp: "",
    workforce: "",
    experience: "",
    description: "",
    image: "",
  });

  useEffect(() => {debugger
    if (data && id) {
      const form = data.find((item) => item._id === id);
      debugger
      if (form) {
        setFormValues({
          name: form.name,
          city: form.city,
          mobile: form.mobile,
          createdAt: form.createdAt.split("T")[0],
          business: form.serviceDetail.businessName || "",
          igama: form.serviceDetail.idNumber || "",
          contactMobile: form.mobile || "",
          whatsapp: form.serviceDetail.whatsapp || "",
          workforce: form.workforce || "",
          experience: form.serviceDetail.yearsOfExperience || "",
          description: form.serviceDetail.serviceDescription || "",
          image: process.env.REACT_APP_IMAGE_SRC + form.image || "",
        });
      }
    }
  }, [id, data]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const slideStyles = useSpring({
    transform: isOpen ? "translateY(0%)" : "translateY(100%)",
    from: { transform: "translateY(100%)" },
  });

  //   const handleSubmit = async () => {
  //     const res = await deleteCustomer(id);
  //     if (!res.error) {
  //       toast.success("Customer deleted successfully");
  //       callback();
  //     }
  //   };

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
            <Content style={{ background: "#f6f9fc", borderRadius: "20px" }}>
              {/* <Container fluid className="d-flex justify-content-center"> */}
              <div style={styles.container} className="mb-3">
                <div>
                  <div style={styles.title}>{"View Subscription Details"}</div>
                  <p className="sub_p_text">View the details of Subscription</p>
                </div>

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
              {/* </Container> */}
              <div>
                <div
                  className="d-flex"
                  style={{
                    width: "100%",
                    marginLeft: "10px",
                    marginRight: "20px",
                  }}
                >
                  <div className="">
                    <label htmlFor="business">Business:</label>
                    <input
                      type="text"
                      className="workshop-input"
                      id="business"
                      placeholder="Business"
                      value={formValues.business}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="igama">ID (Igama)#:</label>
                    <input
                      type="text"
                      className="workshop-input"
                      id="igama"
                      placeholder="14654165456"
                      value={formValues.igama}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div
                  className="d-flex mt-3"
                  style={{
                    width: "100%",
                    marginLeft: "10px",
                    marginRight: "20px",
                  }}
                >
                  <div className="">
                    <label htmlFor="city">City:</label>
                    <input
                      type="text"
                      className="workshop-input"
                      id="city"
                      placeholder="City"
                      value={formValues.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="contactMobile">
                      Contact Mobile Number:
                    </label>
                    <input
                      type="text"
                      className="workshop-input"
                      id="contactMobile"
                      placeholder="Contact Mobile Number"
                      value={formValues.contactMobile}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div
                  className="d-flex mt-3"
                  style={{
                    width: "100%",
                    marginLeft: "10px",
                    marginRight: "20px",
                  }}
                >
                  <div className="">
                    <label htmlFor="whatsapp">Whatsapp Contact Number:</label>
                    <input
                      type="text"
                      className="subscription-input"
                      id="whatsapp"
                      placeholder="Whatsapp Contact Number"
                      value={formValues.whatsapp}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="workforce">Work Force Number:</label>
                    <input
                      type="text"
                      className="subscription-input"
                      id="workforce"
                      placeholder="Work Force Number"
                      value={formValues.workforce}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="experience">Years of experience:</label>
                    <input
                      type="text"
                      className="subscription-input"
                      id="experience"
                      placeholder="Years of Experience"
                      value={formValues.experience}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div
                  className="d-flex mt-3"
                  style={{
                    width: "100%",
                    marginLeft: "10px",
                    marginRight: "20px",
                  }}
                >
                  <div className="">
                    <label htmlFor="description">Server Description:</label>
                    <textarea
                      id="description"
                      className="workshop-input-textarea"
                      value={formValues.description}
                      placeholder="Enter Description"
                      // onChange={handleDescriptionChange}
                    ></textarea>
                  </div>
                </div>
                <div
                  className="d-flex mt-3"
                  style={{
                    width: "100%",
                    marginLeft: "10px",
                    marginRight: "20px",
                  }}
                >
                  <div className="">
                    <label htmlFor="description">Image:</label>{" "}
                    <div className="image-viewer-container" style={{width:'1190px'}}>
                    {formValues.image ? (
                        <img
                          src={'formValues.image'}
                          alt="Workshop"
                          className="workshop-image"
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                  </div>
                </div>
                {/* <div className="d-flex">
                  <div className="">
                     
                    </div>
                  </div> */}
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

export default SubscriptionSlider;
