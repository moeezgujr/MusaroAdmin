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
import SubscriptionList from "./SubscriptionList";

const Subscription = () => {
  const history =useHistory()
  const flag = true;
  return (
    <>
      <Container fluid>
        <Row>
        <Header hideButton btntext={'Add Account'} title={'New Subscriptions'} onAddAccount={()=> history.push('/admin/customermanagement') } />
          {flag ? <SubscriptionList />:<NoAccountsFound/>}</Row>
      </Container>
    </>
  );
};

export default Subscription;
