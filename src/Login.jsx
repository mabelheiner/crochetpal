import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useSession } from './SessionProvider';
import { supabase } from "./Supabase";

const Login = () => {
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [session, setSession] = useState(null);  
    

    const handleLogin = async () => {
        try {
            const { user, error } = await supabase.auth.signInWithPassword({
                email: userEmail,
                password: userPassword,
            });
            if (error) {
                console.error('Error logging in:', error);
            } else {
                const curr_user = await supabase.auth.getSession();
                const user_data = curr_user.data.session.user

                console.log('Current user: ', user_data.id);
                console.log('User logged in:', userEmail);

                setSession(user_data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            setSession(null);
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    return (
        <>
        {session ? (
            <div>
                <h1>Welcome, {session.email}!</h1>
                <Navbar />
                <button onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            <>
        <h1>Login</h1>
        <Navbar />
        <input type='email' placeholder='Email' value={userEmail} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={userPassword} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <p>Need an account? <a href="signup">Register</a></p>
        </>
        )}
        </>
    )
}

export default Login;
