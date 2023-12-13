import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../components/layout";
import Heading from "../components/heading";
import { STATES } from "../static/states";
import axios from "axios";
import { roles } from "../mappings";

export default function OnboardingPage() {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [service, setService] = useState("");
  const [hourly_rate, setRate] = useState("");
  const [aboutme, setAboutMe] = useState("");
  const [categories, setCategories] = useState([]);

  const getCategories = (event) => {
    axios
      .get("http://localhost:9000/api/service")
      .then(function (response) {
        const serviceCategories = response.data.services.map((service) => ({
          id: service.id,
          name: service.name,
        }));
        setCategories(serviceCategories);
      })
      .catch(function (error) {
        alert("No Data Found !");
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const saveProvider = (event) => {
    let userID = localStorage.getItem("userId");
    if (userID) {
      console.log("service", service);
      axios
        .post("http://localhost:9000/api/provider/add", {
          user: userID,
          service: service,
          hourly_rate,
          aboutme,
        })
        .then(function (response) {
          axios
            .put("http://localhost:9000/api/user", {
              userId: userID,
              role: roles.PROVIDER,
            })
            .then(function (response) {
              let user = localStorage.getItem("user");
              let userData = JSON.parse(user);
              if (userData) {
                userData.role = response.data.user.role;
                localStorage.setItem("user", JSON.stringify(userData));
              }
              let usernew = localStorage.getItem("user");
              window.location.href = "/";
            });
        })
        .catch(function (error) {
          alert("Add Failed !");
        });
    }
  };

  function handleAddressChange(val, key) {
    setAddress({ ...address, [key]: val });
  }

  return (
    <Layout>
      <Container>
        <Heading title="Become a RepairMate !" />
        <br />

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
                <option value="" disabled>
                  Choose...
                </option>
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
                onChange={(e) => handleAddressChange(e.target.value, "zipcode")}
              />
            </Form.Group>
          </Row>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Category</Form.Label>
            <Form.Select
              defaultValue="Choose..."
              value={service}
              onChange={(e) => {
                setService(e.target.value);
              }}
            >
              <option disabled>Choose...</option>;
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridRate">
            <Form.Label>Rate</Form.Label>
            <Form.Control
              placeholder="hourly rate"
              value={hourly_rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAbout">
            <Form.Label>AboutMe</Form.Label>
            <Form.Control
              placeholder="aboutme"
              as="textarea"
              style={{ height: "200px" }}
              value={aboutme}
              onChange={(e) => setAboutMe(e.target.value)}
            />
          </Form.Group>
        </Form>

        <Button
          onClick={saveProvider}
          variant="dark"
          className="w-100 mt-4 mb-5"
        >
          Became ReapairMate
        </Button>
      </Container>
    </Layout>
  );
}
