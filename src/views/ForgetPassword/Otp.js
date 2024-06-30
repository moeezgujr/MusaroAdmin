import React, { useState, useEffect } from "react";
import "./style.css"; // Ensure to import your CSS file
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import OTPInput from "./OtpInput";
import { verifyOtp } from "Apis/Auth";
import { toast } from "react-toastify";
import { forgetPassword } from "Apis/Auth";

function Otp() {
  const [otp, setOtp] = useState("");
  const [resendEnabled, setResendEnabled] = useState(true);
  const [timer, setTimer] = useState(0);
  const { mobile } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0 && !resendEnabled) {
      setResendEnabled(true);
    }
  }, [timer]);

  const onChange = (value) => {
    setOtp(value);
  };

  const handleOtp = async () => {
    const res = await verifyOtp({ otpCode: otp, mobile });
    if (res.errors === null) {
      toast.success(res.message);
      history.push("/createpassword/" + mobile);
    }
  };

  const handleResendOtp = async () => {
    const res = await forgetPassword({ mobile });
    if (res.errors === null) {
      toast.success("OTP has been resent");
      setResendEnabled(false);
      setTimer(60); // Start timer
    }
  };

  return (
    <div className="forgetpasswordcontainer">
      <div className="">
        <p className="password-heading">Confirm your Mobile Number</p>
        <p className="password-subheading">
          An SMS containing a One-Time password (OTP) has been sent to your
          registered mobile number.
        </p>
        <div className="mt-3">
          <OTPInput onChange={onChange} />
        </div>
        <div>
          <Button
            variant="primary"
            className="login-btn-submit mt-3"
            onClick={handleOtp}
            block
          >
            Verify
          </Button>
          <p className="otp_recieve_text mt-2">
            Didn’t receive OTP?
            <span
              onClick={resendEnabled ? handleResendOtp : null}
              style={{
                cursor: resendEnabled ? "pointer" : "default",
                color: resendEnabled ? "blue" : "gray",
              }}
            >
              {resendEnabled ? " Resend" : ` Resend after (${timer}s)`}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Otp;
