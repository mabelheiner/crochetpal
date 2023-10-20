/*page used allow user to login, page 2 on canva */

import Navbar from "./Navbar";
import Account from "./Account";
import { useEffect, useState } from "react";
import { useSession } from './SessionProvider';
import { supabase } from "./Supabase";
import './Login.css';
import App from "./App";

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
                console.error('Error logging in:', error);
                setError(error)
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
            console.error('Error:', error);
            setError(error);
        }
    };

    return (
        <>
        {session ? (
            <App />
        ) : (
            <>
        <h1>Login</h1>
        <Navbar />
        <div className="login_1">
        <input type='email' placeholder='Email' value={userEmail} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={userPassword} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        {error ? (
            <div>
                <p>{error.message}</p>
            </div>
        ):(<></>)}
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
