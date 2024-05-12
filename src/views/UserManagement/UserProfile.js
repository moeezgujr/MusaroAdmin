import React, { useState } from "react";
import "../ContentManagement/Professionform.css"; // Import your CSS file for styling
import { Dropdown, Form } from "react-bootstrap";
// import ImageUploadButton from "components/ImageUploader/Imageuploader";
import Select from "react-select";

const User = ({ goBack }) => {
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
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <div className="form-container">
        {/* <button className="go-back-button" onClick={goBack}>
          Go Back
        </button> */}
        <form onSubmit={handleSubmit} className="form">
          <div style={styles.container}>
            <div style={styles.title}>{"Add Account"}</div>
            <div style={styles.container2}>
              <div style={styles.cancelButton}>
                <button
                  className="cancelbtn mr-1"
                  onClick={() => window.history.back()}
                >
                  {"Cancel"}
                </button>
              </div>
              <div style={styles.addButton}>
                <button className="addaccountBtn">{"Add Account"}</button>
              </div>
            </div>
          </div>
          <div className="mt-3 ml-2">
            <div className="form-group">
              <label htmlFor="title">Name*</label>
              <input
                type="text"
                className="profession-input-title"
                placeholder="Name"
                id="title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Email*</label>
              <input
                type="text"
                className="profession-input-title"
                placeholder="Email"
                id="title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Password*</label>
              <input
                type="password"
                className="profession-input-title"
                placeholder="Password"
                id="title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Confirm Password*</label>
              <input
                type="password"
                className="profession-input-title"
                placeholder="Confirm Password"
                id="title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Choose Role</label>
              <div className="d-flex row " style={{ marginLeft: "2px" }}>
                <Select styles={colourStyles} options={options} />
              </div>
            </div>

            <div className="d-flex justify-content-between" style={{width:'610px'}}>
              <p className="permission-heading">Permissions</p>{" "}
              <div>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                  className="mr-1"
                />
                <label for="vehicle1">Select All</label>
              </div>
            </div>
            <div className="d-flex-column">
              <div className="mb-1">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                  className="mr-1"
                />
                <label for="vehicle1">Permission 1</label>
              </div>
              <div className="mb-1">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                  className="mr-1"
                />
                <label for="vehicle1">Permission 2</label>
              </div>
              <div className="mb-1">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                  className="mr-1"
                />
                <label for="vehicle1">Permission 3</label>
              </div>
              <div className="mb-1">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                  className="mr-1"
                />
                <label for="vehicle1">Permission 4</label>
              </div>
            </div>

            <br />
          </div>
        </form>
      </div>
    </>
  );
};
const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    width: "610px",
    height: "45px",
  }),
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
export default User;
