/*page used to edit our project, page 7 on canva */

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './Supabase';
import './editproject.css';
import Navbar from "./Navbar";

export default function EditProject() {
  const [session, setSession] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [rowCount, setRowCount] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [error, setError] = useState('');

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
            timeSpent: timeSpent,
            rowCount: rowCount,
          },
        ]);

      if (error) {
        console.log(error.message);
        setError(error);
      }

      // Clear form fields and file input
      setProjectName('');
      setProjectDescription('');
      setTimeSpent('');
      setRowCount('');
      setEstimatedPrice('');
      setProjectUrl('');
      setFile('');
      clearFileInput();
    } catch (error) {
      console.log(error.message);
    }
  };
    return (
      <>
        <header>
          <h1>Add New Project</h1>
        </header>
        <Navbar active='editproject'/>
    <div class="content">
      {error ? (
        <div>
          <p>{error.message}</p>
        </div>
      ): (<></>)}
    <div class="rightside">
          <div class="text-boxes">
            <label htmlFor="name">Project Name</label>
            <input type="text" name='name' className="small_box" placeholder='Blanket' value={projectName} onChange={(e) => setProjectName(e.target.value)}></input>
            
            <label htmlFor="notes">Notes on the Project</label>
            <input type="text" name='notes' className="small_box" placeholder="On row 15, look at youtube tutorial" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}></input>            
            
            <label htmlFor="time">Time previously spent on your project</label>
            <input type="text" name='time' className="small_box" placeholder="2 hours" value={timeSpent} onChange={(e) => setTimeSpent(e.target.value)}></input>
            
            <label htmlFor="row">Current Row</label>
            <input type="text" name='row' className="small_box" placeholder="1" value={rowCount} onChange={(e) => setRowCount(e.target.value)}></input>
            
            <label htmlFor="materials">Cost of Materials</label>
            <input type="text" name='materials' className="small_box" placeholder="$10" value={estimatedPrice} onChange={(e) => setEstimatedPrice(e.target.value)}></input>
            
            <label htmlFor="link">Pattern Link</label>
            <input type="text" name='link' className="small_box" placeholder='www.etsy.com' value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)}></input>
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
      </>
    )
  }