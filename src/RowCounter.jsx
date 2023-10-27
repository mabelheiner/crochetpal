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
            <div className="counterDisplay">
                <button onClick={this.decCount}>-</button>                
                <h2>{count}</h2>
                <button onClick={this.addCount}>+</button>
            </div>
            </>
        )
    }
}

export default RowCounter;
