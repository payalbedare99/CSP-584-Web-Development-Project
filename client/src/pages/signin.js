import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { loginUser } from "../controllers/auth";
import axios from "axios";

function LoginScreen({ changeScreen }) {
  const [email, setEmail] = useState("hb@gmail.com");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    if (email && password) {
      axios
        .post("http://localhost:9000/api/user/login", { email, password })
        .then(function (response) {
          console.log(response);
          let { user, token } = response.data;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("userId", user.id);
          localStorage.setItem("token", token);
          window.location.href = "/";
        })
        .catch(function (error) {
          alert("Login Failed !");
        });
    } else {
      alert("Please provide email and password !");
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <h4 style={{ fontWeight: "700" }}>User Login: </h4>
      <Form style={{ padding: "24px" }} onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            size="lg"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            size="lg"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="dark" size="lg" type="submit" className="w-100">
          Login
        </Button>
        <hr />

        <Button
          className="text-center w-100"
          variant="outline-dark"
          size="md"
          onClick={changeScreen}
        >
          New here ? Signup Now
        </Button>
      </Form>
    </div>
  );
}

export default LoginScreen;
