import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "./Slider.css";
import { getRatings, getcustomerbyid, deleteCustomer } from "Apis/Customer";
import { toast } from "react-toastify";
import ImageUploadButton from "components/ImageUploader/Imageuploader";
import Popup from "components/Popup";
import { verifyProvider } from "Apis/NewSubscription";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { updateProvider } from "Apis/NewSubscription";
import Profile from "views/Subscription/Profileimage";

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

const SubscriptionSlider = ({ open, callback, id, data, type }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

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
    type: "",
    profilePicture: "",
    backgroundPicture: "",
  });

  useEffect(() => {
    if (data && id) {
      const form = data.find((item) => item._id === id);
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
          profilePicture: form.profilePicture
            ? process.env.REACT_APP_IMAGE_SRC + form.profilePicture
            : "",
          backgroundPicture: form.backgroundPicture
            ? process.env.REACT_APP_IMAGE_SRC + form.backgroundPicture
            : "",
          image:
            process.env.REACT_APP_IMAGE_SRC + form.serviceDetail.idPicture ||
            "",
          type: form.serviceDetail.type,
        });
        setImagePreview(
          process.env.REACT_APP_IMAGE_SRC + form.serviceDetail.idPicture || ""
        );
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

  const onClosePopup = () => {
    setPopupOpen(false);
    setIsOpen(false);
  };
  const verify = async () => {
    const res = await verifyProvider(id, {
      status: "APPROVED",
      reason: "",
    });
    if (res.errors === null) {
      toast.success("Status Approved successfully");
    } else {
      toast.error("An Error occurend while updating status");
    }
    setIsOpen(false);
  };
  const handleImageChange = (e) => {
    setFormValues({ ...formValues, image: e });
    setImagePreview(URL.createObjectURL(e));
  };
  const handleImageDelete = () => {
    // setImage(null);
    setImagePreview(null);
    setFormValues({ ...formValues, image: "" });
  };
  function createMappingObject(params) {
    return {
      name: formValues.name,
      mobile: formValues.mobile,
      city: formValues.city,
      profilePicture: formValues.profilePicture,
      backgroundPicture: formValues.backgroundPicture,
      type: formValues.type,
      professionId: params.professionId,
      businessName: formValues.business,
      projectSize: formValues.business,
      serviceDescription: formValues.description,
      yearsOfExperience: formValues.experience,
      idNumber: formValues.igama,
      idPicture: formValues.image,
      whatsapp: formValues.whatsapp,
      officeNumber: formValues.contactMobile,
      type: formValues.type,
      // workforce:formValues.workforce
    };
  }
  const upateProvider = async () => {
    let obj = createMappingObject(formValues);
    if (!(obj.idPicture instanceof File)) {
      obj.idPicture = undefined;
    }
    if (!(obj.backgroundPicture instanceof File)) {
      obj.backgroundPicture = undefined;
    }
    if (!(obj.profilePicture instanceof File)) {
      obj.profilePicture = undefined;
    }
    const update = await updateProvider(id, obj);
    if (update.errors === null) {
      toast.success("Subscription updated successfully");
      setIsOpen(false);
      callback();
    }
  };
  const cb = (type, file) => {
    if (type === "profileImage") {
      setFormValues({ ...formValues, profilePicture: file });
    } else {
      setFormValues({ ...formValues, backgroundPicture: file });
    }
  };
  const isEdit = type === "edit";
  return (
    <>
      <Popup
        isOpen={isPopupOpen}
        onClose={onClosePopup}
        id={id}
        comingFrom={"subscriptionList"}
      />

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
                  {type === "edit" ? (
                    <div style={styles.addButton}>
                      <button
                        className="addaccountBtn"
                        onClick={() => upateProvider(true)}
                      >
                        {"Update Changes"}
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={styles.cancelButton}>
                        <button
                          className="rejectbtn mr-1"
                          onClick={() => setPopupOpen(true)}
                        >
                          {"Reject with Note"}
                        </button>
                      </div>
                      <div style={styles.addButton}>
                        <button
                          onClick={() => verify()}
                          className="addaccountBtn"
                        >
                          {"Approve"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {/* </Container> */}
              <div>
                {isEdit && <Profile cb={cb} form={formValues} />}

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
                      disabled={!isEdit}
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
                      disabled={!isEdit}
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
                      disabled={!isEdit}
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
                      disabled={!isEdit}
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
                      disabled={!isEdit}
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
                      disabled={!isEdit}
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
                      disabled={!isEdit}
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
                      onChange={handleChange}
                      disabled={!isEdit}
                    ></textarea>
                  </div>
                </div>
                <div
                  style={{
                    width: "1500px",
                    marginLeft: "10px",
                    marginRight: "20px",
                    marginTop: "10px",
                  }}
                >
                  <div className="">
                    <label htmlFor="image">Image:</label>
                    {imagePreview ? (
                      <div className="image-preview-container">
                        <img
                          src={imagePreview}
                          alt="Image Preview"
                          className="image-preview"
                        />
                        <button
                          type="button"
                          className="delete-image-button"
                          disabled={!isEdit}
                          onClick={handleImageDelete}
                        >
                          &#x2715; {/* Unicode for "X" symbol */}
                        </button>
                      </div>
                    ) : (
                      <ImageUploadButton
                        className="fileinputcontainer-2"
                        handleImageChange={handleImageChange}
                      />
                    )}
                  </div>
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
