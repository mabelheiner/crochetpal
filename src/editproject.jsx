/*page used to edit our project, page 7 on canva */

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './Supabase';
import './editproject.css';
import Navbar from "./Navbar";

export default function Tester() {
  const [session, setSession] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [rowCount, setRowCount] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

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

  const clearFileInput = () => {
    if (fileInputRef.current && fileInputRef.current.parentNode) {
      const newFileInput = document.createElement('input');
      newFileInput.type = 'file';
      newFileInput.accept = '.png';

      // Replace the existing file input with the new one
      fileInputRef.current.parentNode.replaceChild(newFileInput, fileInputRef.current);

      // Clear the file state variable
      setFile(null);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

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

      /* try {
        if (file) {
          const { data, file_error } = await supabase.storage
            .from('project_images')
            .upload(`Pattern_Images/${file.name}`, file, { contentType: file.type });

          if (file_error) {
            console.log('Upload failed', file_error.message);
          } else {
            console.log('File uploaded successfully', data);
          }
        }
      } catch (f_error) {
        console.log('Unable to upload', f_error.message);
      } */

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
          <h1>Edit Project</h1>
        </header>
        <Navbar />
    <div class="content">
      {error ? (
        <div>
          <p>{error.message}</p>
        </div>
      ): (<></>)}
    <div class="rightside">
          <div class="text-boxes">
            <input type="text" className="small_box" placeholder='Project Name' value={projectName} onChange={(e) => setProjectName(e.target.value)}></input>
            <input type="text" className="small_box" placeholder="Write what your project is all about..." value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}></input>            
            <input type="text" className="small_box" placeholder="Time previously spent on your project" value={timeSpent} onChange={(e) => setTimeSpent(e.target.value)}></input>
            <input type="text" className="small_box" placeholder="Write your current row count Here" value={rowCount} onChange={(e) => setRowCount(e.target.value)}></input>
            <input type="text" className="small_box" placeholder="Cost of materials" value={estimatedPrice} onChange={(e) => setEstimatedPrice(e.target.value)}></input>
            <input type="text" className="small_box" placeholder='Pattern link here' value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)}></input>
            {/* <input ref={fileInputRef} type="file" accept=".png" onChange={handleFileChange}></input> */}
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