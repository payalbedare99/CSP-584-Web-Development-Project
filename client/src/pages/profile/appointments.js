import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import Layout from "../../components/layout";
import axios from "axios";

export default function MyAppointmentPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  function trimText(text) {
    if (text.length < 100) return text;
    return text.substring(0, 100) + "...";
  }

  async function getData() {
    let userID = localStorage.getItem("userId");
    axios
      .get("http://localhost:9000/api/order")
      .then(function (response) {
        console.log(response);
        const filteredOrders = response.data.orders.filter(
          (order) => String(order.providerId) === String(userID)
        );
        console.log(filteredOrders);
        setData(filteredOrders.length ? filteredOrders : {});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleOrderState = (id, status) => {
    axios
      .put("http://localhost:9000/api/order", {
        orderId: id,
        status: status,
      })
      .then(function (response) {
        alert("Service " + status);
      })
      .catch(function (error) {
        alert("Something went wrong !");
      });
  };

  return (
    <Layout>
      <Container>
        <h1>My Appointments</h1>
        {data.length > 0 ? (
          <Row>
            {data.map((appointment) => (
              <Col key={appointment.id} md={4} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    style={{
                      width: "auto",
                      height: "200px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    src={
                      appointment.user.image
                        ? appointment.user.image
                        : "https://ui-avatars.com/api/?name=" +
                          appointment.user.name
                    }
                  />
                  <Card.Body>
                    <Card.Title>{appointment.service.name}</Card.Title>
                    <Card.Text className="mb-2 text-muted">
                      Customer Name: {appointment.user.name}
                    </Card.Text>
                    <Card.Text className="mb-2 text-muted">
                      Appointment Date:{" "}
                      {new Date(appointment.aptDate).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text className="mb-2 text-muted">
                      Appointment Time: {appointment.aptTime}
                    </Card.Text>
                    <Card.Text className="mb-2 text-muted">
                      Task: {trimText(appointment.task)}
                    </Card.Text>
                    <Card.Text className="mb-2 text-muted">
                      address: {appointment.street}
                    </Card.Text>
                    <Card.Text className="mb-2 text-muted">
                      status: {appointment.status}
                    </Card.Text>
                    <ButtonGroup className="w-100" aria-label="Basic example">
                      {appointment.status === "Created" && (
                        <Button
                          className="w-100"
                          variant="dark"
                          onClick={() => {
                            handleOrderState(appointment.id, "In Progress");
                          }}
                        >
                          Start
                        </Button>
                      )}

                      {appointment.status === "In Progress" && (
                        <Button
                          className="w-100"
                          variant="dark"
                          onClick={() => {
                            handleOrderState(appointment.id, "Completed");
                          }}
                        >
                          Complete
                        </Button>
                      )}
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p>No appointments scheduled</p>
        )}
      </Container>
    </Layout>
  );
}
