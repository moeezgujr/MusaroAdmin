import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Tabs from "./ContentTabs";

const ContentView = () => {
  const flag = true;
  return (
    <>
      <Container fluid>
        <Row>
          <Tabs/>
        </Row>
      </Container>
    </>
  );
};

export default ContentView;
