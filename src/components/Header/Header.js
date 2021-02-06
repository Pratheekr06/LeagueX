import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      <Navbar
        style={{ top: "0", position: "sticky" }}
        fixed="top"
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand className={styles.Brand}>
            <NavLink to="/">Fantasy League</NavLink>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
