import React, { useEffect, useState } from "react";
import "./Professionform.css"; // Import your CSS file for styling
import ImageUploadButton from "components/ImageUploader/Imageuploader";
import { useParams } from "react-router";
import { getProfessionsbyId } from "Apis/Profession";
import { addProfession } from "Apis/Profession";

const ProfessionFormComponent = ({ goBack }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {debugger
    // const file = e.target.files[0];
    setImage(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description ", description);
    debugger
    formData.append("img ", image);
    addProfession(formData);
  };
  const { id } = useParams();
  const fetchProfession = async (id) => {
    const data = await getProfessionsbyId(id);
    setDescription(data.data.description);
    setTitle(data.data.name);
    setImagePreview(process.env.REACT_APP_IMAGE_SRC + data.data.img);
    // setImage(data.data.description)
  };
  useEffect(() => {
    if (id) fetchProfession(id);
  }, [id]);
  return (
    <>
      <div className="form-container" style={{ height: "100vh" }}>
        {/* <button className="go-back-button" onClick={goBack}>
          Go Back
        </button> */}
        <form onSubmit={handleSubmit} className="form">
          <div style={styles.container}>
            <div style={styles.title}>{"Add Profession"}</div>
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
                <button className="addaccountBtn">{"Add Profession"}</button>
              </div>
            </div>
          </div>
          <div className="mt-3 ml-2 form-fields-container">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                className="profession-input-title"
                id="title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                className="profession-input-textarea"
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="image">Image:</label>
              {/* <input type="file" id="image"  className="fileinputcontainer" onChange={handleImageChange} /> */}
              <ImageUploadButton handleImageChange={handleImageChange} />
              {imagePreview && (
                <div className="image-preview">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    style={{
                      width: "150px",
                      height: "150px",
                      marginTop: "10px",
                    }}
                  />
                </div>
              )}
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
export default ProfessionFormComponent;
