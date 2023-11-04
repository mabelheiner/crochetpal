import { useState, Component } from "react";
import { supabase } from "./Supabase";

class RowCounter extends Component {
    constructor(props) {
        super();
        this.state = {
            count: props.current_project.rowCount
        };
        this.project = props.current_project
      }

    async componentDidMount() {
        try {
            /*
            const rowCount = await supabase
            .from('UserProjects')
            .select('rowCount')
            .eq('id', this.project.id);

            console.log('Project data', this.project);
            console.log('Data from row count grab from supabase', rowCount)
            console.log('Starting on row...', this.project.rowCount);
            this.setState({count: this.project.rowCount})
            */
           console.log('Starting at... ', this.state.count);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    addCount = async () => {
        this.setState((prevState) => ({
            count: prevState.count + 1,
          }));
        
        try {
            const { data, error } = await supabase
            .from('UserProjects')
            .update({rowCount: this.state.count + 1})
            .eq('id', this.project.id);
            console.log('Row count saved', this.state.count + 1);
            console.log('Project', this.project.id)
        }
        catch (error) {
            console.log('Error: ', error.message);
        }
        
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
