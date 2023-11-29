import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './Supabase';
import './EditProjectDetails.css';
import Navbar from "./Navbar";
import EditProjectLoading from './EditProjectLoading';
import Footer from './Footer';

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
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const updateEstimatedPrice = async (newEstimatedPrice) => {
        try {
            const { data, error } = await supabase
                .from('UserProjects')
                .update({ estimatedPrice: newEstimatedPrice })
                .eq('id', params.id);
    
            if (error) {
                console.error('Error updating estimated price:', error);
            } else {
                console.log('Estimated price updated:', data);
            }
        } catch (error) {
            console.error('Error updating estimated price:', error);
        }
    };

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
                    setHours(Math.floor((data[0].timeSpent / 3600000) % 60));
                    setMinutes(Math.floor((data[0].timeSpent / 60000) % 60));
                    setSeconds(Math.floor((data[0].timeSpent / 1000) % 60));
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

        const totalTimeAsString = totalTimeInMilliseconds.toString();
        console.log('Total', totalTimeAsString);
        console.log('total', totalTimeInMilliseconds);
        console.log('hours', timeHours);
        console.log('minutes', timeMinutes);
        console.log('seconds', timeSeconds);
        console.log('Project Id', params.id);

        console.log('Estimated Price: ', estimatedPrice)
        if (estimatedPrice != "") {
            console.log('Price update needed');
            updateEstimatedPrice();
        }
        else {
            console.log('No price update.')
        }

        console.log('Project Price', project.estimatedPrice)

        try {
            const { data, error } = await supabase
              .from('UserProjects')
              .update([
                {
                  userId: project.userId,
                  url: projectUrl || project.url,
                  description: projectDescription || project.description,
                  name: projectName || project.name,
                  estimatedPrice: estimatedPrice || project.estimatedPrice,
                  timeSpent: totalTimeInMilliseconds,
                  rowCount: parseInt(rowCount) || project.rowCount,
                },
              ])
              .eq('id', params.id);
      
            if (error) {
              console.log(error.message);
              setError(error);
            }

            console.log('File input', file);
            if (file != null) {
                console.log('project name', project.name)
                const {data: fileData, error: fileError} = await supabase
                .storage
                .from('project_images')
                .upload(`/private/${params.id}`, file, {
                    cacheControl: '360000',
                    upsert: true,
                });

                if (fileError) {
                    console.log('Error', error);
                }

                console.log('File data', fileData)

                if (!fileError) {
                    setIsLoading(true);
                    setTimeout(() => {
                        setIsLoading(false);
                        
                    }, 20000)
                    
                }
            }
            else {
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                    
                }, 10000)
                
            }
            
            console.log('project saved');
        } catch (error) {
            console.log(error);
          }

        finally {
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
            
        }
    }

    if (isLoading) {
        return <EditProjectLoading />;
    }

    return (
        <> 
            <Navbar active='home'/>                     

            {project ? (
                <div className='rightside'>
                    <div className='text-boxes'>
                    <label htmlFor="name">Project Name</label>
                    <input type="text" name="name" className='small_box' placeholder={project.name} onChange={(e) => setProjectName(e.target.value)}/>

                    <label htmlFor="notes">Notes on the Project</label>
                    <input type='text' name='notes' className='small_box' placeholder={project.description} onChange={(e) => setProjectDescription(e.target.value)}/>

                    <label htmlFor="time">Time previously spent on your project</label>
                    <div className='time'>
                    <input type="number" name='timeHours' className='small_box' placeholder={timeHours < 10 ? '0' + timeHours : timeHours} onChange={(e) => setHours(parseInt(e.target.value))}></input>
                    <p>:</p>
                    <input type="number" name="timeMinutes" className='small_box' placeholder={timeMinutes < 10 ? '0' + timeMinutes : timeMinutes} onChange={(e) => setMinutes(parseInt(e.target.value))}></input>
                    <p>:</p>
                    <input type="number" name="timeSeconds" className='small_box' placeholder={timeSeconds < 10 ? '0' + timeSeconds : timeSeconds} onChange={(e) => setSeconds(parseInt(e.target.value))}></input>
                </div>

                    <label htmlFor="row">Current Row</label>
                    <input type="text" name="row" className='small_box' placeholder={project.rowCount} onChange={(e) => setRowCount(e.target.value)}/>

                    <label htmlFor="price">Estimated Price</label> 
                    <a href={`/pricing`} target='_ '>Need Help? Click Me</a>
                    <input type='text' name='price' className='small_box' placeholder={project.estimatedPrice} onChange={(e) => setEstimatedPrice(e.target.value)}/>

                    <label htmlFor="link">Pattern Link</label>
                    <input type='text' name='link' className='small_box' placeholder={project.url} onChange={(e) => setProjectUrl(e.target.value)}/>

                    <label htmlFor="picture">Upload a Picture</label>
                    <input type='file' name='picture' onChange={(e) => setFile(e.target.files[0])}></input>
                </div>
                <div className='leftside'>
                    <button onClick={saveProject}>Save Project</button>
                </div>
                </div>
            ) : null}

        <Footer />
        </>
    );
}