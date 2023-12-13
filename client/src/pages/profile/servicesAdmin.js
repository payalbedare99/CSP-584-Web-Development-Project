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
import Heading from "../../components/heading";

export default function AdminServicePage() {
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
    axios
      .get("http://localhost:9000/api/service/")
      .then(function (response) {
        console.log(response);
        setData(response.data.services.length ? response.data.services : {});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function handleDeactivateService(id) {
    axios
      .put("http://localhost:9000/api/service/", {
        serviceId: id,
        status: "Inactive",
      })
      .then(function (response) {
        console.log(response);
        alert("Service Deactivated");
      })
      .catch(function (error) {
        alert("Something went wrong !");
      });
  }

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
                        <Card.Title>{service.name}</Card.Title>
                        <Card.Text>{trimText(service.description)}</Card.Text>
                        <Card.Text>Status: {service.status}</Card.Text>
                        <Button
                          size="md"
                          className="w-100"
                          variant="dark"
                          onClick={() => handleDeactivateService(service.id)}
                          disabled={service.status === "Inactive"}
                        >
                          Deactivate Service
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
