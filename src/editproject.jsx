/*page used to edit our project, page 7 on canva */


import { useState, useEffect } from 'react';
import { supabase } from './Supabase';
import './editproject.css';
import Navbar from "./Navbar";


export default function Tester() {
    return (
      <>
        <header>
          <h1>This is a Test Page</h1>
        </header>
        <Navbar />
    <div class="content">
    <div class="rightside">
            <header id="edit-project-title" contenteditable="true">Write your project title here</header>
        <textarea class="projectdescription" placeholder="Write what your project is all about..."></textarea>
            <div class="text-boxes">
                <textarea class="small_box" placeholder="Write Final Time Here"></textarea>
                <textarea class="small_box" placeholder="Write your Final Row Time Here"></textarea>
            </div>
            <div class="leftside">
            <div class="image-box">Place your project image here... </div>
            <button>Click Me</button>
        </div>
      </div> 
      </div> 
      </>
    )
  }



// const Project = () => {
//     // const [session, setSession] = useState(null);

//     // useEffect(() => {
//     //     const fetchUser = async () => {
//     //     const curr_user = await supabase.auth.getSession();
//     //     if (curr_user) {
//     //         const user_data = curr_user.data.session.user;

//     //         const user_info = await supabase
//     //         .from('CurrentUsers')
//     //         .select('*')
//     //         .eq('email', user_data.email)
//     //         setSession(user_info.data[0]);
//     //     }
//     // }

//     // fetchUser();
//     // }, [])
//     <h1>Welcome to the project edit page!</h1>
//     return (
//         <>
//         {session ? (
//             <>
//             <h1>Welcome to the project edit page!</h1>
//             <Navbar />

//             </>
//         ) : (
//             <>
//         <h1>Hello from Project Edit Page!</h1>
//         <Navbar />

//         </>
//         )}
//         </>
//     )
// }





