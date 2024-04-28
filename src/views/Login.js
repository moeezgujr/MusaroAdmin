import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Login() {
  const history=useHistory()
  const gotodashboard=()=>{
    history.push('/admin/dashboard')
  }
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col md={6}>
            <div className="login-intro-text"></div>

            <Form className="loginform" onSubmit={()=>gotodashboard()}>
              <img
                className="img-logo"
                src="data:image/png;base64,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"
              />
              <h2 className="text-center mb-4">Welcome back</h2>
              <p className="text-center login-text-2">
                Please enter your details to sign you in
              </p>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username or Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your email or username"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Row className="align-items-center">
                <Col xs={6}></Col>
                <Col xs={6} className="forgot-password">
                  <a href="#forgot-password" style={{color:"#cba640"}}>Forgot password?</a>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col xs={6}>
                  <Button
                    variant="primary"
                    className="login-btn-submit "
                    type="submit"
                    block
                  >
                    Sign in
                  </Button>
                </Col>
              </Row>
             
            </Form>
          </Col>
          <Col md={6} className="image-section"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
