import React from 'react';
import './PrivacyPolicyAppArabic.css'; // Make sure to create a CSS file for styling
import { ReactComponent as ArabicPrivacyPolicy } from "../../assets/img/Blog post page header.svg";

const PrivacyPolicyAppArabic = () => {
  return (
    // <div className="privacy-policy-container" style={{ background: 'white' }}>
<ArabicPrivacyPolicy className="responsive-svg" style={{ fontSize: '24px' }} />
  // </div>
  );
};

export default PrivacyPolicyAppArabic;
