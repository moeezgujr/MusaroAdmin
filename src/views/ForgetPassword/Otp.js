import React, { useState } from "react";
import "./style.css"; // Ensure to import your CSS file
import { Button, Form } from "react-bootstrap";
import MobileNumberInput from "./MobileNumberInput";
import { useHistory } from "react-router";
import OTPInput from "./OtpInput";

function Otp() {
  const history = useHistory();
  return (
    <div className="forgetpasswordcontainer">
      <div className="">
        <p className="password-heading">Confirm your Mobile Number</p>
        <p className="password-subheading">
        An sms containing a One-Time password (OTP) has been sent to your registered mobile number.
        </p>
        <div className="mt-3">
          <OTPInput />
        </div>
        <div>
          <Button
            variant="primary"
            className="login-btn-submit mt-3 "
            onClick={() => history.push("/forgetpassword")}
            block
          >
            Verify
          </Button>
          <p className="otp_recieve_text mt-2">Didn’t received OTP ? <b>Resend</b></p>
        </div>
      </div>
    </div>
  );
}

export default Otp;
