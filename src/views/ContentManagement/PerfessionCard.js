import React from "react";
import "./Card.css"; // Import your CSS file for styling
import { ReactComponent as Penicon } from "../../assets/img/pen.svg";

const ProfessionCard = ({ imageUrl, paragraph , title}) => {
  return (
    <div className="profession-card">
      <img
        src={
          "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTeIgc3y9aRZ2jBOJpXNxHHtehdoh1b5jMZDHZQ4CnyOzw7XC8MA4WI_MQ38uJYlY13"
        }
        alt="Card"
        className="card-image"
      />
      <div className="card-content">
        <div className="d-flex justify-content-between">
          <div className="d-flex-col">
            <p className="text-profession-title">{title}</p>
            <p className="card-date">Created on : 11/05/2023 </p>
          </div>
          <div className="tab-1 tab edit-btn" onClick={() => handleTabClick(1)}>
           <Penicon/> Edit
          </div>{" "}
        </div>
        <p className="mt-3 paragrahph-text">
          {
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as"
          }
        </p>
      </div>
    </div>
  );
};

export default ProfessionCard;
