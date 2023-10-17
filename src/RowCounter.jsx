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
            count: prevState.count > 0 ? prevState.count - 1 : 0,
    }));
    };

    render() {
        const { count } = this.state;
        return (
            <>
            <h1>Row Count</h1>
            <div className="counterDisplay">
                <button onClick={this.decCount}>-</button>                
                <p>{count}</p>
                <button onClick={this.addCount}>+</button>
            </div>
            </>
        )
    }
}

export default RowCounter;
