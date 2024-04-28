import React from "react";
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
// import Header from "views/UserManagement/TableHeader";
// import TicketTable from "./RevenueTable";

function AnalyticsReport() {
  return (
    <>
      <Container fluid>
        <p className="dashboard-title">Analytics & Reporting</p>
        {/* <Row>
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
                        <Card.Title as="h4">02</Card.Title>

                        <p className="card-category">Overall costumers</p>
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
                        <Card.Title as="h4">02</Card.Title>

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
                        <Card.Title as="h4">02</Card.Title>

                        <p className="card-category">Cancelled Subscriptions</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
        {/* <Row>
          <div className="container mb-3">
            <div className="buttons-container">
              <button className="revenue-button">All Subscriptions</button>
              <button className="revenue-button">Canceled Subscriptions</button>
              <button className="revenue-button">Active Subscriptions</button>
            </div>
            <div className="filter-container">
              <Dropdown >
                <Dropdown.Toggle id="dropdown-basic">Date</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Row> */}
        {/* <Row className="mb-5">
          <p className="cancel-subscription-text">Cancel Subscription</p>
          <TicketTable />
        </Row> */}
        {/* <Header Title/> */}
        <Row>
          {/* <Col md="6">
            <Card>
              <Card.Header>
                <div className="d-flex row justify-content-between">
                  <Card.Title as="h4" className="ml-3">
                  Subscription Revenue
                  </Card.Title>
                  <div className="d-flex row mr-3">
                    <Dropdown style={{ marginRight: "10px" }}>
                      <Dropdown.Toggle id="dropdown-basic">
                        Weekly
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      series: [
                        [
                          542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756,
                          895,
                        ],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col> */}
          <Col md="6">
            <Card>
              <Card.Header>
                <div className="d-flex row justify-content-between">
                  <Card.Title as="h4" className="ml-3">
                    Analytics
                  </Card.Title>
                  <div className="d-flex row mr-4">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        Monthly
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      series: [[23, 113, 67, 108, 190, 239, 307, 308]],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 400,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: false,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              {/* <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Click <i className="fas fa-circle text-warning"></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer> */}
            </Card>
          </Col>
          <Col md="3">
            <Row>
              <Card
                className="card-stats h-1/2"
                style={{
                  width: "100%",
                  height: "120px",
                  marginRight: "10px",
                  marginBottom: "12px",
                }}
              >
                {" "}
                <Card.Body>
                  <Row>
                    <Col xs="12">
                      <div className="d-flex card-content-dashboard">
                        <div
                          className="usericoncontainer mt-1"
                          // style={{ background: "#FFFBEB" }}
                        >
                          <Usericon />
                        </div>
                        <div className="ml-2">
                          <Card.Title as="h4">02</Card.Title>

                          <p className="card-category">Overall Subscriptions</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Card
                className="card-stats h-1/2"
                style={{
                  width: "100%",
                  height: "120px",
                  marginRight: "10px",
                  marginBottom: "12px",
                }}
              >
                {" "}
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
                          <Card.Title as="h4">02</Card.Title>

                          <p className="card-category">Overall Subscriptions</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Card
                className="card-stats h-1/2"
                style={{
                  width: "100%",
                  height: "120px",
                  marginRight: "10px",
                  marginBottom: "12px",
                }}
              >
                {" "}
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
                          <Card.Title as="h4">02</Card.Title>

                          <p className="card-category">Avg. Time spent </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          </Col>
          <Col md="3">
            <Row>
              <Card
                className="card-stats h-1/2"
                style={{
                  width: "100%",
                  height: "120px",
                  marginRight: "10px",
                  marginBottom: "12px",
                }}
              >
                {" "}
                <Card.Body>
                  <Row>
                    <Col xs="12">
                      <div className="d-flex card-content-dashboard">
                        <div
                          className="usericoncontainer mt-1"
                          // style={{ background: "#FFFBEB" }}
                        >
                          <Usericon />
                        </div>
                        <div className="ml-2">
                          <Card.Title as="h4">02</Card.Title>

                          <p className="card-category">Active costumers</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Card
                className="card-stats h-1/2"
                style={{
                  width: "100%",
                  height: "120px",
                  marginRight: "10px",
                  marginBottom: "12px",
                }}
              >
                {" "}
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
                          <Card.Title as="h4">02</Card.Title>

                          <p className="card-category">
                            Cancelled Subscriptions
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Card
                className="card-stats h-1/2"
                style={{
                  width: "100%",
                  height: "120px",
                  marginRight: "10px",
                  marginBottom: "12px",
                }}
              >
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
                          <Card.Title as="h4">02</Card.Title>

                          <p className="card-category">
                            Customer Acquisition Cost
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <div className="d-flex row justify-content-between">
                  <Card.Title as="h4" className="ml-3">
                    New Subscriptions
                  </Card.Title>
                  <div className="d-flex row mr-3">
                    <Dropdown style={{ marginRight: "10px" }}>
                      <Dropdown.Toggle id="dropdown-basic">
                        Weekly
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      series: [
                        [
                          542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756,
                          895,
                        ],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <div className="d-flex row justify-content-between">
                  <Card.Title as="h4" className="ml-3">
                    New Subscriptions
                  </Card.Title>
                  <div className="d-flex row mr-4">
                    <Dropdown style={{ marginRight: "10px" }}>
                      <Dropdown.Toggle id="dropdown-basic">
                        Monthly
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        By City
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "9:00AM",
                        "12:00AM",
                        "3:00PM",
                        "6:00PM",
                        "9:00PM",
                        "12:00PM",
                        "3:00AM",
                        "6:00AM",
                      ],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698, 695],
                        [67, 152, 143, 240, 287, 335, 435, 437],
                        [23, 113, 67, 108, 190, 239, 307, 308],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AnalyticsReport;
