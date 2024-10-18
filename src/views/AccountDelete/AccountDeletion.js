import React, { useState, useEffect } from "react";
import "./Accountdelete.css";
import { deleteUserFromPhone } from "Apis/User";
import { verifydeleteUserFromPhone } from "Apis/User";
import { toast } from "react-toastify";
import MobileNumberInput from "views/ForgetPassword/MobileNumberInput";

const AccountDeletion = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [timer, setTimer] = useState(0); // Timer for resend OTP

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval); // Clear timer when component unmounts or timer hits 0
  }, [timer]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    deleteUserFromPhone(phoneNumber).then((res) => {
      if (!res.errors) {
        setIsOtpSent(true);
        setTimer(30); // Set 30 seconds for resend OTP countdown
        setSuccessMessage("OTP sent to your phone number");
        setErrorMessage("");
        toast.info(res.message);
      } else {
        toast.info(res.message);
      }
    });
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    verifydeleteUserFromPhone({ otpCode: otp, mobile: phoneNumber }).then(
      (res) => {
        if (!res.errors) {
          setIsOtpVerified(true);
          setSuccessMessage("OTP verified successfully");
          setErrorMessage("");
          toast.info(res.message);
        } else {
          setErrorMessage("Invalid OTP. Please try again.");
          setSuccessMessage("");
          toast.info(res.message);
        }
      }
    );
  };

  return (
    <div className="form-component-container">
      <form onSubmit={handleOtpVerify}>
        <h2>Account Deletion</h2>

        <h3>Delete Account by Phone Number</h3>
        <p>Enter your phone number to request account deletion:</p>
        <div className="mt-3 mb-3">
          <MobileNumberInput onChange={(e) => setPhoneNumber(e)} />
        </div>

        {/* OTP Section */}
        {isOtpSent && !isOtpVerified && (
          <>
            <input
              type="text"
              className="form-component-input-otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6} // Assuming 6-digit OTP
            />
          </>
        )}

        {/* Success/Failure Messages */}
        {successMessage && (
          <div className="form-component-alert-message">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="form-component-error-message">{errorMessage}</div>
        )}

        {/* Show Timer on Screen */}
        {timer > 0 && (
          <div className="form-component-timer">
            You can resend OTP in {timer} seconds.
          </div>
        )}

        {/* Send OTP Button with Timer */}
        {!isOtpSent && (
          <button
            onClick={handlePhoneSubmit}
            className="form-component-button form-component-send-otp-btn"
            disabled={timer > 0} // Disable button if timer is still active
          >
            {timer > 0 ? `Resend OTP in ${timer}s` : "Send OTP"}{" "}
            {/* Show countdown */}
          </button>
        )}

        {/* Resend OTP Button (after initial OTP is sent) */}
        {isOtpSent && timer === 0 && !isOtpVerified && (
          <button
            onClick={handlePhoneSubmit}
            className="form-component-button form-component-resend-otp-btn"
          >
            Resend OTP
          </button>
        )}

        {/* Delete Account Button (Enabled only after OTP verification) */}
        <button
          type="submit"
          className="form-component-button form-component-delete-account-btn"
          disabled={!otp}
        >
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default AccountDeletion;
