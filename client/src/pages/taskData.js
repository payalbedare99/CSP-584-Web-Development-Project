import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  FloatingLabel,
  ButtonGroup,
  InputGroup,
  CardBody,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Layout from "../components/layout";
import Heading from "../components/heading";
import { TASK_TITLE } from "../mappings";
import { STATES } from "../static/states";
import { Star } from "react-feather";
import Header from "../components/header";
import axios from "axios";

export default function TaskDataPage() {
  const params = useParams();
  const [providers, setProviders] = useState([]);
  const [provider, setProvider] = useState(null);
  const [details, SetDetails] = useState({
    demand: "",
    vehicleNeeded: "",
    aptDate: "",
    aptTime: "",
  });
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [task, setTask] = useState("");

  async function getProviders() {
    console.log("Test");
    axios
      .get("http://localhost:9000/api/provider")
      .then(function (response) {
        console.log(response);
        const filteredProviders = response.data.providers.filter(
          (provider) =>
            provider.status !== "Inactive" && provider.serviceId == params.id
        );
        setProviders(filteredProviders.length ? filteredProviders : {});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getProviders();
  }, []);

  function handleAddressChange(val, key) {
    setAddress({ ...address, [key]: val });
  }
  function handleDetails(val, key) {
    SetDetails({ ...details, [key]: val });
  }

  const handleConfirmAppointment = () => {
    localStorage.setItem(
      "order",
      JSON.stringify({
        details: details,
        address: address,
        task: task,
        provider: provider,
      })
    );
    window.location.href = "/payment";
  };

  return (
    <Layout>
      <Container>
        <Heading title="Tell us about your task. We use these details to show Taskers in your area who fit your needs." />
        <br />
        <br />
        <div className="stepContainer">
          <div
            style={{
              position: "absolute",
              top: -10,
              left: -12,
              backgroundColor: "#000",
              padding: "10px",
            }}
          >
            <p className="stepText">Step 1: General Details</p>
          </div>
          <Form>
            <Row>
              <Form.Group as={Col} controlId="formGridTask">
                <Form.Label>How demanding is your task?</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  value={details.demand}
                  onChange={(e) => handleDetails(e.target.value, "demand")}
                >
                  <option>Choose...</option>
                  <option value={"light"}>Less than 1hr</option>
                  <option value={"medium"}>Around 2-3 hrs</option>
                  <option value={"heavy"}>More than 3 hrs</option>
                  <option value={"mamoth"}>Entire Day</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridTask">
                <Form.Label>Is Veichle Needed?</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  value={details.vehicleNeeded}
                  onChange={(e) =>
                    handleDetails(e.target.value, "vehicleNeeded")
                  }
                >
                  <option>Choose...</option>
                  <option value={"no"}>No</option>
                  <option value={"light"}>Yes (Large)</option>
                  <option value={"heavy"}>Yes (Small)</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <br />
            <Row>
              <Form.Group as={Col} controlId="formGridTask">
                <Form.Label>Appointment Date ?</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={details.aptDate}
                  onChange={(e) => handleDetails(e.target.value, "aptDate")}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridTask">
                <Form.Label>Appointment Time ?</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={details.aptTime}
                  onChange={(e) => handleDetails(e.target.value, "aptTime")}
                />
              </Form.Group>
            </Row>
          </Form>
        </div>

        <br />
        <div className="stepContainer">
          <div
            style={{
              position: "absolute",
              top: -10,
              left: -12,
              backgroundColor: "#000",
              padding: "10px",
            }}
          >
            <p className="stepText">Step 2: Address Details</p>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                placeholder="1234 Main St"
                value={address.street}
                onChange={(e) => handleAddressChange(e.target.value, "street")}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  value={address.city}
                  onChange={(e) => handleAddressChange(e.target.value, "city")}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  value={address.state}
                  onChange={(e) => handleAddressChange(e.target.value, "state")}
                >
                  <option>Choose...</option>
                  {Object.keys(STATES).map((code) => {
                    return (
                      <option key={code} value={code}>
                        {code} ({STATES[code]})
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  value={address.zipcode}
                  onChange={(e) =>
                    handleAddressChange(e.target.value, "zipcode")
                  }
                />
              </Form.Group>
            </Row>
          </Form>
        </div>
        {/* ------------------- */}
        <br />
        {/* ------------------- */}
        <div className="stepContainer">
          <div
            style={{
              position: "absolute",
              top: -10,
              left: -12,
              backgroundColor: "#000",
              padding: "10px",
            }}
          >
            <p className="stepText">Step 3: Explain your task.</p>
          </div>
          <Form>
            <Form.Control
              placeholder="Start the conversation and tell your repairmate what you need done. This helps us show you only qualified and available repairmate for the job."
              as="textarea"
              style={{ height: "200px" }}
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            {/* </FloatingLabel> */}
          </Form>
        </div>
        {/* --------------- */}
        <br />

        <div className="stepContainer">
          <div
            style={{
              position: "absolute",
              top: -10,
              left: -12,
              backgroundColor: "#000",
              padding: "10px",
            }}
          >
            <p className="stepText">Step 4: Choose your RapairMate.</p>
          </div>
          <Row>
            {providers && providers.length ? (
              providers.map((pro, index) => {
                if (index < 7) {
                  return (
                    <Col xs="12" md="4" lg="3" className="mb-2">
                      <Card
                        className="bg-dark text-white"
                        style={
                          provider == pro ? { border: "5px solid green" } : {}
                        }
                      >
                        <Card.Img
                          style={{ height: "300px" }}
                          src={
                            pro.user.image
                              ? pro.user.image
                              : "https://ui-avatars.com/api/?name=" +
                                pro.user.name
                          }
                          alt="Card image"
                        />
                        <Card.ImgOverlay>
                          <CardBody
                            style={{
                              backgroundColor: "rgba(0,0,0,0.3)",
                              position: "absolute",
                              width: "100%",
                              bottom: 0,
                              left: 0,
                            }}
                          >
                            <Card.Title>{pro.user.name}</Card.Title>
                            <Card.Text className="mb-0">
                              {pro.service.name}
                            </Card.Text>
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                {Array.from({ length: pro.rating }).map(
                                  (_, index) => (
                                    <Star
                                      key={pro.id + index}
                                      fill="black"
                                      size={18}
                                    />
                                  )
                                )}
                              </div>
                              {/* <p>({pro.reviews} reviews)</p> */}
                              <h4 className="text-light">
                                <b>${pro.hourly_rate}</b>
                              </h4>
                            </div>

                            <ButtonGroup
                              className="w-100"
                              aria-label="Basic example"
                            >
                              <Button
                                className="w-50"
                                variant="light"
                                onClick={() => {
                                  setProvider(pro);
                                }}
                              >
                                Select
                              </Button>
                              <Button
                                className="w-50"
                                variant="dark"
                                onClick={() =>
                                  (window.location.href = "/profile_menu")
                                }
                              >
                                Profile
                              </Button>
                            </ButtonGroup>
                          </CardBody>
                        </Card.ImgOverlay>
                      </Card>
                    </Col>
                  );
                }
              })
            ) : (
              <p>
                Sorry, currently there are no providers available for the
                selected category. Please come back later; we will connect you
                with the best provider soon.
              </p>
            )}
          </Row>
        </div>

        <Button
          onClick={() => handleConfirmAppointment()}
          variant="success"
          className="w-100 mt-4 mb-5"
          disabled={provider === null}
        >
          Confirm Appointment
        </Button>
      </Container>
    </Layout>
  );
}
