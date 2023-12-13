import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { Calendar, DollarSign, User } from "react-feather";
import { Card, Col, Container, Row } from "react-bootstrap";
import Heading from "../../components/heading";
import { roles } from "../../mappings/index";
import { TrendingDown } from "react-feather";
import { TrendingUp } from "react-feather";

export default function ProfileMenuScreen() {
  const [role, setRole] = useState("");

  useEffect(() => {
    let user = localStorage.getItem("user");
    let userData = JSON.parse(user);
    if (userData?.name) {
      setRole(userData.role);
    }
  }, []);

  const options = {
    [roles.PROVIDER]: [
      {
        name: "My Profile",
        icon: <User size="40" />,
        description: "Manage your Profile",
        goto: "/myprofile",
      },
      {
        name: "My Appointments",
        icon: <Calendar size="40" />,
        description: "Manage your Appointments",
        goto: "/appointments",
      },
      {
        name: "My View",
        icon: <TrendingUp size="40" />,
        description: "Data Analytics",
        goto: "/providerView",
      },
    ],
    [roles.CUSTOMER]: [
      {
        name: "My Profile",
        icon: <User size="40" />,
        description: "Manage your Profile",
        goto: "/myprofile",
      },
      {
        name: "My Orders",
        icon: <Calendar size="40" />,
        description: "Manage your Orders",
        goto: "/myorders",
      },
      {
        name: "My View",
        icon: <TrendingUp size="40" />,
        description: "Data Analytics",
        goto: "/userview",
      },
    ],
    [roles.ADMIN]: [
      {
        name: "My Profile",
        icon: <User size="40" />,
        description: "Manage your Profile",
        goto: "/myprofile",
      },
      {
        name: "Orders",
        icon: <Calendar size="40" />,
        description: "Manage All Orders",
        goto: "/ordersAdmin",
      },
      {
        name: "Services",
        icon: <Calendar size="40" />,
        description: "Manage All Services",
        goto: "/servicesAdmin",
      },
      {
        name: "Providers",
        icon: <Calendar size="40" />,
        description: "Manage All Providers",
        goto: "/manageProvider",
      },
      {
        name: "My View",
        icon: <TrendingUp size="40" />,
        description: "Data Analytics",
        goto: "/adminView",
      },
    ],
  };

  return (
    <Layout>
      <Container>
        <Heading title={"Profile Options"} />
        <Row className="mt-2">
          {options[role] &&
            options[role].map((obj) => (
              <Col key={obj.name} lg="3" xs="6" className="mb-3">
                <Card onClick={() => (window.location.href = obj.goto)}>
                  <div className="text-center p-5">{obj.icon}</div>
                  <Card.Body className="text-center">
                    <Card.Title>{obj.name}</Card.Title>
                    <Card.Text>{obj.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </Layout>
  );
}
