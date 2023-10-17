/*page used to edit our project, page 7 on canva */


import { useState, useEffect } from 'react';
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

  useEffect(() => {
      const fetchUser = async () => {
      const curr_user = await supabase.auth.getSession();
      console.log(await supabase.auth.getSession())
      if (curr_user) {
          const user_data = curr_user.data.session.user;

          const user_info = await supabase
          .from('CurrentUsers')
          .select('*')
          .eq('email', user_data.email)
          setSession(user_info.data[0]);
          console.log('Session: ', session);
      }
  }

  fetchUser();
  }, [])

  const addProject = async () => {
    console.log('Add project to:', session.id);

    try {
      const {data, error} = await supabase
      .from('UserProjects')
      .insert([
        {
          userId: session.id,
          url: projectUrl,
          description: projectDescription,
          name: projectName,
          estimatedPrice: estimatedPrice,
          timeSpent: timeSpent,
          rowCount: rowCount
        }
      ])

      setProjectName('');
      setProjectDescription('');
      setTimeSpent('');
      setRowCount('');
      setEstimatedPrice('');
      setProjectUrl('');

    } catch (error) {
      console.log(error.message);
    }
  }
    return (
      <>
        <header>
          <h1>Edit Project</h1>
        </header>
        <Navbar />
    <div class="content">
    <div class="rightside">
          <div class="text-boxes">
            <textarea className="small_box" placeholder='Project Name' value={projectName} onChange={(e) => setProjectName(e.target.value)}></textarea>
            <textarea className="small_box" placeholder="Write what your project is all about..." value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}></textarea>            
            <textarea className="small_box" placeholder="Time previously spent on your project" value={timeSpent} onChange={(e) => setTimeSpent(e.target.value)}></textarea>
            <textarea className="small_box" placeholder="Write your current row count Here" value={rowCount} onChange={(e) => setRowCount(e.target.value)}></textarea>'
            <textarea className="small_box" placeholder="Cost of materials" value={estimatedPrice} onChange={(e) => setEstimatedPrice(e.target.value)}></textarea>
            <textarea className="small_box" placeholder='Pattern link here' value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)}></textarea>
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








