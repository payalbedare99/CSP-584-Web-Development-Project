import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import Header from "../components/header";
import Footer from "../components/footer";
import { Container } from "react-bootstrap";

function Layout({ children, cb = () => {} }) {
  return (
    <>
      <Header />
      <div style={{ minHeight: "calc(100vh - 130px)" }}>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
