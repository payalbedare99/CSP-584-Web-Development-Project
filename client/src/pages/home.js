import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";
import Layout from "../components/layout";
import axios from "axios";
import Heading from "../components/heading";
import { ArrowUpRight, Star, Twitter } from "react-feather";
import { roles } from "../mappings/index";

function HomeScreen() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [providers, setProviders] = useState([]);
  const [categoryId, setCategoryId] = useState("1");
  const [role, setRole] = useState("");

  function trimText(text) {
    if (text.length < 100) return text;
    return text.substring(0, 100) + "...";
  }

  async function getData() {
    axios
      .get("http://localhost:9000/api/service")
      .then(function (response) {
        const filteredServices = response.data.services.filter(
          (service) => service.status !== "Inactive"
        );
        setData(filteredServices.length ? filteredServices : {});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
    getProvidersByOpenAPI();
  }, []);

  async function getProvidersByOpenAPI() {
    let userID = localStorage.getItem("userId");
    let user = localStorage.getItem("user");
    let userData = JSON.parse(user);
    if (userData?.role) {
      const role = userData.role;
    }
    if (userID) {
      try {
        const response = await axios.get("http://localhost:9000/api/order");
        const filteredOrders = response.data.orders.filter(
          (order) => String(order.userId) === String(userID)
        );

        const data =
          role === "customer" ? filteredOrders : response.data.orders;
        const serviceCategoryCounts = data.reduce((acc, order) => {
          const serviceCategory = order.service.category;
          acc[serviceCategory] = (acc[serviceCategory] || 0) + 1;
          return acc;
        }, {});

        const serviceCategoryCountsArray = Object.entries(
          serviceCategoryCounts
        ).map(([serviceCategory, count]) => ({
          serviceCategory,
          count,
        }));

        const maxOrderedCategory = serviceCategoryCountsArray.reduce(
          (max, current) =>
            current.count > (max ? max.count : 0) ? current : max,
          null
        );
        axios
          .get("http://localhost:9000/api/python_run", {
            params: {
              queryString: maxOrderedCategory.serviceCategory,
            },
          })
          .then(function (response) {
            var inputString = response.data.op;
            const fixedString = inputString.replace(/'/g, '"');
            const jsonArray = JSON.parse(fixedString);
            axios
              .get("http://localhost:9000/api/provider")
              .then(function (response) {
                const filteredProviders = response.data.providers.filter(
                  (provider) => provider.status !== "Inactive"
                );
                const providers = filteredProviders.length
                  ? filteredProviders
                  : {};
                const categoryProviderMap = {};
                jsonArray.forEach((category) => {
                  const providersInCategory = providers.filter(
                    (provider) => provider.service.name === category
                  );
                  categoryProviderMap[category] = providersInCategory.length
                    ? providersInCategory
                    : {};
                });

                const bestRatedProviders = {};
                Object.entries(categoryProviderMap).forEach(
                  ([category, providersInCategory]) => {
                    if (providersInCategory.length) {
                      const bestRatedProvider = providersInCategory.reduce(
                        (max, current) =>
                          current.rating > max.rating ? current : max
                      );
                      bestRatedProviders[category] = bestRatedProvider;
                    }
                  }
                );
                const providersList = Object.keys(bestRatedProviders).map(
                  (key) => {
                    return bestRatedProviders[key];
                  }
                );
                setProviders(providersList);
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleSearchChange = (val) => {
    if (val === "") setSearchResults([]);
    setSearchValue(val);
  };

  const handleBookAppointment = (provider) => {
    console.log(provider);
    setCategoryId(provider.id);
    window.location.href = "/task/" + provider;
  };

  function debounce(func, timeout = 800) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  function getSearchResults() {
    if (searchValue.length > 3) {
      axios
        .get("http://localhost:9000/api/service")
        .then((response) => {
          let data = response?.data?.services || [];
          const filteredResults = data.filter((service) =>
            service.name.includes(searchValue)
          );
          setSearchResults(filteredResults);
        })
        .catch((err) => {
          alert("Error !!!");
        });
    }
  }

  const processChange = debounce(() => getSearchResults());

  return (
    <Layout>
      <div id="banner">
        <Container>
          <div style={{ position: "relative" }}>
            <InputGroup className="mb-0" size="lg">
              <Form.Control
                className="mb-0"
                onKeyUp={processChange}
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                id="main-search"
                placeholder="What service are you looking for ? "
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            {searchResults.length && searchValue.length > 3 ? (
              <div
                style={{
                  position: "absolute",
                  padding: "24px",
                  paddingTop: "40px",
                  borderBottomLeftRadius: "16px",
                  borderBottomRightRadius: "16px",
                  marginTop: "-16px",
                  height: "200px",
                  width: "100%",
                  backgroundColor: "#fff",
                  overflowX: "scroll",
                  border: "1px solid #808080",
                  borderTop: 0,
                }}
              >
                {searchResults.map((result) => {
                  return (
                    <div
                      onClick={() =>
                        (window.location.href = "/task/" + result.id)
                      }
                      key={result.name + result.id}
                      style={{ cursor: "pointer", marginBottom: "16px" }}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <p className="mb-0">{result.name}</p>
                      <ArrowUpRight color="#808080" />
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </Container>
      </div>
      {role === roles.CUSTOMER || role === roles.ADMIN ? (
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.9)",
            padding: "24px 0px",
          }}
        >
          <Container className="d-flex justify-content-between align-items-center">
            <div style={{ color: "#fff" }}>
              <h5 style={{ fontStyle: "italic" }}>
                Become a REPAIRMATE and start earning your way.
              </h5>
            </div>
            <Button
              variant="outline-light"
              className="ml-3"
              onClick={() => {
                localStorage.getItem("user")
                  ? (window.location.href = "/onboarding")
                  : (window.location.href = "/auth");
              }}
            >
              Register as Repairmate
            </Button>
          </Container>
        </div>
      ) : null}

      <Container>
        <Heading
          title={"Recomended RepairMates"}
          hasBtn={true}
          btnText={"View All"}
          btnFn={() => navigate("repairmates")}
        />
        <Row>
          {providers && providers.length
            ? providers.map((provider, index) => {
                if (index < 4) {
                  return (
                    <Col key={provider.id} xs="12" md="4" lg="3">
                      <Card style={{ width: "auto", marginBottom: "24px" }}>
                        <div className="pic pt-3 text-center">
                          <img
                            style={{
                              borderRadius: "50%",
                              overflow: "hidden",
                              height: "160px",
                              width: "160px",
                              overflow: "hidden",
                              objectFit: "cover",
                            }}
                            src={
                              provider.user.image
                                ? provider.user.image
                                : "https://ui-avatars.com/api/?name=" +
                                  provider.user.name
                            }
                            className="img-fluid"
                            height={200}
                            width={200}
                            alt=""
                          />
                        </div>
                        <Card.Body>
                          <Card.Title>{provider.user.name}</Card.Title>
                          <Card.Text>{provider.service.name}</Card.Text>
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
                          <Button
                            size="md"
                            className="w-100"
                            variant="dark"
                            onClick={() => {
                              handleBookAppointment(provider.serviceId);
                            }}
                          >
                            Book Appointment
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                }
              })
            : null}
        </Row>
      </Container>
    </Layout>
  );
}

export default HomeScreen;
