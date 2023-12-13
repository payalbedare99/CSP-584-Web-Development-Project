import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import Layout from "../../components/layout";
import axios from "axios";

export default function MyProfilePage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let userID = localStorage.getItem("userId");
    axios
      .get(`http://localhost:9000/api/user/${userID}`)
      .then(function (response) {
        console.log(response);
        setData(response.data.user);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Layout>
      <Container class="pt-5">
        <div style={{ marginTop: "100px" }}>
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
                data.image
                  ? data.image
                  : "https://ui-avatars.com/api/?name=" + data.name
              }
              className="img-fluid"
              height={200}
              width={200}
              alt=""
            />
          </div>
          <div class="mt-5">
            <FloatingLabel
              controlId="floatingInput"
              label="User Name"
              className="mb-3"
            >
              <Form.Control value={data.name} type="text" disabled />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="User Name"
              className="mb-3"
            >
              <Form.Control value={data.email} type="email" disabled />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="User Type"
              className="mb-3"
            >
              <Form.Control value={data.role} type="text" disabled />
            </FloatingLabel>
          </div>
        </div>

        {/* <Card style={{ width: "auto", marginBottom: "24px" }}>
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
                data.image
                  ? data.image
                  : "https://ui-avatars.com/api/?name=" + data.name
              }
              className="img-fluid"
              height={200}
              width={200}
              alt=""
            />
          </div>
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>{data.email}</Card.Text>
          </Card.Body>
        </Card> */}
      </Container>
    </Layout>
  );
}
