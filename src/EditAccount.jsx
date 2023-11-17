import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './Supabase';
import './EditAccount.css';
import Navbar from "./Navbar";
import LoadingScreen from './LoadingScreen';


export default function EditAccount() {
    const [session, setSession] = useState(null);
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');

    

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const curr_user = await supabase.auth.getSession();
    //         if (curr_user) {
    //             const user_data = curr_user.data.session.user;
    
    //             const user_info = await supabase
    //             .from('CurrentUsers')
    //             .select('*')
    //             .eq('email', user_data.email)
    //             setSession(user_info.data[0]);
    //         }
    //     }
    //     if (session == null){
    //         fetchUser();
    //         return <LoadingScreen />
    //     }
    // }, [])


//-----------------------------------------------------

//-----------------------------------------------------

    return (
        <> 
            <Navbar active='account'/>                     

            {session ? (
                <>
                <div className='editers'>
                    <div className='text-boxes'>
                    <label htmlFor="name1">Account First Name</label>
                    <input type="text" name="firstname" className='small_box' placeholder={session.finame} onChange={(e) => setFirstName(e.target.value)}/>
                    
                    <label htmlFor="name1">Account Last Name</label>
                    <input type="text" name="lastname" className='small_box' placeholder={session.name} onChange={(e) => setLastName(e.target.value)}/>
                    
                    <label htmlFor="notes">Username</label>
                    <input type='text' name='user' className='small_box' placeholder={session.description} onChange={(e) => setUser(e.target.value)}/>
                    
                    <label htmlFor="name1">Email Address</label>
                    <input type="text" name="email" className='small_box' placeholder={session.name} onChange={(e) => setEmail(e.target.value)}/>

                </div>
                <div className='leftside'>
                    <button onClick={saveUser}>Save Account Info</button>
                </div>
                </div>
                </>
            ) : null}
        </>
    );
}