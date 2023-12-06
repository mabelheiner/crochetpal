/*page used to edit our project, page 7 on canva */

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './Supabase';
import './addproject.css';
import Navbar from "./Navbar";
import Footer from './Footer';

export default function EditProject() {
  const [session, setSession] = useState(null);
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
  const [newId, setNewId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const curr_user = await supabase.auth.getSession();
      if (curr_user) {
        const user_data = curr_user.data.session.user;
        const user_info = await supabase
          .from('CurrentUsers')
          .select('*')
          .eq('email', user_data.email);
        setSession(user_info.data[0]);
      }
    };

    fetchUser();
  }, []);

  const addProject = async () => {

    if (projectName == '' || projectDescription == '' || projectUrl == '' || timeHours == '' || timeMinutes == '' || timeSeconds == '' || rowCount == '' || estimatedPrice == '') {
      alert('All fields must be filled in except the picture.')
      return;
    }
    console.log('Seconds', timeSeconds);
    console.log('Minutes', timeMinutes)
    console.log('Hours', timeHours);
    console.log('Total', Math.floor((parseInt(timeSeconds) * 1000)) + Math.floor((parseInt(timeMinutes) * 60000)) + Math.floor((parseInt(timeHours) * 3600000)));
    
    // Calculate total time in milliseconds
  const totalTimeInMilliseconds =
    parseInt(timeSeconds) * 1000 +
    parseInt(timeMinutes) * 60 * 1000 +
    parseInt(timeHours) * 60 * 60 * 1000;

  // Convert total time to a string before inserting it into the database
    const totalTimeAsString = totalTimeInMilliseconds.toString();
    console.log(totalTimeAsString);
    console.log(totalTimeInMilliseconds);
    console.log('Current row count', rowCount);
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
        alert('Error in uploading your project, please double check: \n1. All the information fields are filled out \n2. All the information is put in correctly (i.e. no numbers where integer are needed)\nNo special characters such as $, *, @\n\nPlease correct errors and try again.');
        return;
      }

      console.log('File', file);

      try {
        const {data: projectData, error: projectError} = await supabase
        .from ('UserProjects')
        .select('id')
        .order('id', {ascending: false})
        .limit(1)

        console.log('Latest Project Data', projectData[0].id);
        setNewId(projectData[0].id);

        const { data: fileData, error: fileError } = await supabase
        .storage
        .from('project_images')
        .upload(`/private/${projectData[0].id}`, file, {
          cacheControl: '360000',
          upsert: true,
        });

        console.log('File Data', fileData);

        const { data:getData, error: getError } = await supabase
        .storage
        .from('project_images')
        .getPublicUrl(projectData[0].id);
  
        console.log('Image data', getData);
        
      }
      catch {
        console.log('Unable to fetch latest project');
      }
      



      // Clear form fields and file input
      setProjectName('');
      setProjectDescription('');
      setTimeSpent('');
      setRowCount('');
      setEstimatedPrice('');
      setProjectUrl('');
      setFile(null);
    } catch (error) {
      alert('Error in adding project, please try again.')
      return;
    }
    window.location.href = '/';
  };
    return (
      <>
        <Navbar active='editproject'/>

    <div class="content">
    <div class="rightside">
          <br></br>
          <h1>Add a New Project</h1>
          <div class="text-boxes">
            <label htmlFor="name">Project Name</label>
            <input type="text" name='name' className="small_box" placeholder='Blanket' value={projectName} onChange={(e) => setProjectName(e.target.value)}></input>
            
            <label htmlFor="notes">Notes on the Project</label>
            <input type="text" name='notes' className="small_box" placeholder="On row 15, look at youtube tutorial" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}></input>            
            
            <label htmlFor="time">Time previously spent on your project</label>
            {/* <input type="text" name='time' className="small_box" placeholder="2 hours" value={timeSpent} onChange={(e) => setTimeSpent(e.target.value)}></input> */}
            <div className='time'>
            <input type="number" name='timeHours' className='small_box' placeholder='00' value={timeHours} onChange={(e) => setHours(parseInt(e.target.value))}></input>
            <p>:</p>
            <input type="number" name="timeMinutes" className='small_box' placeholder='00' value={timeMinutes} onChange={(e) => setMinutes(parseInt(e.target.value))}></input>
            <p>:</p>
            <input type="number" name="timeSeconds" className='small_box' placeholder='00' value={timeSeconds} onChange={(e) => setSeconds(parseInt(e.target.value))}></input>
            </div>

            <label htmlFor="row">Current Row</label>
            <input type="text" name='row' className="small_box" placeholder="1" value={rowCount} onChange={(e) => setRowCount(e.target.value)}></input>
            
            <label htmlFor="materials">Cost of Materials</label>
            <input type="text" name='materials' className="small_box" placeholder="10" value={estimatedPrice} onChange={(e) => setEstimatedPrice(e.target.value)}></input>
            
            <label htmlFor="link">Pattern Link</label>
            <input type="text" name='link' className="small_box" placeholder='www.etsy.com' value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)}></input>

            <label htmlFor="picture">Upload a Picture</label>
            <input type='file' name='picture' onChange={(e) => setFile(e.target.files[0])}></input>
          </div>
          <div className="leftside">
            
            <button onClick={addProject}>Add Project</button>
        </div>
        {/* <div className="imagebox-test">
          <div class ="Card">
        <h1>Test Box</h1>
        <img src="images/CrochetPal.png">
        
        </div>
        </div> */}
      </div> 
      </div> 

      <Footer />
      </>
    )
  }