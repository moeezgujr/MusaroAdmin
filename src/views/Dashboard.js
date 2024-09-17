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
import { ReactComponent as ColorIcon } from "../assets/img/Color.svg";
import { ReactComponent as SecondColoricon } from "../assets/img/2nd-color.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { totalCountApi } from "Apis/Dashboard";
import { signupAnalytics } from "Apis/Dashboard";
import { subscriptionAnalytics } from "Apis/Dashboard";
import { trefficMetricAnalytics } from "Apis/Dashboard";
import { getCities } from "Apis/General";

function Dashboard() {
  const [totalCount, setTotalCount] = useState({});
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTime, setSelectedTime] = useState("Monthly");
  const [subscriptionTime, setSubscriptionTime] = useState("");
  const [newSubTime, setnewSubTime] = useState("");
  const [graphData, setGraphData] = useState("");
  const [graphLabels, setGraphLabeles] = useState([]);
  const [subscriptionGraphLabels, setsubscriptionGraphLabels] = useState([]);
  const [subscriptiondata, setsubscriptiondata] = useState("");
  const [metricdata, setmetricdata] = useState("");
  const [loading, setLoading] = useState(true);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [metricLoading, setMetricLoading] = useState(true);
  const [totalCountLoading, setTotalCountLoading] = useState(true);
  const [metriclabels, setMetricLabels] = useState([]);

  const [subCity, setsubCity] = useState("");
  const [cityList, setCitylist] = useState([]);
  const monthNames = [
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
  ];

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const data = await totalCountApi();
        setTotalCount(data.data);
      } catch (err) {
      } finally {
        setTotalCountLoading(false);
      }
    };
    const fetchCity = async () => {
      try {
        const data = await getCities();
        setCitylist(data.data.cities);
      } catch (err) {
      } finally {
      }
    };
    fetchTotalCount();
    signupGraphData("MONTHLY", "");
    metricGraphData("MONTHLY", "");
    subscriptionGraphData("MONTHLY");
    fetchCity();
  }, []);
  const formatGraphLabels = (time, graphData, monthNames) => {
    const getDateOfISOWeek = (week, year) => {
      const simple = new Date(year, 0, 1 + (week - 1) * 7);
      const dayOfWeek = simple.getDay();
      const ISOWeekStart = new Date(simple);
      ISOWeekStart.setDate(ISOWeekStart.getDate() - (dayOfWeek || 7) + 1); // Adjust to Monday
      return `${ISOWeekStart.getDate()} ${monthNames[ISOWeekStart.getMonth()]}`;
    };

    switch (time) {
      case "WEEKLY":
        return graphData.map((item) => getDateOfISOWeek(item.week, item.year));
      case "MONTHLY":
        return graphData.map((item) => `${monthNames[item.month - 1]}`);
        case "DAILY":
          return graphData.map((item, index) => {
            const dayLabel = `${item.day} ${monthNames[item.month - 1]}`;
        
            // Add labels at the start, end, and every 5th point
            if (index === 0 || index === graphData.length - 1 || index % 2 === 0) {
              return dayLabel;
            } else {
              return ''; // Skip label for other points
            }
          });
        
      case "YEARLY":
        return graphData.map((item) => item.year);
      default:
        return [];
    }
  };

  const signupGraphData = async (time, city) => {
    setLoading(true);
    const { startDate, endDate } = getStartAndEndDate(time);

    // Fetch data from the API
    const data = await signupAnalytics(time, city, startDate, endDate);
    const graphData = data?.data || [];

    const graphLabels = formatGraphLabels(time, graphData, monthNames);
    setGraphData(graphData);
    setGraphLabeles(graphLabels);
    setLoading(false);
  };

  const subscriptionGraphData = async (time) => {
    setSubscriptionLoading(true);
    const { startDate, endDate } = getStartAndEndDate(time);
    const data = await subscriptionAnalytics(time, startDate, endDate);
    const graphData = data?.data || [];
    const graphLabels = formatGraphLabels(time, graphData, monthNames);
    setsubscriptionGraphLabels(graphLabels);
    setsubscriptiondata(data.data);
    setSubscriptionLoading(false);
  };
  const metricGraphData = async (time, city) => {
    setMetricLoading(true);
    const { startDate, endDate } = getStartAndEndDate(time);
    const data = await trefficMetricAnalytics(time, city, startDate, endDate);
    const graphData = data?.data || [];
    const graphLabels = formatGraphLabels(time, graphData, monthNames);
    setMetricLabels(graphLabels);
    setmetricdata(graphData);
    setMetricLoading(false);
  };
  const handleSelect = (eventKey) => {
    setSelectedCity(eventKey);
    signupGraphData(selectedTime.toUpperCase(), eventKey);
  };
  const getStartAndEndDate = (timeFormat='DAILY') => {
    // Get current date
    const currentDate = new Date();
    let startDate = "";

    // Set end date as current date in ISO format
    const endDate = currentDate.toISOString();

    // Create a copy of the current date for manipulation
    const startDateObj = new Date(currentDate);

    // Check the timeFormat and subtract the appropriate time
    if (timeFormat.toUpperCase() === "WEEKLY") {
      // Subtract 25 days for weekly
      startDateObj.setDate(startDateObj.getDate() - 25);
    } else if (timeFormat.toUpperCase() === "MONTHLY") {
      // Subtract 12 months for monthly
      startDateObj.setMonth(startDateObj.getMonth() - 12);
    } else if (timeFormat.toUpperCase() === "DAILY") {
      // Subtract 15 days for daily
      startDateObj.setDate(startDateObj.getDate() - 30);
    } else if (timeFormat.toUpperCase() === "YEARLY") {
      // Subtract 5 years for yearly
      startDateObj.setFullYear(startDateObj.getFullYear() - 5);
    }

    // Convert the manipulated start date to ISO format
    startDate = startDateObj.toISOString();

    return { startDate, endDate };
  };

  const handleTime = (ev) => {
    setSelectedTime(ev);
    // Get start and end dates once
    // Call the graph data function with the relevant parameters
    signupGraphData(ev.toUpperCase(), selectedCity);
  };
  const handleTimeSubscription = (e) => {
    setSubscriptionTime(e);
    subscriptionGraphData(e.toUpperCase());
  };
  const handleMetricsTime = (e) => {
    setnewSubTime(e);
    metricGraphData(e.toUpperCase(), subCity);
  };
  const handleMetricsCity = (e) => {
    setsubCity(e);
    metricGraphData(newSubTime.toUpperCase(), e);
  };

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
                          {totalCountLoading ? (
                            <Skeleton width={100} height={20} />
                          ) : (
                            `0${totalCount?.overallCustomerCount}`
                          )}
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
                          {totalCountLoading ? (
                            <Skeleton width={100} height={20} />
                          ) : (
                            `0${totalCount?.activeCustomerCount}`
                          )}
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
                          {totalCountLoading ? (
                            <Skeleton width={100} height={20} />
                          ) : (
                            `0${totalCount?.overallSubscriptionCount}`
                          )}
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
                          {totalCountLoading ? (
                            <Skeleton width={100} height={20} />
                          ) : (
                            `0${totalCount?.cancelSubscriptionCount}`
                          )}
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
                    {Array.isArray(cityList) && cityList?.length > 0 && (
                      <Dropdown
                        style={{ marginRight: "10px" }}
                        onSelect={handleSelect}
                      >
                        <Dropdown.Toggle id="dropdown-basic">
                          {selectedCity || "City"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="">Reset</Dropdown.Item>
                          {cityList.map((item) => {
                            return (
                              <Dropdown.Item eventKey={item.name}>
                                {item.name}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
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
                  {loading ? (
                    <Skeleton height={50} count={4} />
                  ) : (
                    <ChartistGraph
                      data={{
                        labels: graphLabels,
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
                  )}
                </div>
              </Card.Body>
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
                  {subscriptionLoading ? (
                    <Skeleton height={50} count={4} />
                  ) : (
                    <ChartistGraph
                      data={{
                        labels: subscriptionGraphLabels || [],
                        series:
                          subscriptiondata?.length > 0
                            ? [subscriptiondata.map((item) => item.total)]
                            : [],
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
                    {Array.isArray(cityList) && cityList?.length > 0 && (
                      <Dropdown
                        style={{ marginRight: "10px" }}
                        onSelect={handleMetricsCity}
                      >
                        <Dropdown.Toggle id="dropdown-basic">
                          {selectedCity || "City"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="">Reset</Dropdown.Item>
                          {cityList.map((item) => {
                            return (
                              <Dropdown.Item eventKey={item.name}>
                                {item.name}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                </div>
                <div className="d-flex col justify-content-end mt-3">
                  <p className="customer_metric_text">
                    <ColorIcon /> Customer Registered{" "}
                  </p>
                  <p className="customer_metric_text">
                    <SecondColoricon /> Service Provider Registered{" "}
                  </p>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  {metricLoading ? (
                    <Skeleton height={50} count={4} />
                  ) : (
                    <ChartistGraph
                      data={{
                        labels: metriclabels || [],
                        series: [
                          metricdata?.length > 0
                            ? metricdata.map((item) => item.providers)
                            : [],
                          metricdata?.length > 0
                            ? metricdata.map((item) => item.customers)
                            : [],
                        ],
                      }}
                      type="Line"
                      options={{
                        low: 0,
                        high: 100,
                        showArea: true,
                        height: "245px",
                        axisX: {
                          showGrid: false,
                        },
                        axisY: {
                          labelInterpolationFnc: function (value, index) {
                            return index % 2 === 0 ? value : null;
                          },
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
                  )}
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
