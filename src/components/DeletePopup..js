// Popup.js
import React, { useState } from "react";
import "./Popup.css"; // Import your CSS file for styling
import { toast } from "react-toastify";
import { verifyWorkshop } from "Apis/Workshop";
import { useHistory } from "react-router";
import { verifyProvider } from "Apis/NewSubscription";

const DeletePopup = ({ isOpen, onClose, cb,text, heading }) => {
  const history = useHistory();
  const [reason, setReason] = useState("");

  if (!isOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    cb(true)

  };
  return (
    <div className="popup">
      <div className="popup-content" style={{height:'200px'}}>
        <div style={{ width: "100%", paddingLeft: "17px" }}>
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <div>
            <p className="reject_text">{heading}</p>
            <p className="reject_text_2">
             {text}
            </p>
          </div>
        </div>
        <div className="d-flex mb-2" style={{ width: "95%", justifyContent:'end'}}>
          <button className="rejectbtn mr-1" onClick={onClose}>Cancel</button>
          <button className="addaccountBtn" onClick={handleSubmit}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
