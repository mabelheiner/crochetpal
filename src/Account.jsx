/*Account Page/ User info */

import { useState, useEffect } from 'react';
import './Account.css';
import Navbar from './Navbar';
import Login from './Login';
import { supabase } from './Supabase';

const Account = () => {
    const [session, setSession] = useState(null);

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

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            setSession(null)
        } catch (error) {
            alert('Error logging out: ', error.message);
        }
    }
    return (
        <>
        {session ? (
            <>
        <h1>Welcome, {session.firstName}!</h1>
        <Navbar />
        <div className='Account'>
            <h2>Your Account Information:</h2>
            <ul class="account-info">
                <li><strong>First Name: </strong>{session.firstName}</li>
                <li><strong>Last Name: </strong>{session.lastName}</li>
                <li><strong>Username: </strong>{session.username}</li>
                <li><strong>Email: </strong>{session.email}</li>
            </ul>
            </div>
            <button onClick={handleLogout}>Logout</button>
        
        </>
        ): (
            <Login />
        )}
        </>
    )
}

export default Account;