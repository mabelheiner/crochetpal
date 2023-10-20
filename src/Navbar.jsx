/*This simply edits the nav bar*/

import { useState, useEffect } from 'react';
import { supabase } from './Supabase';
import './Navbar.css';

const Navbar = () => {
    const [session , setSession] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
        const curr_user = await supabase.auth.getSession();
        if (curr_user) {
            const user_data = curr_user.data.session.user;

            const user_info = await supabase
            .from('CurrentUsers')
            .select('*')
            .eq('email', user_data.email)
            
            setSession(user_info.data[0]);
            }
        }

    fetchUser();
    }, [])
    return (
        <>
        {session ? (
            <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="project">Project</a></li>
                <li><a href="editproject">Edit Project</a></li>
                <li><a href="pricing">Pricing</a></li>
                <li><a href="account">Account</a></li>
            </ul>
            </nav>
        ): (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="project">Project</a></li>
                <li><a href="editproject">Edit Project</a></li>
                <li><a href="pricing">Pricing</a></li>
                <li><a href="login">Login</a></li>
            </ul>
        </nav>
        )}
        </>
    )
}

export default Navbar;