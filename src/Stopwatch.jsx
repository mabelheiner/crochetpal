import { Component } from 'react';

export default class Stopwatch extends Component {
    constructor() {
        super();
        this.state = {
            isRunning: false,
            elapsedTime: 0,
        }
        this.intervalId = null;
    }
    componentWillUnmount() {
        this.stopTimer();
    }

    startTimer = () => {
        if (!this.state.isRunning) {
            this.setState({isRunning: true}, () => {
                this.intervalId = setInterval(this.updateTimer, 10);
            });
        };
    };

    stopTimer = () => {
        if (this.state.isRunning) {
            clearInterval(this.intervalId);
            this.setState({isRunning: false});
        }
    };

    resetTimer = () => {
        this.stopTimer();
        this.setState({elapsedTime: 0});
    };

    updateTimer = () => {
        this.setState((prevState) => ({
            elapsedTime: prevState.elapsedTime + 10,
        }));
    };

    formatTime = (time) => {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 600000) % 60);
        return (
            String(minutes).padStart(2, '0') +
            ':' +
            String(seconds).padStart(2, '0')
        );
    };

    render() {
        const {isRunning, elapsedTime} = this.state;
        return (
            <>
            <h1>{this.formatTime(elapsedTime)}</h1>
            <button onClick={this.startTimer} disabled={isRunning}>Start</button>
            <button onClick={this.stopTimer} disabled={!isRunning}>Stop</button>
            <button onClick={this.resetTimer}>Reset</button>
            </>
        );
    }
}