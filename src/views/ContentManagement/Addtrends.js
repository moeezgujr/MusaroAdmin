import React, { useEffect, useState } from "react";
import "./Professionform.css"; // Import your CSS file for styling
import ImageUploadButton from "components/ImageUploader/Imageuploader";
import { addTrend, getTrendByID, updateTrend } from "Apis/Trend";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import Editor from "./Editor";

const TrendFormComponent = ({ goBack }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fields, setFields] = useState([]); // Initialize fields as an empty array
  const [loading, setLoading] = useState(false); // State to manage button loading

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const { id } = useParams();
  const history = useHistory();

  const fetchTrend = async (id) => {
    const data = await getTrendByID(id);
    setDescription(data.data.description.replaceAll("/temp/", "/trends/"));
    setTitle(data.data.title);
    setImagePreview(process.env.REACT_APP_IMAGE_SRC + data.data.img);
  };

  useEffect(() => {
    if (id) {
      fetchTrend(id);
    }
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e);
    setImagePreview(URL.createObjectURL(e));
  };

  const handleImageDelete = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent further submissions while loading is true
    
    setLoading(true); // Disable button

    const formData = new FormData();
    formData.append("title", title);
    if (fields.length > 0) {
      formData.append("fileIds", fields.toString());
    }
    formData.append("description", description);

    if (id) {
      if (image) {
        formData.append("img", image);
      }
      const res = await updateTrend(id, formData);
      if (res.errors === null) toast.success("Trend Updated successfully");
      else toast.error("An error occurred");
    } else {
      formData.append("img", image);
      const res = await addTrend(formData);
      if (res.errors === null) toast.success("Trend added successfully");
      else toast.error("An error occurred");
    }

    // Re-enable button after 30 seconds
    setTimeout(() => {
      setLoading(false);
    }, 30000); // 30 seconds

    history.push("/admin/content");
  };

  const cb = (id) => {
    setFields((prevFields) => [...prevFields, id]); // Correctly append to the array
  };

  return (
    <>
      <div className="form-container" style={{ height: "1000px" }}>
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
                <button className="addaccountBtn" disabled={loading}>
                  {loading ? "Please wait..." : id ? "Edit Trend" : "Add Trend"}
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
            <div className="form-group" style={{ width: "100%" }}>
              <label htmlFor="description">Description:</label>
              <Editor value={description} cb={cb} setValue={setDescription} />
            </div>
            <div className="form-group">
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
                    onClick={handleImageDelete}
                  >
                    &#x2715; {/* Unicode for "X" symbol */}
                  </button>
                </div>
              ) : (
                <ImageUploadButton handleImageChange={handleImageChange} />
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
  addButton: {
    marginLeft: "auto",
  },
};

export default TrendFormComponent;
