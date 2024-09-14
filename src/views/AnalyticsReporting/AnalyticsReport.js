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
import { getCities } from "Apis/General";
import { rfqs } from "Apis/Dashboard";
function AnalyticsReport() {
  const [totalCount, setTotalCount] = useState({});
  const [cityA, setSelectedACity] = useState("ABHA");
  const [cityB, setSelectedBCity] = useState("ALBAHA");
  const [cityC, setSelectedCCity] = useState("ABHA");
  const [cityD, setSelectedDCity] = useState("ALBAHA");
  const [time, setTime] = useState("Monthly");
  const [time1, setTime1] = useState("Monthly");

  const [graphtype, setGraphType] = useState("SUBSCRIPTION");
  const [graph2type, setGraph2Type] = useState("RFQ");
  const [graph1Data, setGraph1Data] = useState("");
  const [rfqData, setRFQData] = useState([]);
  const [rfqgraphLabelsData, setRfqGraphsLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);

  const [customerlabels, setgraphlabelsincustomer] = useState([]);
  const [cityList, setCitylist] = useState([]);

  const [totalCountLoading, setTotalCountLoading] = useState(true);
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
    fetchCity();
    fetchTotalCount();
    customerGraph(graphtype, time, cityA, cityB);
    rfqDatafetch(graph2type, time, cityA, cityB);
  }, []);
  const getStartAndEndDate = (timeFormat = "DAILY") => {
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
      startDateObj.setDate(startDateObj.getDate() - 7);
    } else if (timeFormat.toUpperCase() === "YEARLY") {
      // Subtract 5 years for yearly
      startDateObj.setFullYear(startDateObj.getFullYear() - 5);
    }

    // Convert the manipulated start date to ISO format
    startDate = startDateObj.toISOString();

    return { startDate, endDate };
  };
  const formatGraphLabels = (time, graphData, monthNames) => {
    const getDateOfISOWeek = (week, year) => {
      const simple = new Date(year, 0, 1 + (week - 1) * 7);
      const dayOfWeek = simple.getDay();
      const ISOWeekStart = new Date(simple);
      ISOWeekStart.setDate(ISOWeekStart.getDate() - (dayOfWeek || 7) + 1); // Adjust to Monday
      return `${ISOWeekStart.getDate()} ${monthNames[ISOWeekStart.getMonth()]}`;
    };

    switch (
      time.toUpperCase() // Convert time to uppercase for case-insensitivity
    ) {
      case "WEEKLY":
        return graphData.map((item) => getDateOfISOWeek(item.week, item.year));
      case "MONTHLY":
        return graphData.map((item) => `${monthNames[item.month - 1]}`);
      case "DAILY":
        return graphData.map(
          (item) => `${item.day} ${monthNames[item.month - 1]}`
        );
      case "YEARLY":
        return graphData.map((item) => item.year);
      default:
        return [];
    }
  };
  const rfqDatafetch = async (
    graphtype = "RFQ",
    time = "MONTHLY",
    cityC = "ABHA",
    cityD = "ALJUBAIL"
  ) => {
    setLoading1(true);
    const { startDate, endDate } = getStartAndEndDate(time);
    const data = await rfqs(
      graphtype,
      time.toUpperCase(),
      cityC,
      cityD,
      startDate,
      endDate
    );
    const graphData = data?.data || [];
    const graphLabels = formatGraphLabels(time, graphData, monthNames);
    setRfqGraphsLabels(graphLabels);
    setRFQData(graphData);
    setLoading1(false);
  };
  const handleSelect = (e, type) => {
    if (type === "citya") {
      setSelectedACity(e);
      customerGraph(graphtype, time, cityA, e);
    } else if (type === "cityb") {
      setSelectedBCity(e);
      customerGraph(graphtype, time, e, cityB);
    } else if (type === "cityc") {
      setSelectedCCity(e);
      rfqDatafetch(graph2type, time, e, cityC);
    } else if (type === "cityd") {
      setSelectedDCity(e);
      rfqDatafetch(graph2type, time, e, cityD);
    }
  };
  const customerGraph = async (graphtype, time, cityA, cityB) => {
    setLoading(true);
    const { startDate, endDate } = getStartAndEndDate(time);

    const data = await subscriptionCustomerGraph(
      graphtype,
      time,
      cityA,
      cityB,
      startDate,
      endDate
    );
    const graphData = data?.data || [];

    const graphLabels = formatGraphLabels(time, graphData, monthNames);
    setgraphlabelsincustomer(graphLabels);
    setGraph1Data(graphData);
    setLoading(false);
  };

  const handleType = (type) => {
    setGraphType(type);
    customerGraph(type, time, cityA, cityB);
  };
  const handleRFQType = (type) => {
    setGraph2Type(type);
    rfqDatafetch(type, time, cityC, cityD);
  };
  const handleTime = (e) => {
    setTime(e);
    customerGraph(graphtype, e, cityA, cityB);
  };
  const handleTime1 = (e) => {
    setTime1(e);
    rfqDatafetch(graph2type, e, cityC, cityD);
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
                            {totalCountLoading ? (
                              <Skeleton width={100} height={20} />
                            ) : (
                              totalCount.overallCustomerCount
                            )}
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
                            {totalCountLoading ? (
                              <Skeleton width={100} height={20} />
                            ) : (
                              totalCount.overallSubscriptionCount
                            )}
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
                            {totalCountLoading ? (
                              <Skeleton width={100} height={20} />
                            ) : (
                              totalCount.customerAquisitionCount
                            )}
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
                            {totalCountLoading ? (
                              <Skeleton width={100} height={20} />
                            ) : (
                              totalCount.avgTimeSpendCount || 0
                            )}
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
                            {totalCountLoading ? (
                              <Skeleton width={100} height={20} />
                            ) : (
                              totalCount.activeCustomerCount || 0
                            )}
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
                            {totalCountLoading ? (
                              <Skeleton width={100} height={20} />
                            ) : (
                              totalCount.cancelSubscriptionCount || 0
                            )}
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
                    {Array.isArray(cityList) && cityList?.length > 0 && (
                      <Dropdown
                        style={{ marginRight: "10px" }}
                        onSelect={(e) => handleSelect(e, "citya")}
                      >
                        <Dropdown.Toggle id="dropdown-basic">
                          {cityA || "City"}
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
                    {Array.isArray(cityList) && cityList?.length > 0 && (
                      <Dropdown
                        style={{ marginRight: "10px" }}
                        onSelect={(e) => handleSelect(e, "cityb")}
                      >
                        <Dropdown.Toggle id="dropdown-basic">
                          {cityB || "City"}
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
                <div className="d-flex col justify-content-end">
                  {cityA && (
                    <p className="customer_metric_text">
                      <SecondColoricon /> {cityA}
                    </p>
                  )}
                  {cityB && (
                    <p className="customer_metric_text">
                      <ColorIcon /> {cityB}
                    </p>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  {loading ? (
                    <Skeleton height={50} count={4} />
                  ) : (
                    <ChartistGraph
                      data={{
                        labels: customerlabels || [],
                        series: [
                          graph1Data?.length > 0
                            ? [graph1Data.map((item) => item.cityA)]
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
                          graph2type === "REVENUE" ? "activeTab" : ""
                        }`}
                        onClick={() => handleRFQType("REVENUE")}
                      >
                        Ads Revenue
                      </div>
                      <div
                        className={`tab ${
                          graph2type === "RFQ" ? "activeTab" : ""
                        }`}
                        onClick={() => handleRFQType("RFQ")}
                      >
                        RFQs
                      </div>
                    </div>
                  </Card.Title>
                  <div className="d-flex row mr-3">
                    <Dropdown
                      onSelect={handleTime1}
                      style={{ marginRight: "10px" }}
                    >
                      <Dropdown.Toggle id="dropdown-basic">
                        {time1 || "Monthly"}
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

                    {Array.isArray(cityList) && cityList?.length > 0 && (
                      <Dropdown
                        style={{ marginRight: "10px" }}
                        onSelect={(e) => handleSelect(e, "cityc")}
                      >
                        <Dropdown.Toggle id="dropdown-basic">
                          {cityC || "City"}
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
                    {Array.isArray(cityList) && cityList?.length > 0 && (
                      <Dropdown
                        style={{ marginRight: "10px" }}
                        onSelect={(e) => handleSelect(e, "cityd")}
                      >
                        <Dropdown.Toggle id="dropdown-basic">
                          {cityD || "To City"}
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
                      labels: rfqgraphLabelsData,
                      series: [
                        rfqData?.length > 0
                          ? [rfqData.map((item) => item.cityA)]
                          : [],
                        rfqData?.length > 0
                          ? rfqData.map((item) => item.cityB)
                          : [],
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
