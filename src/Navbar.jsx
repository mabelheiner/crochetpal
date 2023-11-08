/*This simply edits the nav bar*/

import { useState, useEffect } from 'react';
import { supabase } from './Supabase';
import './Navbar.css';

const Navbar = (props) => {
    const [session , setSession] = useState(null);
    console.log('props.active:', props.active)

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
        {/* <h1>Crochet Pals</h1>
        <p><i>Crocheting together one step at a time!</i></p> */}
        <div class="underline">
            <nav>
            <ul>
                <li className={props.active == 'home' ? 'active': null}><a href="/">Home</a></li>
                <li className={props.active == 'editproject' ? 'active': null}><a href="/addproject">Add Project</a></li>
                <li className={props.active == 'pricing' ? 'active': null}><a href="/pricing">Pricing</a></li>
        {session ? (
                <li><a href="/account">Account</a></li>
        ):(
                <li><a href="/login">Login</a></li>
        )}
        </ul>
        </nav>
        </div>
        </>
    )
}

export default Navbar;