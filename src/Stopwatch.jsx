import { Component } from 'react';
import { supabase } from './Supabase';

export default class Stopwatch extends Component {
    constructor(props) {
        super();
        this.state = {
            isRunning: false,
        }
        this.intervalId = null;
        this.projectId = props.current_project.id
    }

    async componentDidMount() {
        try {
            const startTime = await supabase
            .from('UserProjects')
            .select('timeSpent')
            .eq('id', this.projectId);

            console.log('Starting at...', startTime.data[0].timeSpent)
            const intStartTime = parseInt(startTime.data[0].timeSpent);
            this.setState({elapsedTime: intStartTime});
        } catch (error) {
            console.log(error.message)
        }
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

    saveTime = async (time) => {
        console.log('Save Time', time);
        console.log('Current Project', this.projectId);
            try {
                const { data, error } = await supabase
                .from('UserProjects')
                .update({ timeSpent: time })
                .eq('id', this.projectId);
            }
            catch (error) {
                console.log('Error', error.message)
            }
            finally {
                const timeSpent = await supabase
                .from('UserProjects')
                .select('timeSpent')
                .eq('id', this.projectId);

                console.log('Time Spent', timeSpent.data[0].timeSpent);
            }
    };

    render() {
        const {isRunning, elapsedTime} = this.state;

        if (!isRunning) {
            this.saveTime(elapsedTime);
        }

        return (
            <>
            <h2>{this.formatTime(elapsedTime)}</h2>
            <button onClick={this.startTimer} disabled={isRunning}>Start</button>
            <button onClick={this.stopTimer} disabled={!isRunning}>Stop</button>
            <button onClick={this.resetTimer}>Reset</button>
            </>
        );
    }
}