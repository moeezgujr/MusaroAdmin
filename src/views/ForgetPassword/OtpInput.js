import React, { useState } from "react";

const OTPInput = ({onChange}) => {
  const [otpValue, setOtpValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.slice(0, 5);
    setOtpValue(value);
    onChange(value);
  };

  return (
    <input
      className="input___otp"
      maxLength="5"
      value={otpValue}
      onChange={handleChange}
    />
  );
};

export default OTPInput;
