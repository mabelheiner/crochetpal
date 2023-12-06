/*page used allow user to login, page 2 on canva */

import Navbar from "./Navbar";
import Account from "./Account";
import { useEffect, useState } from "react";
import { useSession } from './SessionProvider';
import { supabase } from "./Supabase";
import './Login.css';
import App from "./App";
import Home from './Home';

const Login = () => {
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [session, setSession] = useState(null);  
    const [error, setError] = useState(null);
    

    const handleLogin = async () => {
        try {
            const { user, error } = await supabase.auth.signInWithPassword({
                email: userEmail,
                password: userPassword,
            });
            if (error) {
                alert('Could not login, make sure that you are: \n1. Using the right email and password \n2. You have confirmed your email.')
            } else {
                const curr_user = await supabase.auth.getSession();
                const user_data = curr_user.data.session.user

                console.log('Current user: ', user_data.email);

                const user_info = await supabase
                .from('CurrentUsers')
                .select('*')
                .eq('email', user_data.email);

                console.log('User info: ', user_info.data[0])
                console.log('User logged in:', userEmail);

                setSession(user_info.data[0]);
            }
        } catch (error) {
            alert('Could not login, make sure that you are: \n1. Using the right email and password \n2. You have confirmed your email.')
        }
    };

    return (
        <>
        {session ? (
            <Home />
        ) : (
            <>
        {/* <Navbar /> */}
        <h1>Crochet Pals</h1>
        <p><i>Crocheting together one step at a time!</i></p>
        <div className="login_1">
        <input type='email' placeholder='Email' value={userEmail} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={userPassword} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <div className="test">
        <p>Need an account? <a href="signup">Register</a></p>
        </div> 
        </div>
        </>
        )}
        </>
    )
}

export default Login;
