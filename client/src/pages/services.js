import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Layout from "../components/layout";
import axios from "axios";
import Heading from "../components/heading";

export default function ServicesPage() {
  const [data, setData] = useState([]);

  function trimText(text, limit) {
    if (text.length < limit) return text;
    return text.substring(0, limit) + "...";
  }

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    axios
      .get("http://localhost:9000/api/service")
      .then(function (response) {
        console.log(response);
        const filteredServices = response.data.services.filter(
          (service) => service.status !== "Inactive"
        );
        setData(filteredServices.length ? filteredServices : {});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleBookAppointment = (id) => {
    window.location.href = "/task/" + id;
  };

  return (
    <Layout>
      <Container>
        <Heading title={"All Services"} />
        <Row>
          {data && data.length
            ? data.map((service, index) => {
                return (
                  <Col
                    key={service.name + service.category}
                    xs="6"
                    md="4"
                    lg="3"
                  >
                    <Card
                      style={{
                        width: "auto",
                        marginBottom: "24px",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={service.image}
                        style={{
                          width: "auto",
                          height: "200px",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                      <Card.Body>
                        <Card.Title>{trimText(service.name, 20)}</Card.Title>
                        <Card.Text>
                          {trimText(service.description, 100)}
                        </Card.Text>
                        <Button
                          size="md"
                          className="w-100"
                          variant="dark"
                          onClick={() => handleBookAppointment(service.id)}
                        >
                          Book Appointment
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            : null}
        </Row>
      </Container>
    </Layout>
  );
}
