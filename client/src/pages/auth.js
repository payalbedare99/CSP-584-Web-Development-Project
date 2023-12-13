import { useState } from "react";
import React from "react";
import { Image, Row, Col, Container } from "react-bootstrap";

import Signin from "./signin";
import Signup from "./signup";

export default function AuthScreen() {
  const [screen, setScreen] = useState("login");

  function changeScreen() {
    setScreen(screen == "login" ? "signin" : "login");
  }

  return (
    <div style={{ height: "100vh" }}>
      <Row>
        <Col xs="0" lg="8">
          <Image
            src="/images/banner.jpg"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              height: "100vh",
              width: "auto",
            }}
          />
        </Col>
        <Col xs="12" lg="4" style={{ backgroundColor: "#fff" }}>
          <Container>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                height: "100vh",
              }}
            >
              {screen == "login" ? (
                <Signin changeScreen={changeScreen} />
              ) : (
                <Signup changeScreen={changeScreen} />
              )}
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
