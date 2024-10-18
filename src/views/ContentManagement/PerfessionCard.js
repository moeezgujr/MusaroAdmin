import React from "react";
import "./Card.css"; // Import your CSS file for styling
import { ReactComponent as Penicon } from "../../assets/img/pen.svg";
import { ReactComponent as DeleteIcon } from "../../assets/img/delete.svg";

const ProfessionCard = ({ imageUrl, paragraph, title, handleTabClick, id, createdOn }) => {
  return (
    <div className="profession-card">
      <img src={imageUrl} alt="Card" className="card-image" />
      <div className="card-content" style={{ width: "100%" }}>
        <div className="d-flex justify-content-between">
          <div className="d-flex-col">
            <p className="text-profession-title">{title}</p>
            <p className="card-date mt-1">Created on :{createdOn.split("T")[0].replaceAll('-','/')}</p>
          </div>
          <div className="d-flex">
          <div className="tab-1 tab edit-btn" onClick={() => handleTabClick(id)}>
            <Penicon /> 
          </div>
          <div className="tab-1 tab edit-btn" onClick={() => handleTabClick(id, 'delete')}>
            <DeleteIcon /> 
          </div>{" "}
          </div>
       
        </div>
        <p className="mt-3 paragrahph-text">{paragraph}</p>
      </div>
    </div>
  );
};

export default ProfessionCard;
