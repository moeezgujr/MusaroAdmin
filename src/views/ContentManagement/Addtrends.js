import React, { useEffect, useState } from "react";
import "./Professionform.css"; // Import your CSS file for styling
import ImageUploadButton from "components/ImageUploader/Imageuploader";
import { addTrend } from "Apis/Trend";
import { useHistory, useParams } from "react-router";
import { getTrendByID } from "Apis/Trend";
import { updateTrend } from "Apis/Trend";
import { toast } from "react-toastify";

const TrendFormComponent = ({ goBack }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const { id } = useParams();
  const fetchTrend = async (id) => {
    const data = await getTrendByID(id);
    setDescription(data.data.description);
    setTitle(data.data.title);
    setImagePreview(process.env.REACT_APP_IMAGE_SRC + data.data.img);
    // setImage(data.data.description)
  };
  useEffect(() => {
    if (id) {
      fetchTrend(id);
    }
  }, [id]);
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e);
    setImagePreview(URL.createObjectURL(e));
  };
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (id) {
      if (image) {
        formData.append("img", image);
      }
      updateTrend(id, formData);
      toast.success("Trend Updated sucessfully");
    } else {
      formData.append("img", image);
      addTrend(formData);
      toast.success("Trend added sucessfully");
    }
    history.push("/admin/content");
  };
  return (
    <>
      <div className="form-container" style={{ height: "100vh" }}>
        {/* <button className="go-back-button" onClick={goBack}>
          Go Back
        </button> */}
        <form onSubmit={handleSubmit} className="form">
          <div style={styles.container}>
            <div style={styles.title}>{id ? "Edit Trend" : "Add Trend"}</div>
            <div style={styles.container2}>
              <div style={styles.cancelButton}>
                <button
                  className="cancelbtn mr-1"
                  onClick={() => history.push("/admin/content")}
                >
                  {"Cancel"}
                </button>
              </div>
              <div style={styles.addButton}>
                <button className="addaccountBtn">
                  {id ? "Edit Trend" : "Add Trend"}
                </button>
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

export default TrendFormComponent;
