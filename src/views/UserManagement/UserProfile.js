import React, { useState } from "react";
import "../ContentManagement/Professionform.css"; // Import your CSS file for styling
// import ImageUploadButton from "components/ImageUploader/Imageuploader";

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
                <button className="cancelbtn mr-1" onClick={()=>window.history.back()}>{"Cancel"}</button>
              </div>
              <div style={styles.addButton}>
                <button className="addaccountBtn">{"Add Account"}</button>
              </div>
            </div>
          </div>
          <div className="mt-3 ml-2 form-fields-container">
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
           
          </div>
          
        </form>
      </div>
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
export default User;
