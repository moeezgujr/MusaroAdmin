import React, { useEffect, useState } from "react";
import "./Professionform.css"; // Import your CSS file for styling
import ImageUploadButton from "components/ImageUploader/Imageuploader";
import { useHistory, useParams } from "react-router";
import { getProfessionsbyId } from "Apis/Profession";
import { addProfession } from "Apis/Profession";
import { updateProfession } from "Apis/Profession";
import { toast } from "react-toastify";

const ProfessionFormComponent = ({ goBack }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage button loading

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e);
    setImagePreview(URL.createObjectURL(e));
  };
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return; // Prevent further API calls while loading is true
    
    setLoading(true); // Disable button
    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", description);
    
    if (id) {
      if (image) {
        formData.append("img", image);
      }
      const res = await updateProfession(id, formData);
      if (res?.message === "Success") {
        toast.success("Profession updated successfully");
      } else {
        toast.error("An error occurred while updating data");
      }
    } else {
      formData.append("img", image);
      const res = await addProfession(formData);
      if (res?.message === "New Profession Added!") {
        toast.success("Profession added successfully");
      } else {
        toast.error("An error occurred while adding data");
      }
    }

    // After API call, navigate back to the content page
    history.push("/admin/content");

    // Re-enable button after 30 seconds
    setTimeout(() => {
      setLoading(false);
    }, 30000); // 30 seconds
  };

  const { id } = useParams();
  const fetchProfession = async (id) => {
    const data = await getProfessionsbyId(id);
    setDescription(data.data.description);
    setTitle(data.data.name);
    setImagePreview(process.env.REACT_APP_IMAGE_SRC + data.data.img);
  };
  
  const handleImageDelete = () => {
    setImage(null);
    setImagePreview(null);
  };

  useEffect(() => {
    if (id) fetchProfession(id);
  }, [id]);

  return (
    <>
      <div className="form-container" style={{ height: "100vh" }}>
        <form onSubmit={handleSubmit} className="form">
          <div style={styles.container}>
            <div style={styles.title}>{id ? "Edit Profession" : "Add Profession"}</div>
            <div style={styles.container2}>
              <div style={styles.cancelButton}>
                <button
                  type="button"
                  className="cancelbtn mr-1"
                  onClick={() => history.push("/admin/content")}
                >
                  Cancel
                </button>
              </div>
              <div style={styles.addButton}>
                <button className="addaccountBtn" disabled={loading}>
                {loading ? "Please wait..." : "Save Changes"}
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

export default ProfessionFormComponent;
