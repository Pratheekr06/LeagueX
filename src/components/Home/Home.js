import React, { Component } from "react";
import Header from "../Header/Header";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import styles from "./Home.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Home extends Component {
  state = {
    matches: [],
  };

  componentDidMount() {
    axios
      .get("/matches/upcoming-matches", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg1NTM4LCJtb2JpbGVfbnVtYmVyIjoiODI5MjAyMDIwMiIsImlzVGVtcFVzZXIiOmZhbHNlLCJ0ZWFtX25hbWUiOiJ0ZXN0MSIsImlhdCI6MTYxMTgxODcyNiwiZXhwIjoxMDI1MTgxODcyNiwiYXVkIjoiMTg1NTM4IiwiaXNzIjoiTGVhZ3VlIFgifQ.0VfKRGO4LN9rJWuFezCOsa3RykEDwR23CYQdn_cgI_Q"
        }
      })
      .then((response) => {
        this.setState({
          matches: response.data.matches.cricket,
        });
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let matchData = this.state.matches.map((data) => {
      return (
        <Card className={`mb-3 ${styles.Main}`} key={data.id}>
        <Card.Header as="h6" className="text-center">{`${data.t1_short_name} vs ${data.t2_short_name} ${data.match_type}`}</Card.Header>
        <Card.Body className={styles.cardBody}>
          <Row>
            <Col xs={4}>
              <img src={data.t1_image} alt={data.t1_name} width="80px" />
            </Col>
            <Col xs={4}>
              <h4 className="text-center">
              {`${data.t1_short_name} vs ${data.t2_short_name}`}
              </h4>
              <p className="text-center">
                {data.match_status}
              </p>
              <Button size="sm" as={NavLink} to={'/squad/' + data.id} style={{ display: 'table', margin: '10px auto' }}>Create Squad</Button>
              <Button size="sm" as={NavLink} to={'/leagues/' + data.id} style={{ display: 'table', margin: '10px auto' }}>Leagues</Button>
            </Col>
            <Col xs={4}>
              <img src={data.t2_image} alt={data.t2_name} className={styles.t2Image} width="80px" />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      );
    });

    return (
      <>
        <Header />
        <Container fluid className={styles.Main}>
            {matchData}
        </Container>
      </>
    );
  }
}

export default Home;
