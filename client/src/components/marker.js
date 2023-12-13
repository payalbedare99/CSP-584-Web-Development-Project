import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import Header from "../components/header";
import Footer from "../components/footer";
import { Container } from "react-bootstrap";
import GoogleMapReact from "google-map-react";
import { Button } from "react-bootstrap";

const Marker = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        background:
          "url(https://www.svgrepo.com/download/202667/maps-and-flags-pin.svg) center/cover no-repeat",
        position: "relative",
        cursor: "pointer",
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "-15px",
            background: "white",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Marker;
