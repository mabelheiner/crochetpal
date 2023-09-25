import Navbar from "./Navbar";
import { useState } from "react";

const Login = ({ supabase }) => {
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const { user, error } = await supabase.auth.signInWithPassword({
                email: user.userEmail,
                password: user.userPassword,
            });
            if (error) {
                console.error('Error logging in:', error.message);
            } else {
                console.log('User logged in:', userEmail)
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <>
        <h1>Login</h1>
        <Navbar />
        <input type='email' placeholder='Email' value={userEmail} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={userPassword} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <p>Need an account? <a href="signup">Register</a></p>
        </>
    )
}

export default Login;