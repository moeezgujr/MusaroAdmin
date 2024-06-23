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
import { ReactComponent as ColorIcon } from "../../assets/img/Color.svg";
import { ReactComponent as SecondColoricon } from "../../assets/img/2nd-color.svg";
import { ReactComponent as Checkcricleicon } from "../../assets/img/check-circle.svg";
import { ReactComponent as Vectoricon } from "../../assets/img/Vector.svg";
import { totalCountApi } from "Apis/Dashboard";
import "./AnalyticsReport.css";
import { subscriptionCustomerGraph } from "Apis/Dashboard";
// import Header from "views/UserManagement/TableHeader";
// import TicketTable from "./RevenueTable";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function AnalyticsReport() {
  const [totalCount, setTotalCount] = useState({});
  const [cityA, setSelectedACity] = useState("Riyadh");
  const [cityB, setSelectedBCity] = useState("Makka");
  const [time, setTime] = useState("Monthly");
  const [graphtype, setGraphType] = useState("SUBSCRIPTION");
  const [graph1Data, setGraph1Data] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const data = await totalCountApi();
        setTotalCount(data.data);
      } catch (err) {
      } finally {
      }
    };

    fetchTotalCount();
    customerGraph(graphtype,time,cityA,cityB)
  }, []);
  const handleSelect = (e, type) => {
    if (type === "cityb") {
      setSelectedBCity(e);
      customerGraph(graphtype, time, cityA, e);
    } else {
      setSelectedACity(e);
      customerGraph(graphtype, time, e, cityB);
    }
  };
  const customerGraph = async (graphtype, time, cityA, cityB) => {
    setLoading(true);
    const data = await subscriptionCustomerGraph(graphtype, time, cityA, cityB);
    setGraph1Data(addMissingMonths(data.data), time);
    setLoading(false);
  };
  function addMissingMonths(data) {
    if (data.length === 0) {
      return [];
    }
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const result = [];

    // Create a set of existing months for quick lookup
    const existingMonths = new Set(data.map((item) => item.month));

    months.forEach((month) => {
      if (existingMonths.has(month)) {
        // If the month exists, add the existing entry
        result.push(...data.filter((item) => item.month === month));
      } else {
        // If the month does not exist, add a new entry with total 0 and users 0
        result.push({
          cityA: 0,
          cityB: 0,
          month: month,
          total: 0,
          week: 0,
          year: 2024,
        });
      }
    });

    return result;
  }

  const handleType = (type) => {
    setGraphType(type);
    customerGraph(type, time, cityA, cityB);
  };
  const handleTime = (e) => {
    setTime(e);
    customerGraph(graphtype, e, cityA, cityB);
  };
  return (
    <>
      <Container fluid>
        <p className="dashboard-title">Analytics & Reporting</p>
        <Row>
          <Col md="4">
            <Row>
              <Card
                className="card-stats h-1/2"
                style={{
                  width: "100%",
                  height: "120px",
                  marginRight: "10px",
                  marginBottom: "12px",
                  marginLeft: "15px",
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
                          <Card.Title as="h4">
                            {totalCount.overallCustomerCount}
                          </Card.Title>

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
                  marginLeft: "15px",
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
                          <Card.Title as="h4">
                            {totalCount.overallSubscriptionCount}
                          </Card.Title>

                          <p className="card-category">Overall Subscriptions</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          </Col>
          <Col md="4">
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
                          <Card.Title as="h4">
                            {totalCount.customerAquisitionCount}
                          </Card.Title>

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
                          <Card.Title as="h4">
                            {totalCount.avgTimeSpendCount || 0}
                          </Card.Title>

                          <p className="card-category">Avg. Time spent </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          </Col>
          <Col md="4">
            <Row>
              <Card
                className="card-stats h-1/2"
                style={{
                  width: "100%",
                  height: "120px",
                  marginRight: "15px",
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
                          <Card.Title as="h4">
                            {totalCount.activeCustomerCount || 0}
                          </Card.Title>

                          <p className="card-category">Active customers</p>
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
                  marginRight: "15px",
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
                          <Card.Title as="h4">
                            {totalCount.cancelSubscriptionCount || 0}
                          </Card.Title>

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
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <div className="d-flex row justify-content-between">
                  <Card.Title as="h4" className="ml-3">
                    <div className="tabs">
                      <div
                        className={`tab-1 tab ${
                          graphtype === "SUBSCRIPTION" ? "activeTab" : ""
                        }`}
                        onClick={() => handleType("SUBSCRIPTION")}
                      >
                        Subscriptions
                      </div>
                      <div
                        className={`tab ${
                          graphtype === "CUSTOMER" ? "activeTab" : ""
                        }`}
                        onClick={() => handleType("CUSTOMER")}
                      >
                        Customers
                      </div>
                    </div>
                  </Card.Title>
                  <div className="d-flex row mr-3">
                    <Dropdown
                      onSelect={handleTime}
                      style={{ marginRight: "10px" }}
                    >
                      <Dropdown.Toggle id="dropdown-basic">
                        {time || "Monthly"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="">Reset</Dropdown.Item>

                        <Dropdown.Item eventKey="Daily">Daily</Dropdown.Item>
                        <Dropdown.Item eventKey="Weekly">Weekly</Dropdown.Item>
                        <Dropdown.Item eventKey="Monthly">
                          Monthly
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Yearly">Yearly</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown
                      style={{ marginRight: "10px" }}
                      onSelect={(e) => handleSelect(e, "citya")}
                    >
                      <Dropdown.Toggle id="dropdown-basic">
                        {cityA || "City"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="">Reset</Dropdown.Item>
                        <Dropdown.Item eventKey="Riyadh">Riyadh</Dropdown.Item>
                        <Dropdown.Item eventKey="Jeddah">Jeddah</Dropdown.Item>
                        <Dropdown.Item eventKey="Madina">Madina</Dropdown.Item>
                        <Dropdown.Item eventKey="Makka">Makka</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown
                      style={{ marginRight: "10px" }}
                      onSelect={(e) => handleSelect(e, "cityb")}
                    >
                      <Dropdown.Toggle id="dropdown-basic">
                        {cityB || "To City"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="">Reset</Dropdown.Item>
                        <Dropdown.Item eventKey="Riyadh">Riyadh</Dropdown.Item>
                        <Dropdown.Item eventKey="Jeddah">Jeddah</Dropdown.Item>
                        <Dropdown.Item eventKey="Madina">Madina</Dropdown.Item>
                        <Dropdown.Item eventKey="Makka">Makka</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="d-flex col justify-content-end">
                  <p className="customer_metric_text">
                    <SecondColoricon /> Total
                  </p>
                  <p className="customer_metric_text">
                    <ColorIcon /> City
                  </p>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                {loading ? (
                  <Skeleton height={50} count={4} />
                ) : (
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
                      series: [
                        graph1Data?.length > 0
                          ? graph1Data.map((item) => item.cityA)
                          : [],
                        graph1Data?.length > 0
                          ? graph1Data.map((item) => item.cityB)
                          : [],
                      ],
                    }}
                    type="Bar"
                    options={{
                      high: 100,
                      low: 0,
                      seriesBarDistance: 30,
                      axisX: {
                        showGrid: false,
                      },
                      axisY: {
                        showGrid: true,
                        labelInterpolationFnc: function (value, index) {
                          return index % 2 === 0 ? value : null;
                        },
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 20,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return index % 2 === 0 ? value : null;
                            },
                          },
                        },
                      ],
                    ]}
                  />
                )}
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
                    <div className="tabs">
                      <div
                        className={`tab-1 tab ${
                          graphtype === "SUBSCRIPTION" ? "activeTab" : ""
                        }`}
                        onClick={() => handleType("SUBSCRIPTION")}
                      >
                        Ads Revenue
                      </div>
                      <div
                        className={`tab ${
                          graphtype === "CUSTOMER" ? "activeTab" : ""
                        }`}
                        onClick={() => handleType("CUSTOMER")}
                      >
                        RFQs
                      </div>
                    </div>
                  </Card.Title>
                  <div className="d-flex row mr-3">
                    <Dropdown
                      onSelect={handleTime}
                      style={{ marginRight: "10px" }}
                    >
                      <Dropdown.Toggle id="dropdown-basic">
                        {time || "Monthly"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="">Reset</Dropdown.Item>

                        <Dropdown.Item eventKey="Daily">Daily</Dropdown.Item>
                        <Dropdown.Item eventKey="Weekly">Weekly</Dropdown.Item>
                        <Dropdown.Item eventKey="Monthly">
                          Monthly
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Yearly">Yearly</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown
                      style={{ marginRight: "10px" }}
                      onSelect={(e) => handleSelect(e, "citya")}
                    >
                      <Dropdown.Toggle id="dropdown-basic">
                        {cityA || "City"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="">Reset</Dropdown.Item>
                        <Dropdown.Item eventKey="Riyadh">Riyadh</Dropdown.Item>
                        <Dropdown.Item eventKey="Jeddah">Jeddah</Dropdown.Item>
                        <Dropdown.Item eventKey="Madina">Madina</Dropdown.Item>
                        <Dropdown.Item eventKey="Makka">Makka</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown
                      style={{ marginRight: "10px" }}
                      onSelect={(e) => handleSelect(e, "cityb")}
                    >
                      <Dropdown.Toggle id="dropdown-basic">
                        {cityB || "To City"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="">Reset</Dropdown.Item>
                        <Dropdown.Item eventKey="Riyadh">Riyadh</Dropdown.Item>
                        <Dropdown.Item eventKey="Jeddah">Jeddah</Dropdown.Item>
                        <Dropdown.Item eventKey="Madina">Madina</Dropdown.Item>
                        <Dropdown.Item eventKey="Makka">Makka</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                <div className="d-flex col justify-content-end">
                  <p className="customer_metric_text">
                    <SecondColoricon /> Trends revenue
                  </p>
                  <p className="customer_metric_text">
                    <ColorIcon /> Workshops revenue
                  </p>
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
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      axisY: {
                        showGrid: true,
                        labelInterpolationFnc: function (value, index) {
                          return index % 2 === 0 ? value + "$" : null;
                        },
                      },
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
