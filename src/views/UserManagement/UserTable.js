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
import UserList from "./UserList";
import Header from "./TableHeader";
import NoAccountsFound from "./NoDataFound";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UserTable = () => {
  const history = useHistory();
  const flag = true;

  return (
    <>
      <Container fluid>
        <Row>
          
          {flag ? <UserList /> : <NoAccountsFound />}
        </Row>
      </Container>
    </>
  );
};

export default UserTable;
