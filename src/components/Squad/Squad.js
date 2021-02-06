import React, { Component } from "react";
import Header from "../Header/Header";
import { Container, Card, Row, Col, Button, Table, Tabs, Tab, OverlayTrigger, Popover, Form } from "react-bootstrap";
import axios from "axios";
import styles from "./Squad.module.css";

class Squad extends Component {
  constructor(props){
    super(props)
    this.state = {
      players: [],
      showSquad: false,
      captainId: '',
      viceCaptainId: '',
      captainCheck: false,
      viceCaptainCheck: false,
      squadDetails: [],
      matchId: this.props.match.params.id,
      batsmanCount: 0,
      batsmanCheck: false,
      keeperCount: 0,
      keeperCheck: false,
      allRounderCount: 0,
      allRounderCheck: false,
      bowlerCount: 0,
      bowlerCheck: false,
      totalCount: 0,
      squad: [],
      errorMsg: '',
    };
  }
  

  componentDidMount() {
    axios
      .get("/squad/players?match_id=" + this.props.match.params.id, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg1NTM4LCJtb2JpbGVfbnVtYmVyIjoiODI5MjAyMDIwMiIsImlzVGVtcFVzZXIiOmZhbHNlLCJ0ZWFtX25hbWUiOiJ0ZXN0MSIsImlhdCI6MTYxMTgxODcyNiwiZXhwIjoxMDI1MTgxODcyNiwiYXVkIjoiMTg1NTM4IiwiaXNzIjoiTGVhZ3VlIFgifQ.0VfKRGO4LN9rJWuFezCOsa3RykEDwR23CYQdn_cgI_Q"
        }
      })
      .then((response) => {
        this.setState({
          players: response.data,
        });
        console.log(response.data);
      });
  }



  handleCaptainCheck= (e) => {
    this.setState({
      captainCheck: !this.state.captainCheck,
      captainId: e.target.value,
      squad:[...this.state.squad, e.target.value],
      
    });
  }

  handleViceCaptainCheck= (e) => {
    this.setState({
      viceCaptainCheck: !this.state.viceCaptainCheck,
      viceCaptainId: e.target.value,
      squad:[...this.state.squad, e.target.value]
    });
  }

  handleBatsmanCount = (e) => {
    this.setState({
      batsmanCount: ++this.state.batsmanCount,
      batsmanCheck: this.state.batsmanCount >= 7 ? true : false,
      squad:[...this.state.squad, e.target.value]
    });
  }

  handleKeeperCount = (e) => {
    this.setState({
      keeperCount: ++this.state.keeperCount,
      keeperCheck: this.state.keeperCount >= 5 ? true : false,
      squad:[...this.state.squad, e.target.value]
    });
  }

  handleAllRounderCount = (e) => {
    this.setState({
      allRounderCount: ++this.state.allRounderCount,
      allRounderCheck: this.state.allRounderCount >= 4 ? true : false,
      squad:[...this.state.squad, e.target.value]
    });
  }

  handleBowlerCount = (e) => {
    this.setState({
      bowlerCount: ++this.state.bowlerCount,
      bowlerCheck: this.state.bowlerCount >= 7 ? true : false,
      squad:[...this.state.squad, e.target.value]
    });
  }

  handleTotalCount = (e) => {
    this.setState({
      totalCount: ++this.state.totalCount,
    });
  }

  handleCreateSquad = () => {
    const {batsmanCount, keeperCount, allRounderCount, bowlerCount, errorMsg} = this.state;
    if(batsmanCount <= 0 || keeperCount <= 0 || allRounderCount <= 0 || bowlerCount <= 0) {
      this.setState({
        errorMsg: 'You have to have 11 Players in your Squad',
      });
    } else {
      this.setState({
        errorMsg: '',
      })
    }
    const squad = {
        squad: this.state.squad,
        captain_id: this.state.captainId,
        vice_captain_id: this.state.viceCaptainId,
        match_id: this.state.matchId,
        event_id: 1,
      }
      if(errorMsg === '') {
        axios.post('/squad/', squad, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg1NTM4LCJtb2JpbGVfbnVtYmVyIjoiODI5MjAyMDIwMiIsImlzVGVtcFVzZXIiOmZhbHNlLCJ0ZWFtX25hbWUiOiJ0ZXN0MSIsImlhdCI6MTYxMTgxODcyNiwiZXhwIjoxMDI1MTgxODcyNiwiYXVkIjoiMTg1NTM4IiwiaXNzIjoiTGVhZ3VlIFgifQ.0VfKRGO4LN9rJWuFezCOsa3RykEDwR23CYQdn_cgI_Q",
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then(res => {
          console.log(res.data);
        })  
        .catch(err => {
          console.log(err);
        })
      }
  }

  render() {

    const {players} = this.state;
    const squadInfo = [];

    let batsmanInfo = players.map((data) => {
      return (
        <div id="batsman">
        {data.role === "Batsman" ?
        <Table striped bordered hover variant="dark">
          <tbody>
            <tr className={styles.Pad}>
              <Row as="options" className={styles.row}>
              <Col xs={2}><img src={data.team_logo} width="50px" /></Col>
              <Col xs={4}>
                {data.name}
                <br/>
                <span>
                  ({data.country})
                </span>
              </Col>
              <Col xs={2}>{data.event_total_points}</Col>
              <Col xs={2}>{data.event_player_credit}</Col>
              <Col xs={2}>
                <Form style={{textAlign: 'center'}}>
                  <fieldset disabled={this.state.totalCount >= 11 ? true : false}>
                    <Form.Group style={{ display: 'block', textAlign: 'initial' }}  onChange={this.handleTotalCount} controlId="formBasicCheckbox">
                      <Form.Check value={data.id} onChange={this.handleCaptainCheck} disabled={this.state.captainCheck || false} className={styles.check} type="checkbox" label="C" />
                      <Form.Check value={data.id} onChange={this.handleViceCaptainCheck} disabled={this.state.viceCaptainCheck || false} className={styles.check} type="checkbox" label="VC" />
                      <Form.Check value={data.id} onChange={this.handleBatsmanCount} disabled={this.state.batsmanCheck || false} className={styles.check} type="checkbox" label="Player" />
                    </Form.Group>
                  </fieldset>
                </Form>
              </Col>
              </Row>
            </tr>
          </tbody>
         </Table>
         : null }
         </div>   
      );
    });

    let keeperInfo = players.map((data) => {
      return (
        <div id="keeper">
        {data.role === "Wicket-Keeper" ?
        <Table striped bordered hover variant="dark">
          <tbody>
            <tr className={styles.Pad}>
              <Row className={styles.row}>
              <Col xs={2}><img src={data.team_logo} width="50px" /></Col>
              <Col xs={4}>
                {data.name}
                <br/>
                <span>
                  ({data.country})
                </span>
              </Col>
              <Col xs={2}>{data.event_total_points}</Col>
              <Col xs={2}>{data.event_player_credit}</Col>
              <Col xs={2}>
                <Form style={{textAlign: 'center'}}>
                  <fieldset disabled={this.state.totalCount >= 11 ? true : false}>
                    <Form.Group style={{ display: 'block', textAlign: 'initial' }} onChange={this.handleTotalCount} controlId="formBasicCheckbox">
                      <Form.Check value={data.id} onChange={this.handleCaptainCheck} disabled={this.state.captainCheck || false} className={styles.check} type="checkbox" label="C" />
                      <Form.Check value={data.id} onChange={this.handleViceCaptainCheck} disabled={this.state.viceCaptainCheck || false} className={styles.check} type="checkbox" label="VC" />
                      <Form.Check value={data.id} onChange={this.handleKeeperCount} disabled={this.state.keeperCheck || false} className={styles.check} type="checkbox" label="Player" />
                    </Form.Group>
                  </fieldset>
                </Form>
              </Col>
              </Row>
            </tr>
          </tbody>
         </Table>
         : null }
         </div> 
      );
    });

    let allRounderInfo = players.map((data) => {
      return (
        <div id="allRounder">
        {data.role === "All-Rounder" ?
        <Table striped bordered hover variant="dark">
          <tbody>
            <tr className={styles.Pad}>
              <Row className={styles.row}>
              <Col xs={2}><img src={data.team_logo} width="50px" /></Col>
              <Col xs={4}>
                {data.name}
                <br/>
                <span>
                  ({data.country})
                </span>
              </Col>
              <Col xs={2}>{data.event_total_points}</Col>
              <Col xs={2}>{data.event_player_credit}</Col>
              <Col xs={2}>
                <Form style={{textAlign: 'center'}}>
                  <fieldset disabled={this.state.totalCount >= 11 ? true : false}>
                    <Form.Group style={{ display: 'block', textAlign: 'initial' }} onChange={this.handleTotalCount} controlId="formBasicCheckbox">
                      <Form.Check value={data.id} onChange={this.handleCaptainCheck} disabled={this.state.captainCheck || false} className={styles.check} type="checkbox" label="C" />
                      <Form.Check value={data.id} onChange={this.handleViceCaptainCheck} disabled={this.state.viceCaptainCheck || false} className={styles.check} type="checkbox" label="VC" />
                      <Form.Check value={data.id} onChange={this.handleAllRounderCount}  disabled={this.state.allRounderCheck || false} className={styles.check} type="checkbox" label="Player" />
                    </Form.Group>
                  </fieldset>
                </Form>
              </Col>
              </Row>
            </tr>
          </tbody>
         </Table>
         : null }
         </div> 
      );
    });

    let bowlerInfo = players.map((data) => {
      return (
        <div id="bowler">
        {data.role === "Bowler" ?
        <Table striped bordered hover variant="dark">
          <tbody>
            <tr className={styles.Pad}>
              <Row className={styles.row}>
              <Col xs={2}><img src={data.team_logo} width="50px" /></Col>
              <Col xs={4}>
                {data.name}
                <br/>
                <span>
                  ({data.country})
                </span>
              </Col>
              <Col xs={2}>{data.event_total_points}</Col>
              <Col xs={2}>{data.event_player_credit}</Col>
              <Col xs={2}>
                <Form style={{textAlign: 'center'}}>
                  <fieldset disabled={this.state.totalCount >= 11 ? true : false}>
                    <Form.Group style={{ display: 'block', textAlign: 'initial' }} onChange={this.handleTotalCount} controlId="formBasicCheckbox">
                      <Form.Check value={data.id} onChange={this.handleCaptainCheck} disabled={this.state.captainCheck || false} className={styles.check} type="checkbox" label="C" />
                      <Form.Check value={data.id} onChange={this.handleViceCaptainCheck} disabled={this.state.viceCaptainCheck || false} className={styles.check} type="checkbox" label="VC" />
                      <Form.Check value={data.id} onChange={this.handleBowlerCount} disabled={this.state.bowlerCheck || false} className={styles.check} type="checkbox" label="Player" />
                    </Form.Group>
                  </fieldset>
                </Form>
              </Col>
              </Row>
            </tr>
          </tbody>
         </Table>
         : null }
         </div> 
      );
    });

    const selectedPlayers = this.state.players.map(data => {
      return <li style={{listStyleType: 'none'}}>{data}</li>
    })


    return (
      <>
        <Header />
        <div className={`text-center ${styles.Tab}`}>
        <Button variant="dark" size="lg">
          PICK YOUR SQUAD
        </Button>
        <h5 className={styles.inst}>Choose 11 Players and Click On "Create Squad"</h5>
          <Button variant="info" onClick={this.handleCreateSquad}>Create Squad</Button>
          <br />
          <span className="text-danger">{this.state.errorMsg}</span>
        <Row className={styles.choose}>
          <Col xs={6} className={styles.inst}>
            <ul>
              <li><p>Max 7 Players From One Team</p></li>
              <li><p>Min 3 Max 7 Batsmen</p></li>
              <li><p>Max 4 All-Rounders</p></li>
            </ul>
          </Col>
          <Col xs={6} className={styles.inst}>
            <ul>
            <li><p>Your Squad Should Have a Captain and Vice -Captain</p></li>
            <li><p>Min 1 Max 5 Wicket-Keeper</p></li>
            <li><p>Min 3 Max 7 Bowlers</p></li>
            </ul>
          </Col>  
        </Row>
        {/* <Row className={styles.choose}>
          <Col xs={4}>
            Captain: {this.state.cap}
          </Col>
          <Col xs={4}>
          Vice Captain: {this.state.vCap}
          </Col>
          <Col xs={4}>
            Players: <ul>
              {selectedPlayers}
            </ul>
          </Col>
        </Row> */}
        {/* <Row className={styles.squadInfo}>
          <OverlayTrigger
            trigger="click"
            placement="auto"
            overlay={squadPopover}>
            <Button>See your Squad</Button>
          </OverlayTrigger>
        </Row> */}

        <Card className={styles.card}>
        <Tabs className={styles.tab} defaultActiveKey="batsman" id="uncontrolled-tab-example">
          <Tab eventKey="batsman" title="BAT">
          <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <Row className={styles.Header}>
              <Col xs={2}><th>Team</th></Col>
              <Col xs={4}><th>Name</th></Col>
              <Col xs={2}><th>Pts</th></Col>
              <Col xs={2}><th>Cr</th></Col>
              </Row>
            </tr>
          </thead>
          {batsmanInfo}
          </Table>
          </Tab>
          <Tab eventKey="keeper" title="WK">
          <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <Row className={styles.Header}>
              <Col xs={2}><th>Team</th></Col>
              <Col xs={4}><th>Name</th></Col>
              <Col xs={2}><th>Pts</th></Col>
              <Col xs={2}><th>Cr</th></Col>
              </Row>
            </tr>
          </thead>
          {keeperInfo}
          </Table>
          </Tab>
          <Tab eventKey="allRounder" title="AR">
          <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <Row className={styles.Header}>
              <Col xs={2}><th>Team</th></Col>
              <Col xs={4}><th>Name</th></Col>
              <Col xs={2}><th>Pts</th></Col>
              <Col xs={2}><th>Cr</th></Col>
              </Row>
            </tr>
          </thead>
          {allRounderInfo}
          </Table>
          </Tab>
          <Tab eventKey="bowler" title="BWL">
          <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <Row className={styles.Header}>
              <Col xs={2}><th>Team</th></Col>
              <Col xs={4}><th>Name</th></Col>
              <Col xs={2}><th>Pts</th></Col>
              <Col xs={2}><th>Cr</th></Col>
              </Row>
            </tr>
          </thead>
          {bowlerInfo}
          </Table>
          </Tab>
        </Tabs>
        </Card>
        </div>
      </>
    );
  }
}

export default Squad;
