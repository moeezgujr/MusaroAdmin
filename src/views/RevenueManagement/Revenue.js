import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
  Dropdown,
} from "react-bootstrap";
import { ReactComponent as Usericon } from "../../assets/img/3 User.svg";
import { ReactComponent as Charticon } from "../../assets/img/chart-line.svg";
import { ReactComponent as Checkcricleicon } from "../../assets/img/check-circle.svg";
import { ReactComponent as Vectoricon } from "../../assets/img/Vector.svg";
import TicketTable from "./RevenueTable";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { totalCountApi } from "Apis/Dashboard";

function Revenue() {
  const [totalCount, setTotalCount] = useState('');
  const [tab, setTab] = useState(1);

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const data = await totalCountApi();
        setTotalCount(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTotalCount();
  }, []);
  
  const handleTab = (e) => {
    setTab(e);
  };

  return (
    <>
      <Container fluid>
        <p className="dashboard-title">Subscription & Revenue</p>
        <Row>
          <Col lg="4" sm="6">
            <Card className="card-stats" style={{ height: "80%" }}>
              <Card.Body>
                <Row>
                  <Col xs="12">
                    <div className="d-flex card-content-dashboard">
                      <div className="usericoncontainer mt-1">
                        <Usericon />
                      </div>
                      <div className="ml-2">
                        <Card.Title as="h4">
                          {totalCount ? totalCount.overallCustomerCount : <Skeleton width={120} />}
                        </Card.Title>
                        <p className="card-category">Overall Customers</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats h-1/2" style={{ height: "80%" }}>
              <Card.Body>
                <Row>
                  <Col xs="12">
                    <div className="d-flex card-content-dashboard">
                      <div
                        className="usericoncontainer mt-1"
                        style={{ background: "#FFFBEB" }}
                      >
                        <Checkcricleicon />
                      </div>
                      <div className="ml-2">
                        <Card.Title as="h4">
                          {totalCount ? totalCount.overallSubscriptionCount ||0 : <Skeleton width={80} />}

                        </Card.Title>

                        <p className="card-category">Overall Subscriptions</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats h-1/2" style={{ height: "80%" }}>
              <Card.Body>
                <Row>
                  <Col xs="12">
                    <div className="d-flex card-content-dashboard">
                      <div
                        className="usericoncontainer mt-1"
                        style={{ background: "#FEF1F1" }}
                      >
                        <Vectoricon />
                      </div>
                      <div className="ml-2">
                        <Card.Title as="h4">
                        {totalCount ? totalCount.cancelSubscriptionCount ||0 : <Skeleton width={80} />}

                        </Card.Title>

                        <p className="card-category">Cancelled Subscriptions</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <div className="container mb-3">
            <div className="buttons-container">
              <button
                className={`revenue-button ${tab === 1 ? "active" : ""}`}
                onClick={() => handleTab(1)}
              >
                Active Subscriptions
              </button>

              <button
                className={`revenue-button ${tab === 2 ? "active" : ""}`}
                onClick={() => handleTab(2)}
              >
                Canceled Subscriptions
              </button>
            </div>
           
          </div>
        </Row>
        <Row className="mb-5">
          <p className="cancel-subscription-text">Cancel Subscription</p>
          <TicketTable tab={tab} />
        </Row>

      </Container>
    </>
  );
}

export default Revenue;
