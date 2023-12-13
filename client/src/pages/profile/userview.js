import React, { useEffect, useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import Chart from "react-google-charts";
import axios from "axios";
import Layout from "../../components/layout";

export default function UserViewPage() {
  const [orders, setOrders] = useState([]);
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
            (order) => String(order.userId) === String(userID)
          );
          const serviceSpentMap = filteredOrders.reduce((map, order) => {
            const serviceName = order.service.name;
            if (!map.has(serviceName)) {
              map.set(serviceName, order.total);
            } else {
              map.set(serviceName, map.get(serviceName) + order.total);
            }

            return map;
          }, new Map());
          const serviceSpentArray = Array.from(
            serviceSpentMap,
            ([serviceName, totalSpent]) => ({
              serviceName,
              totalSpent,
            })
          );
          setOrders(serviceSpentArray);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    fetchData();
  }, [selectedPeriod]); // Run the effect when the selected period changes

  const data1 = [
    [
      "Service Name",
      "Orders",
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
      order.totalSpent,
      index % 2 === 0 ? "silver" : "#b87333",
      null,
    ]),
  ];

  const options = {
    title: "Your Orders",
    chartArea: { width: "70%" },
    hAxis: {
      title: "Total Spent",
      minValue: 0,
    },
    vAxis: {
      title: "Service Category",
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
                options={options}
              />
            ) : (
              <p>No orders available for the selected period.</p>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
}
