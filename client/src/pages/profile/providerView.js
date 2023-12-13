import React, { useEffect, useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import Chart from "react-google-charts";
import axios from "axios";
import Layout from "../../components/layout";

export default function ProviderViewPage() {
  const [orders, setOrders] = useState([]);
  const [ordersStatus, setOrdersStatus] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let userID = localStorage.getItem("userId");
      let apiUrl = "http://localhost:9000/api/order";

      if (selectedPeriod === "lastMonth") {
        apiUrl += "/orders?period=lastMonth";
      } else if (selectedPeriod === "lastYear") {
        apiUrl += "/orders?period=lastYear";
      }

      axios
        .get(apiUrl)
        .then(function (response) {
          const filteredOrders = response.data.orders.filter(
            (order) => String(order.providerId) === String(userID)
          );
          // setOrders(filteredOrders.length ? filteredOrders : []);
          // console.log(filteredOrders);
          const serviceEarningsMap = filteredOrders.reduce((map, order) => {
            const serviceName = order.service.name;
            if (!map.has(serviceName)) {
              map.set(serviceName, order.total);
            } else {
              map.set(serviceName, map.get(serviceName) + order.total);
            }

            return map;
          }, new Map());
          const serviceEarningsArray = Array.from(
            serviceEarningsMap,
            ([serviceName, totalEarnings]) => ({
              serviceName,
              totalEarnings,
            })
          );
          setOrders(serviceEarningsArray);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    fetchData();
  }, [selectedPeriod]);

  useEffect(() => {
    const fetchData = async () => {
      let userID = localStorage.getItem("userId");
      let apiUrl = "http://localhost:9000/api/order";
      axios
        .get(apiUrl)
        .then(function (response) {
          const filteredOrders = response.data.orders.filter(
            (order) => String(order.providerId) === String(userID)
          );
          const orderByStatus = filteredOrders.reduce((map, order) => {
            const status = order.status;
            if (!map.has(status)) {
              map.set(status, 1);
            } else {
              map.set(status, map.get(status) + 1);
            }

            return map;
          }, new Map());
          const orderByStatusArray = Array.from(
            orderByStatus,
            ([status, count]) => ({
              status,
              count,
            })
          );
          setOrdersStatus(orderByStatusArray.length ? orderByStatusArray : []);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  const data1 = [
    [
      "Service Name",
      "Earnings",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ],
    ...orders.map((order, index) => [
      order.serviceName,
      order.totalEarnings,
      index % 2 === 0 ? "green" : "#b87333",
      null,
    ]),
  ];

  const options1 = {
    title: "Your Earnings",
    chartArea: { width: "70%" },
    hAxis: {
      title: "Total Earnings",
      minValue: 0,
    },
    vAxis: {
      title: "Service Category",
    },
  };

  const data2 = [
    [
      "Order Status",
      "Orders",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ],
    ...ordersStatus.map((order, index) => [
      order.status,
      order.count,
      index % 2 === 0 ? "grey" : "silver",
      null,
    ]),
  ];

  const options2 = {
    chartArea: { width: "70%" },
    hAxis: {
      title: "Total Orders",
      minValue: 0,
    },
    vAxis: {
      title: "Status",
    },
  };

  return (
    <Layout>
      <Container>
        <div>
          <h1>Data Visualization</h1>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Select Period
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedPeriod("allOrders")}>
                All Orders
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedPeriod("lastMonth")}>
                Last Month
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedPeriod("lastYear")}>
                Last Year
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div style={{ width: "100vh", overflowY: "scroll" }}>
            {orders.length > 0 ? (
              <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={data1}
                options={options1}
              />
            ) : (
              <p>No orders available for the selected period.</p>
            )}
          </div>
        </div>
      </Container>

      <Container>
        <h1>Order Status</h1>
        <div>
          <div style={{ width: "100vh", overflowY: "scroll" }}>
            {orders.length > 0 ? (
              <Chart
                chartType="ColumnChart"
                width="100%"
                height="400px"
                data={data2}
                options={options2}
              />
            ) : (
              <p>No orders available to display.</p>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
}
