import React, { useState } from "react";
import "./style.css"; // Ensure to import your CSS file
import { Button, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { createPassword } from "Apis/Auth";
import { toast } from "react-toastify";

function CreatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const { mobile } = useParams();
  const handleSubmit = async () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
      const res = await createPassword({ password, mobile });
      if (res.errors === null) {
        toast.success(res.message);
        history.push("/");
      }
    }
  };

  return (
    <div className="forgetpasswordcontainer" style={{ height: "450px" }}>
      <div className="">
        <p className="password-heading">Create New Password</p>
        <p className="password-subheading">Enter your new password</p>
        <div className="mt-3">
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Enter New Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <p className="mt-1 instruction-password">
            Must be at least 8 characters.
          </p>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm New Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div>
          <Button
            variant="primary"
            className="login-btn-submit mt-3"
            onClick={handleSubmit}
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
