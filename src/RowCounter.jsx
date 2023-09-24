import { useState, Component } from "react";

class RowCounter extends Component {
    constructor() {
        super();
        this.state = {
          count: 0,
        };
      }

    addCount = () => {
        this.setState((prevState) => ({
            count: prevState.count + 1,
          }));
    };

    decCount = () => {
        this.setState((prevState) => ({
            count: prevState.count - 1,
    }));
    };

    render() {
        const { count } = this.state;
        return (
            <>
            <h1>Row Count</h1>
            <button onClick={this.addCount}>+</button>
            <p>{count}</p>
            <button onClick={this.decCount}>-</button>
            </>
        )
    }
}

export default RowCounter;
