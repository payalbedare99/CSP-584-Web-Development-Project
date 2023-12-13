import React, { useEffect, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";

function SignupScreen({ changeScreen }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();
    if (name && email && password) {
      axios
        .post("http://localhost:9000/api/user/signup", {
          name,
          email,
          password,
          contact: phoneNumber,
        })
        .then(function (response) {
          window.location.href = "/auth";
        })
        .catch(function (error) {
          alert("Signup Failed !");
        });
    } else {
      alert("Please provide email and password !");
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <h4 style={{ fontWeight: "700" }}>User Signup: </h4>
      <Form style={{ padding: "24px" }} onSubmit={handleSignup}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control
            type="text"
            placeholder="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="lg"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            size="lg"
          />
        </Form.Group>
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Text>+1</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              size="lg"
              required
            />
          </InputGroup>
        </div>
        <Button variant="dark" size="lg" type="submit" className="w-100">
          Signup
        </Button>
        <hr />
        <Button
          className="text-center w-100"
          variant="outline-dark"
          size="md"
          onClick={changeScreen}
        >
          Already have an account? Signin
        </Button>
      </Form>
    </div>
  );
}

export default SignupScreen;
