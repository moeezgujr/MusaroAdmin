import React from "react";
import "./Card.css"; // Import your CSS file for styling
import { ReactComponent as Penicon } from "../../assets/img/pen.svg";

const ProfessionCard = ({ imageUrl, paragraph, title, handleTabClick, id }) => {
  return (
    <div className="profession-card">
      <img src={imageUrl} alt="Card" className="card-image" />
      <div className="card-content" style={{ width: "100%" }}>
        <div className="d-flex justify-content-between">
          <div className="d-flex-col">
            <p className="text-profession-title">{title}</p>
            <p className="card-date">Created on : 11/05/2023 </p>
          </div>
          <div className="tab-1 tab edit-btn" onClick={() => handleTabClick(id)}>
            <Penicon /> Edit
          </div>{" "}
        </div>
        <p className="mt-3 paragrahph-text">{paragraph}</p>
      </div>
    </div>
  );
};

export default ProfessionCard;
