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
import Heading from "../../components/heading";
import { REPAIRMATE_TITLE } from "../../mappings";
import axios from "axios";
import { Star } from "react-feather";
import { useNavigate } from "react-router-dom";

export default function ManageProviderPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  function trimText(text) {
    if (text.length < 100) return text;
    return text.substring(0, 100) + "...";
  }

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    axios
      .get("http://localhost:9000/api/provider")
      .then(function (response) {
        // const filteredProviders = response.data.providers.filter(
        //   (provider) => provider.status !== "Inactive"
        // );
        setData(response.data.providers.length ? response.data.providers : {});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleDeactivate = (id) => {
    axios
      .put("http://localhost:9000/api/provider/status", {
        providerId: id,
        status: "Inactive",
      })
      .then(function (response) {
        alert("Service Deactivated");
      })
      .catch(function (error) {
        alert("Something went wrong !");
      });
  };

  return (
    <Layout>
      <Container>
        <Heading title="Service Providers" />
        <Row>
          {data && data.length
            ? data.map((provider, index) => {
                return (
                  <Col key={provider.user.name + index} xs="6" md="4" lg="4">
                    <Card style={{ width: "auto", marginBottom: "24px" }}>
                      <Card.Img
                        variant="top"
                        src={
                          provider.user.image
                            ? provider.user.image
                            : "https://ui-avatars.com/api/?name=" +
                              provider.user.name
                        }
                        style={{
                          width: "auto",
                          height: "200px",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                      <Card.Body>
                        <Card.Title>{provider.user.name}</Card.Title>
                        <Card.Text>Status: {provider.status}</Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            {Array.from({ length: provider.rating }).map(
                              (_, index) => (
                                <Star
                                  key={provider.id + index}
                                  fill="black"
                                  size={18}
                                />
                              )
                            )}
                          </div>
                          {/* <p>({provider.reviews} reviews)</p> */}
                          <h4 className="text-success">
                            ${provider.hourly_rate}
                          </h4>
                        </div>
                        <ButtonGroup
                          className="w-100"
                          aria-label="Basic example"
                        >
                          <Button
                            className="w-50"
                            variant="light"
                            onClick={() =>
                              navigate(`/viewreview/${provider.id}`)
                            }
                          >
                            View Review
                          </Button>
                          <Button
                            size="md"
                            variant="dark"
                            onClick={() => handleDeactivate(provider.id)}
                            disabled={provider.status === "Inactive"}
                          >
                            Deactivate
                          </Button>
                        </ButtonGroup>
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
