import React, { useState } from "react";
import "./style.css"; // Ensure to import your CSS file
import { Button, Form } from "react-bootstrap";
import MobileNumberInput from "./MobileNumberInput";
import { useHistory } from "react-router";
import { forgetPassword } from "Apis/Auth";
import { toast } from "react-toastify";

function Forget() {
  const [number, setNumber] = useState("");
  const onSubmit = async () => {
    const response = await forgetPassword({ mobile: number });
    console.log(response);
    if (response.errors === null) {
      toast.success(response.message)
      history.push("/otp/"+number);
    }
  };
  const callback = (value) => {
    setNumber(value);
  };
  const history = useHistory();
  return (
    <div className="forgetpasswordcontainer">
      <div className="">
        <p className="password-heading">Forgot Password</p>
        <p className="password-subheading">
          Please enter your mobile number to create new password{" "}
        </p>
        <div className="mt-3">
          <MobileNumberInput onChange={callback} />
        </div>
        <div>
          <Button
            variant="primary"
            className="login-btn-submit mt-3 "
            onClick={() => onSubmit()}
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
