import Container from "react-bootstrap/Container";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    let user = localStorage.getItem("user");
    let userData = JSON.parse(user);
    if (userData?.name) {
      setUserName(userData.name);
    }
  }, []);

  const signout = () => {
    localStorage.clear();
    setUserName("");
    window.location.href = "/";
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand style={{ fontStyle: "italic" }} href="/">
          RepairMate
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/services">All Services</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/nearme">Find Nearby</Nav.Link>
          </Nav>
          <Nav>
            {userName ? (
              <NavDropdown
                title={`Welcome, ${userName}`}
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href={"/profile_menu"}>
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={signout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button
                size="md"
                variant="outline-light"
                onClick={() => (window.location.href = "/auth")}
              >
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
