import React, { useState } from "react";

const OTPInput = () => {
  const [otpValue, setOtpValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.slice(0, 4);
    setOtpValue(value);
  };

  return (
    <input
      className="input___otp"
      maxLength="4"
      value={otpValue}
      onChange={handleChange}
    />
  );
};

export default OTPInput;
