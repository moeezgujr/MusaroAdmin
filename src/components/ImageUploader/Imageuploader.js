import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import "./ImageUploadButton.css"; // Import your CSS file

const ImageUploadButton = (props) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      props.handleImageChange(file);
      // You can add more file handling logic here
    }
  };

  return (
    <div
      className={props.className || "fileinputcontainer"}
      onClick={handleClick}
    >
      {/* <Button variant="primary" onClick={handleClick}> */}
      <div className="icon-container">
        <i class="fas fa-cloud-upload-alt"></i>
      </div>
      <p className="uploadtext">Click to upload</p>
      <p className="subtypetext">PNG, JPG (max. size 5MB)</p>
      {/* </Button> */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploadButton;
