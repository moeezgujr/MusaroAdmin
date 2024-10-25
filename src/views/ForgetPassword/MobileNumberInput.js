import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "IN" },
  // Add more country codes as needed
];

const MobileNumberInput = ({ onChange, val }) => {
  const [selectedCode, setSelectedCode] = useState(countryCodes[0].code);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCodeChange = (code) => {
    setSelectedCode(code);
  };
  useEffect(() => {
    if (val) {
      setPhoneNumber(val);
    }
  }, [val]);
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <PhoneInput
      inputStyle={{ width: "100%" }}
      country={"sa"}
      value={phoneNumber}
      onChange={(phone) => onChange(phone)}
    />
  );
};

export default MobileNumberInput;
