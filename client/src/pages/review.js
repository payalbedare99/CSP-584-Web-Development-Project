import React, { useEffect, useState } from "react";
import { Container, Col, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Layout from "../components/layout";
import axios from "axios";

export default function ReviewPage() {
  const [userAge, setUserAge] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userOccupation, setUserOccupation] = useState("");
  const [reviewRating, setReviewRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const params = useParams();

  async function handleAddReview() {
    axios
      .post("http://localhost:9000/api/reviews", {
        userId: localStorage.getItem("userId"),
        providerId: params.providerId,
        userAge,
        userGender,
        userOccupation,
        reviewRating,
        reviewText,
      })
      .then(function (response) {
        console.log(response);
        axios
          .put("http://localhost:9000/api/provider", {
            providerId: response.data.providerId,
            rating: response.data.averageRating,
            reviews: response.data.reviews,
          })
          .then(function (response) {
            console.log(response);
            window.location.href = "/myorders";
          });
      })
      .catch(function (error) {
        alert("Something went wrong !");
      });
  }

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    axios
      .get("http://localhost:9000/api/provider/" + params.providerId)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Layout>
      <Container className="mb-5">
        <h1>Write Review</h1>
        <Form>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>User Age</Form.Label>
            <Form.Control
              value={userAge}
              onChange={(e) => setUserAge(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridGender">
            <Form.Label>User Gender</Form.Label>
            <Form.Control
              value={userGender}
              onChange={(e) => setUserGender(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridOccupation">
            <Form.Label>User Occupation</Form.Label>
            <Form.Control
              value={userOccupation}
              onChange={(e) => setUserOccupation(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridRating">
            <Form.Label>Rating:</Form.Label>
            <Form.Select
              defaultValue="Choose..."
              value={reviewRating}
              onChange={(e) => {
                setReviewRating(e.target.value);
              }}
            >
              <option disabled>Choose...</option>;
              {[1, 2, 3, 4, 5].map((rating) => {
                return (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridReview">
            <Form.Label>ReviewText</Form.Label>
            <Form.Control
              placeholder="ReviewText"
              as="textarea"
              style={{ height: "200px" }}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleAddReview();
            }}
          >
            Submit Review
          </Button>
        </Form>
      </Container>
    </Layout>
  );
}
