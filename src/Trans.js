import React, { Component } from "react";
import Transition from "react-transition-group/Transition";

class Trans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  showHandler = () => {
    this.setState({
      show: !this.state.show ? true : false,
    });
  };

  render() {
    // const style = {
    //   width: "100px",
    //   height: "100px",
    //   background: "red",
    //   transition: "opacity 2s ease-in-out",
    // };
    return (
      <div>
        <button onClick={this.showHandler}>Show/Hide</button>
        <br />
        <Transition in={this.state.show} timeOut={2000} mountOnEnter>
          {(state) => (
            <div
              style={{
                width: "100px",
                height: "100px",
                background: "red",
                transition: "opacity 2s ease",
                opacity: state === "entering" || state === "exited" ? 0 : 1,
              }}
            ></div>
          )}
        </Transition>
      </div>
    );
  }
}

export default Trans;
