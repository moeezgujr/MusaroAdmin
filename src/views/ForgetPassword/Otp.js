import React, { useState } from "react";
import "./style.css"; // Ensure to import your CSS file
import { Button, Form } from "react-bootstrap";
import MobileNumberInput from "./MobileNumberInput";
import { useHistory, useParams } from "react-router";
import OTPInput from "./OtpInput";
import { verifyOtp } from "Apis/Auth";
import { toast } from "react-toastify";

function Otp() {
  const [otp, setOtp] = useState("");
  const { mobile } = useParams();
  const onChange = (value) => {
    setOtp(value);
  };
  const history = useHistory();

  const handleOtp = async () => {
    const res = await verifyOtp({ otpCode: otp, mobile });
    if (res.errors === null) {
      toast.success(res.message);
      history.push("/createpassword/" + mobile);
    }
  };
  return (
    <div className="forgetpasswordcontainer">
      <div className="">
        <p className="password-heading">Confirm your Mobile Number</p>
        <p className="password-subheading">
          An sms containing a One-Time password (OTP) has been sent to your
          registered mobile number.
        </p>
        <div className="mt-3">
          <OTPInput onChange={onChange} />
        </div>
        <div>
          <Button
            variant="primary"
            className="login-btn-submit mt-3 "
            onClick={() => handleOtp()}
            block
          >
            Verify
          </Button>
          <p className="otp_recieve_text mt-2">
            Didn’t received OTP ? <b>Resend</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Otp;
