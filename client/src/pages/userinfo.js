import React from "react";

import { Calendar, DollarSign, Layout, User } from "react-feather";
import { Card, Col, Container, Row } from "react-bootstrap";
import Heading from "../components/heading";

const options = [
  {
    name: "My Profile",
    icon: <User size="40" />,
    description: "Manage your membership, view benefits, and payment settings",
    goto: "/",
  },
  {
    name: "My Appointments",
    icon: <Calendar size="40" />,
    description: "Manage your membership, view benefits, and payment settings",
    goto: "/",
  },
  {
    name: "My Payments",
    icon: <DollarSign size="40" />,
    description: "Manage your membership, view benefits, and payment settings",
    goto: "/",
  },
  {
    name: "My Profile",
    icon: <User size="40" />,
    description: "Manage your membership, view benefits, and payment settings",
    goto: "/",
  },
  {
    name: "My Appointments",
    icon: <Calendar size="40" />,
    description: "Manage your membership, view benefits, and payment settings",
    goto: "/",
  },
  {
    name: "My Payments",
    icon: <DollarSign size="40" />,
    description: "Manage your membership, view benefits, and payment settings",
    goto: "/",
  },
];

export default function ProfileMenuScreen() {
  return (
    <Layout>
      <Container>
        <Heading title={"Profile Options"} />
        <Row className="mt-2">
          {options.map((obj) => {
            return (
              <Col key={obj.name} lg="3" xs="6" className="mb-3">
                <Card onClick={() => (window.location.href = obj.goto)}>
                  <div className="text-center p-5">{obj.icon}</div>
                  <Card.Body className="text-center">
                    <Card.Title>{obj.name}</Card.Title>
                    <Card.Text>{obj.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Layout>
  );
}
