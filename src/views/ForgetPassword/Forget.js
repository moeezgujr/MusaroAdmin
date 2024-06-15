import React, { useState } from "react";
import "./style.css"; // Ensure to import your CSS file
import { Button, Form } from "react-bootstrap";
import MobileNumberInput from "./MobileNumberInput";
import { useHistory } from "react-router";

function Forget() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  return (
    <div className="forgetpasswordcontainer">
      <div className="">
        <p className="password-heading">Forgot Password</p>
        <p className="password-subheading">
          Please enter your mobile number to create new password{" "}
        </p>
        <div className="mt-3">
          <MobileNumberInput />
        </div>
        <div>
          <Button
            variant="primary"
            className="login-btn-submit mt-3 "
            onClick={() => history.push("/otp")}
            block
          >
            Send Otp
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Forget;
