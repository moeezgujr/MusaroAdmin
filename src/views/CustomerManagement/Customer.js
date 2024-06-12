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
import Header from "../UserManagement/TableHeader";
import NoAccountsFound from "../UserManagement/NoDataFound";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CustomerList from "./CustomerList";

const Customer = () => {
  const history =useHistory()
  const flag = true;
  return (
    <>
      <Container fluid>
        <Row>
          {flag ? <CustomerList />:<NoAccountsFound/>}</Row>
      </Container>
    </>
  );
};

export default Customer;
