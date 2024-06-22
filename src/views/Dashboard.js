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
import { ReactComponent as Usericon } from "../assets/img/3 User.svg";
import { ReactComponent as Charticon } from "../assets/img/chart-line.svg";
import { ReactComponent as Checkcricleicon } from "../assets/img/check-circle.svg";
import { ReactComponent as Vectoricon } from "../assets/img/Vector.svg";
import { totalCountApi } from "Apis/Dashboard";
import { signupAnalytics } from "Apis/Dashboard";
import { subscriptionAnalytics } from "Apis/Dashboard";
import { trefficMetricAnalytics } from "Apis/Dashboard";

function Dashboard() {
  const [totalCount, setTotalCount] = useState({});
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [subscriptionTime, setSubscriptionTime] = useState("");
  const [newSubTime, setnewSubTime] = useState("");
  const [graphData, setGraphData] = useState("");
  const [subscriptiondata, setsubscriptiondata] = useState("");

  const [subCity, setsubCity] = useState("");
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
    signupGraphData("MONTHLY", "");
    subscriptionGraphData("MONTHLY");
  }, []);
  const signupGraphData = async (time, city) => {
    const data = await signupAnalytics(time, city);
    setGraphData(addAndAccumulateMonths(data.data));
    console.log(addAndAccumulateMonths(data.data));
  };
  const subscriptionGraphData = async (time) => {
    const data = await subscriptionAnalytics(time);
    setsubscriptiondata(addMissingMonths(data.data));
  };
  const handleSelect = (eventKey) => {
    setSelectedCity(eventKey);
    signupGraphData(selectedTime.toUpperCase(), eventKey);
  };
  const handleTime = (ev) => {
    setSelectedTime(ev);
    signupGraphData(ev.toUpperCase(), selectedCity);
  };
  const handleTimeSubscription = (e) => {
    setSubscriptionTime(e);
    subscriptionGraphData(e.toUpperCase());
  };
  const handleMetricsTime = (e) => {
    setnewSubTime(e);
    trefficMetricAnalytics(e.toUpperCase(), subCity);
  };
  const handleMetricsCity = (e) => {
    setsubCity(e);
    trefficMetricAnalytics(newSubTime.toUpperCase(), e);
  };
  function addAndAccumulateMonths(data) {
    // Create a map to accumulate totals for each month
    const monthMap = new Map();

    data.forEach((item) => {
      if (monthMap.has(item.month)) {
        // If the month exists, accumulate totals
        const existing = monthMap.get(item.month);
        existing.total += item.total;
        existing.users += item.users;
        if (item.week !== undefined) {
          existing.week = item.week; // Assume the latest week value should be kept
        }
      } else {
        // If the month does not exist, add a new entry
        monthMap.set(item.month, {
          year: item.year,
          month: item.month,
          total: item.total,
          users: item.users,
          week: item.week,
        });
      }
    });

    // Find the largest month value in the data
    const maxMonth = Math.max(...data.map((item) => item.month));

    // Initialize the result array
    const result = [];

    // Loop through all months from 1 to maxMonth
    for (let month = 1; month <= maxMonth; month++) {
      if (monthMap.has(month)) {
        // If the month exists, add the accumulated entry
        result.push(monthMap.get(month));
      } else {
        // If the month does not exist, add a new entry with total 0 and users 0
        result.push({
          year: 2024,
          month: month,
          total: 0,
          users: 0,
        });
      }
    }

    return result;
  }
  function addMissingMonths(data) {
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
          year: 2024,
          month: month,
          total: 0,
          users: 0,
        });
      }
    });

    return result;
  }

  return (
    <>
      <Container fluid>
        <p className="dashboard-title">Dashboard Overview</p>
        <Row>
          <Col lg="3" sm="6">
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
                          0{totalCount?.overallCustomerCount}
                        </Card.Title>

                        <p className="card-category">Overall customers</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats h-1/2" style={{ height: "80%" }}>
              <Card.Body>
                <Row>
                  <Col xs="12">
                    <div className="d-flex card-content-dashboard">
                      <div
                        className="usericoncontainer mt-1"
                        style={{ background: "#EDFDF5" }}
                      >
                        <Charticon />
                      </div>
                      <div className="ml-2">
                        <Card.Title as="h4">
                          0{totalCount?.activeCustomerCount}
                        </Card.Title>

                        <p className="card-category">Active customers</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="6">
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
                          0{totalCount?.overallSubscriptionCount}
                        </Card.Title>

                        <p className="card-category">Overall Subscription</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="6">
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
                          0{totalCount?.cancelSubscriptionCount}
                        </Card.Title>

                        <p className="card-category">Cancel Subscription</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <div className="d-flex row justify-content-between">
                  <Card.Title as="h4" className="ml-3">
                    New Signups
                  </Card.Title>
                  <div className="d-flex row mr-4">
                    <Dropdown
                      style={{ marginRight: "10px" }}
                      onSelect={handleSelect}
                    >
                      <Dropdown.Toggle id="dropdown-basic">
                        {selectedCity || "City"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Riyadh">Riyadh</Dropdown.Item>
                        <Dropdown.Item eventKey="Jeddah">Jeddah</Dropdown.Item>
                        <Dropdown.Item eventKey="ABC">ABC</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown onSelect={handleTime}>
                      <Dropdown.Toggle id="dropdown-basic">
                        {selectedTime || "Monthly"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Daily">Daily</Dropdown.Item>
                        <Dropdown.Item eventKey="Weekly">Weekly</Dropdown.Item>
                        <Dropdown.Item eventKey="Monthly">
                          Monthly
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Yearly">Yearly</Dropdown.Item>
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
                      series:
                        graphData?.length > 0
                          ? [graphData?.map((Item) => Item.total)]
                          : [[23, 113, 67, 108, 190, 239, 307, 308]],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 400,
                      showArea: true,

                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      axisY: {
                        showGrid: true,
                        labelInterpolationFnc: function (value, index) {
                          return index % 2 === 0 ? value : null;
                        },
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
          <Col md="6">
            <Card>
              <Card.Header>
                <div className="d-flex row justify-content-between">
                  <Card.Title as="h4" className="ml-3">
                    New Subscriptions
                  </Card.Title>
                  <div className="d-flex row mr-3">
                    <Dropdown onSelect={handleTimeSubscription}>
                      <Dropdown.Toggle id="dropdown-basic">
                        {subscriptionTime || "Monthly"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Daily">Daily</Dropdown.Item>
                        <Dropdown.Item eventKey="Weekly">Weekly</Dropdown.Item>
                        <Dropdown.Item eventKey="Monthly">
                          Monthly
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Yearly">Yearly</Dropdown.Item>
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
                      series:
                        subscriptiondata?.length > 0
                          ? [subscriptiondata.map((item) => item.total)]
                          : [
                              [
                                542, 443, 320, 780, 553, 453, 326, 434, 568,
                                610, 756, 895,
                              ],
                            ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 5,
                      low: 0,
                      high: 100,
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
                    Treffic Metrics
                  </Card.Title>
                  <div className="d-flex row mr-4">
                    <Dropdown
                      style={{ marginRight: "10px" }}
                      onSelect={handleMetricsTime}
                    >
                      <Dropdown.Toggle id="dropdown-basic">
                        {newSubTime || "Monthly"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Daily">Daily</Dropdown.Item>
                        <Dropdown.Item eventKey="Weekly">Weekly</Dropdown.Item>
                        <Dropdown.Item eventKey="Monthly">
                          Monthly
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Yearly">Yearly</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown onSelect={handleMetricsCity}>
                      <Dropdown.Toggle id="dropdown-basic">
                        {subCity || "City"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Riyadh">Riyadh</Dropdown.Item>
                        <Dropdown.Item eventKey="Jeddah">Jeddah</Dropdown.Item>
                        <Dropdown.Item eventKey="ABC">ABC</Dropdown.Item>
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
                        [287, 385, 490, 492, 554, 586, 698, 695],
                        [67, 152, 143, 240, 287, 335, 435, 437],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 100,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      axisY: {
                        labelInterpolationFnc: function (value, index) {
                          return index % 2 === 0 ? value : null;
                        }
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

export default Dashboard;
