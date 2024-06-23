// Popup.js
import React, { useState } from "react";
import "./Popup.css"; // Import your CSS file for styling

const Popup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [reason, setReason] = useState("");
  return (
    <div className="popup">
      <div className="popup-content">
        <div style={{ width: "100%", paddingLeft: "17px" }}>
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <div>
            <p className="reject_text">Reject with Note</p>
            <p className="reject_text_2">
              Write a reason why are you rejected this workshop creation
            </p>
          </div>
        </div>

        <div
          className="form-group"
          style={{ width: "100%", marginLeft: "30px", marginBottom:0 }}
        >
          <label htmlFor="description">Reason:</label>
          <textarea
            id="Reason"
            className="profession-input-textarea"
            value={reason}
          ></textarea>
        </div>
        <div className="d-flex mb-2" style={{width:'95%'}}> 
          <button className="rejectbtn mr-1 w-50">
            Cancel
          </button>
          <button className="addaccountBtn w-50">{"Send"}</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
