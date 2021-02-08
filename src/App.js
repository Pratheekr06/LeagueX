import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import Squad from "./components/Squad/Squad";
import League from "./components/League/League"
import { Route, Switch } from "react-router";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/squad/:id" exact component={Squad} />
        <Route path="/leagues/:id" exact component={League} />
      </Switch>
    </div>
  );
}

export default App;
