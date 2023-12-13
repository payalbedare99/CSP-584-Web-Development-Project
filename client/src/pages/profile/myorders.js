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
import { useNavigate } from "react-router-dom";
import { Star } from "react-feather";

export default function MyOrdersPage() {
  const navigate = useNavigate();
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
      .get("http://localhost:9000/api/order/")
      .then(function (response) {
        const filteredOrders = response.data.orders.filter(
          (order) => String(order.userId) === String(userID)
        );
        setData(filteredOrders.length ? filteredOrders : {});
        console.log(filteredOrders);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function handleCancelOrder(id) {
    axios
      .put("http://localhost:9000/api/order/", {
        orderId: id,
        status: "Cancelled",
      })
      .then(function (response) {
        console.log(response);
        alert("Order Cancelled");
      })
      .catch(function (error) {
        alert("Something went wrong !");
      });
  }

  return (
    <Layout>
      <Container>
        <h1>My Orders</h1>
        <Row>
          {data.map((order) => (
            <Col key={order.id} md={4} className="mb-4">
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
                    order.provider.user.image
                      ? order.provider.user.image
                      : "https://ui-avatars.com/api/?name=" +
                        order.provider.user.name
                  }
                />
                <Card.Body>
                  <Card.Title>{order.service.name}</Card.Title>
                  <Card.Text className="mb-2 text-muted">
                    Provider Name: {order.provider.user.name}
                  </Card.Text>
                  <Card.Text className="mb-2 text-muted">
                    order Date: {new Date(order.aptDate).toLocaleDateString()}
                  </Card.Text>
                  <Card.Text className="mb-2 text-muted">
                    order Time: {order.aptTime}
                  </Card.Text>
                  <Card.Text className="mb-2 text-muted">
                    Task: {trimText(order.task)}
                  </Card.Text>
                  <Card.Text className="mb-2 text-muted">
                    Task: {order.status}
                  </Card.Text>
                  <Card.Text className="mb-2 text-muted">
                    Payment: ${}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {Array.from({ length: order.provider.rating }).map(
                        (_, index) => (
                          <Star
                            key={order.providerId + index}
                            fill="black"
                            size={18}
                          />
                        )
                      )}
                    </div>
                    {/* <p>({order.provider.reviews} reviews)</p> */}
                    <h5 className="text-regular">
                      ${order.provider.hourly_rate}
                    </h5>
                  </div>
                  <ButtonGroup className="w-100" aria-label="Basic example">
                    {order.status === "Completed" && (
                      <Button
                        size="md"
                        variant="dark"
                        onClick={() => navigate(`/review/${order.providerId}`)}
                      >
                        Write Review
                      </Button>
                    )}
                    {(order.status === "Created" ||
                      order.status === "In Progress") && (
                      <Button
                        size="md"
                        variant="dark"
                        onClick={() => {
                          handleCancelOrder(order.id);
                        }}
                      >
                        Cancel Order
                      </Button>
                    )}
                    <Button
                      className="w-50"
                      variant="light"
                      onClick={() =>
                        navigate(`/viewreview/${order.providerId}`)
                      }
                    >
                      View Review
                    </Button>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
}
