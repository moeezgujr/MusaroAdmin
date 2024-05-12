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
import SupportList from "./SupportList";
import Header from "./TableHeader";
import NoAccountsFound from "./NoDataFound";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Support = () => {
  const history =useHistory()
  const flag = true;
  return (
    <>
      <Container fluid>
        <Row>
        <Header filter hideButton btntext={'Add Account'} title={'Support & Help'} onAddAccount={()=> history.push('/admin/adduser') } />
          {flag ? <SupportList />:<NoAccountsFound/>}</Row>
      </Container>
    </>
  );
};

export default Support;
