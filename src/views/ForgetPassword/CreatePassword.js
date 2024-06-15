import React, { useState } from "react";
import "./style.css"; // Ensure to import your CSS file
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";

function CreatePassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  return (
    <div className="forgetpasswordcontainer" style={{height:'450px'}}>
      <div className="">
        <p className="password-heading">Create New Password</p>
        <p className="password-subheading">Enter your new password</p>
        <div className="mt-3">
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Enter New Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <p className="mt-1 instruction-password">Must be at least 8 characters.</p>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm New Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </div>
        <div>
          <Button
            variant="primary"
            className="login-btn-submit mt-3 "
            onClick={() => history.push("/otp")}
            block
          >
            Create Password
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreatePassword;
