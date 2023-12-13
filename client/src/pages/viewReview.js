import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Layout from "../components/layout";
import axios from "axios";
import { Star } from "react-feather";

export default function ViewReviewPage() {
  const [data, setData] = useState({ reviews: [] });
  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    axios
      .get("http://localhost:9000/api/reviews/")
      .then(function (response) {
        const filteredServices = response.data.filter(
          (service) => String(service.providerId) === params.providerId
        );
        if (filteredServices.length) {
          setData(filteredServices[0]);
        }
      })
      .catch(function (error) {
        alert("Something went wrong !");
      });
  }

  return (
    <Layout>
      <Container className="mb-5">
        <h1 className="mt-3 mb-3">Service Provider Review</h1>
        {data.reviews && data.reviews.length ? (
          data.reviews.map((curr, index) => {
            return (
              <Card key={index.toString()} className="mb-2">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1" style={{ fontSize: "12px" }}>
                      <b>User ID: {curr.userId}</b>
                    </p>
                    <div>
                      {Array.from({ length: curr.reviewRating }).map(
                        (_, index) => (
                          <Star key={index.toString()} fill="black" size={14} />
                        )
                      )}
                    </div>
                  </div>
                  <p>{curr.reviewText}</p>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <p>No reviews Available !</p>
        )}
      </Container>
    </Layout>
  );
}
