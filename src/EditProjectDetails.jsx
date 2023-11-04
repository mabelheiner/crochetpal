import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './Supabase';
import './EditProjectDetails.css';
import Navbar from "./Navbar";

export default function EditProjectDetails() {
    const params = useParams();
    const [project, setProject] = useState(null);

    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [timeSpent, setTimeSpent] = useState('');
    const [timeHours, setHours] = useState(0);
    const [timeMinutes, setMinutes] = useState(0);
    const [timeSeconds, setSeconds] = useState(0);
    const [rowCount, setRowCount] = useState('');
    const [estimatedPrice, setEstimatedPrice] = useState('');
    const [projectUrl, setProjectUrl] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const { data, error } = await supabase
                    .from('UserProjects')
                    .select('*')
                    .eq('id', params.id);
    
                if (error) {
                    console.error('Error fetching project:', error);
                } else if (data && data.length > 0) {
                    console.log('project', data[0])
                    setProject(data[0]);
                    formatTime(data[0].timeSpent);
                }
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };

        fetchProject(); 
    }, [params.id]);

    const formatTime = (time) => {
        setSeconds(Math.floor((time / 1000) % 60));
        setMinutes(Math.floor((time / 60000) % 60));
        setHours(Math.floor((time / 3600000) % 60));

        return (
            String(timeHours).padStart(2, '0') + 
            ':' +
            String(timeMinutes).padStart(2, '0') +
            ':' +
            String(timeSeconds).padStart(2, '0')
        );
    };

    const saveProject = async () => {
        const totalTimeInMilliseconds =
        parseInt(timeSeconds) * 1000 +
        parseInt(timeMinutes) * 60 * 1000 +
        parseInt(timeHours) * 60 * 60 * 1000;

        // Convert total time to a string before inserting it into the database
        const totalTimeAsString = totalTimeInMilliseconds.toString();
        console.log(totalTimeAsString);
        console.log(totalTimeInMilliseconds);

        try {
            const { data, error } = await supabase
              .from('UserProjects')
              .insert([
                {
                  userId: session.id,
                  url: projectUrl,
                  description: projectDescription,
                  name: projectName,
                  estimatedPrice: estimatedPrice,
                  timeSpent: totalTimeInMilliseconds,
                  rowCount: parseInt(rowCount),
                },
              ]);
      
            if (error) {
              console.log(error.message);
              setError(error);
            }

            setProjectName('');
            setProjectDescription('');
            setTimeSpent('');
            setRowCount('');
            setEstimatedPrice('');
            setProjectUrl('');
            console.log('project saved');
        } catch (error) {
            console.log(error.message);
          }
    }

    return (
        <>
            <h1>Edit Project Details</h1>   
            <Navbar active='home'/>                     

            {project ? (
                <div className='rightside'>
                    <div className='text-boxes'>
                    <label htmlFor="name">Project Name</label>
                    <input type="text" name="name" className='small_box' value={project.name} onChange={(e) => setProjectName(e.target.value)}/>

                    <label htmlFor="notes">Notes on the Project</label>
                    <input type='text' name='notes' className='small_box' value={project.description} onChange={(e) => setProjectDescription(e.target.value)}/>

                    <label htmlFor="time">Time previously spent on your project</label>
                    <div className='time'>
                    <input type="number" name='timeHours' className='small_box' placeholder='00' value={timeHours} onChange={(e) => setHours(parseInt(e.target.value))}></input>
                    <p>:</p>
                    <input type="number" name="timeMinutes" className='small_box' placeholder='00' value={timeMinutes} onChange={(e) => setMinutes(parseInt(e.target.value))}></input>
                    <p>:</p>
                    <input type="number" name="timeSeconds" className='small_box' placeholder='00' value={timeSeconds} onChange={(e) => setSeconds(parseInt(e.target.value))}></input>
                </div>

                    <label htmlFor="row">Current Row</label>
                    <input type="text" name="row" className='small_box' value={project.rowCount} onChange={(e) => setRowCount(e.target.value)}/>

                    <label htmlFor="price">Estimated Price</label>
                    <input type='text' name='price' className='small_box' value={project.estimatedPrice} onChange={(e) => setEstimatedPrice(e.target.value)}/>

                    <label htmlFor="link">Pattern Link</label>
                    <input type='text' name='link' className='small_box' value={project.url} onChange={(e) => setProjectUrl(e.target.value)}/>
                </div>
                <div className='leftside'>
                    <button onClick={saveProject}>Save Project</button>
                </div>
                </div>
            ) : null}
        </>
    );
}