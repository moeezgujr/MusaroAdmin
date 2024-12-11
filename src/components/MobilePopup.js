import React, { useState } from "react";
import "./App.css"; // Create an App.css for styles

function MobilePopup() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div className="mobile_app">
      <button onClick={togglePopup}>
        {isPopupVisible ? "Close Mobile View" : "Show Mobile View"}
      </button>
      {isPopupVisible && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="mobile-view" onClick={(e) => e.stopPropagation()}>
            <h3>Mobile View</h3>
            <p>This is a simulated mobile view popup in React.</p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobilePopup;