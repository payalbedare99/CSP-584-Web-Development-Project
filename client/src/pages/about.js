import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Layout from "../components/layout";
import Heading from "../components/heading";
import { TASK_TITLE } from "../mappings";
import { GitHub, Linkedin, Twitter } from "react-feather";

export default function AboutPage() {
  const handleConnectWithRepairMate = (event) => {
    window.location.href = "/";
  };

  const data = [
    {
      name: "Pramod",
      github: "#",
      linkedin: "#",
      img: "/images/pramod.png",
    },
    {
      name: "Abhishek",
      github: "#",
      linkedin: "#",
      img: "/images/abhishek.png",
    },
    { name: "Payal", github: "#", linkedin: "#", img: "/images/payal.png" },
  ];

  return (
    <Layout>
      <Container>
        <section id="team" className="team section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Team</h2>
              <p>
                Welcome to Repairmate, where convenience meets expertise! We
                understand that when it comes to device repairs, Cleaning &
                Maintainance you want a solution that is fast, reliable, and
                hassle-free service. That's why we created the Repairmate App
                your go-to platform for seamless service experience.
              </p>
            </div>

            <div className="row">
              {data.map((obj) => {
                return (
                  <div
                    className="col-lg-6 mt-4"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                  >
                    <div className="member d-flex align-items-start">
                      <div className="pic">
                        <img src={obj.img} className="img-fluid" alt="" />
                      </div>
                      <div className="member-info">
                        <h4>{obj.name}</h4>
                        <span></span>
                        <p></p>
                        <div className="social">
                          <a href={obj.linkedin}>
                            <Linkedin />
                          </a>
                          <a href={obj.github}>
                            <GitHub />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
