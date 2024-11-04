import React, { useEffect, useState } from "react";
import "./Professionform.css";
import ImageUploadButton from "components/ImageUploader/Imageuploader";
import { useHistory, useParams } from "react-router";
import { getProfessionsbyId } from "Apis/Profession";
import { addProfession } from "Apis/Profession";
import { updateProfession } from "Apis/Profession";
import { toast } from "react-toastify";

const ProfessionFormComponent = ({ goBack }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleArabic, setTitleArabic] = useState("");
  const [descriptionArabic, setDescriptionArabic] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage button loading

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTitleArabicChange = (e) => {
    setTitleArabic(e.target.value);
  };

  const handleDescriptionArabicChange = (e) => {
    setDescriptionArabic(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e);
    setImagePreview(URL.createObjectURL(e));
  };

  const history = useHistory();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", description);
    formData.append("name_arabic", titleArabic);
    formData.append("description_arabic", descriptionArabic);
    
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

    history.push("/admin/content");
    
    setTimeout(() => {
      setLoading(false);
    }, 30000);
  };

  const { id } = useParams();
  
  const fetchProfession = async (id) => {
    const data = await getProfessionsbyId(id);
    setTitle(data.data.name);
    setDescription(data.data.description);
    setTitleArabic(data.data.name_arabic || "");
    setDescriptionArabic(data.data.description_arabic || "");
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
          <div className="mt-3 ml-2 form-fields-container" style={{width:'100%'}}>
            <div className="d-flex row">
              <div className="form-group" style={{marginLeft:'15px', marginRight:'15px'}}>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  className="profession-input-title-2"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title-arabic" style={{ textAlign: "right" }}>:العنوان</label>
                <input
                  type="text"
                  className="profession-input-title-2"
                  style={{width:'550px'}}
                  id="title-arabic"
                  dir="rtl"
                  value={titleArabic}
                  onChange={handleTitleArabicChange}
                />
              </div>
            </div>
            <div className="d-flex row">
              <div className="form-group" style={{marginLeft:'15px', marginRight:'15px'}}>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  className="profession-input-textarea-2"
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>
              <div className="form-group" style={{marginRight:'15px'}}>
                <label htmlFor="description-arabic" style={{ textAlign: "right" }}>:الوصف</label>
                <textarea
                  id="description-arabic"
                  className="profession-input-textarea-2"
                  dir="rtl"
                  value={descriptionArabic}
                  onChange={handleDescriptionArabicChange}
                ></textarea>
              </div>
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
                    &#x2715;
                  </button>
                </div>
              ) : (
                <ImageUploadButton className="fileinputcontainer-2" handleImageChange={handleImageChange} />
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
