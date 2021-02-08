import React, { Component } from "react";
import Header from "../Header/Header";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import styles from "./League.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Home extends Component {
  state = {
    leagues: [],
  };

  componentDidMount() {
    axios
      .get("/leagues?match_id=" + this.props.match.params.id, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg1NTM4LCJtb2JpbGVfbnVtYmVyIjoiODI5MjAyMDIwMiIsImlzVGVtcFVzZXIiOmZhbHNlLCJ0ZWFtX25hbWUiOiJ0ZXN0MSIsImlhdCI6MTYxMTgxODcyNiwiZXhwIjoxMDI1MTgxODcyNiwiYXVkIjoiMTg1NTM4IiwiaXNzIjoiTGVhZ3VlIFgifQ.0VfKRGO4LN9rJWuFezCOsa3RykEDwR23CYQdn_cgI_Q"
        }
      })
      .then((response) => {
        this.setState({
          leagues: response.data.leagues,
        });
        console.log(this.state.leagues);
      });
  }

  render() {
    let leagueData = this.state.leagues.map((data) => {
      return (
        <Card className={`mb-3 ${styles.Main}`} key={data.id}>
        <Card.Header as="h6" className="text-center">{data.display_name.toUpperCase()}</Card.Header>
        <Card.Body className={styles.cardBody}>
          <Row className="league-row">
            <Col xs={3}>
              <p>{`Win Rs.${data.winning_amount}`}</p>
              <p>{`League Size: ${data.winning_amount_splitup.leagueSize} Slots`}</p>
              <p>{`Filled Slotes: ${data.is_filled === false ? 0 : data.max_limit}`}</p>
            </Col>
            <Col xs={3}>
                <h6>Referral Code</h6>
                {data.referral_code}
            </Col>
            <Col xs={2}>
                <h6>League Type</h6>
                {data.winning_amount_splitup.type.toUpperCase()}
            </Col>
            <Col xs={2}>
              <div>
                  <h6>Total Winners</h6>
                {data.winning_amount_splitup.totalWinners}
              </div>
            </Col>
            <Col xs={1}>
                <div>
                    <h6>Entry Fees</h6>
                    {data.entry_fee}
                </div>
            </Col>
          </Row>
          <Row>
            <Button size="sm" as={NavLink} to={'/squad/' + data.match_id} style={{ display: 'table', margin: 'auto' }}>Create Squad</Button>
          </Row>
        </Card.Body>
      </Card>
      );
    });

    return (
      <>
        <Header />
        <Container fluid className={styles.Main}>
            <h4 className="text-center">Upcoming Leagues</h4>
            {leagueData}
        </Container>
      </>
    );
  }
}

export default Home;
