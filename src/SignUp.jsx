import { useState } from "react";
import Navbar from "./Navbar";
import { supabase } from "./Supabase";

const SignUp = () => {
    const [newEmail, setEmail] = useState('');
    const [newPassword, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            let { data, error } = await supabase.auth.signUp({
                email: newEmail,
                password: newPassword,
            })
            if (error) {
                console.log("Error in signing up: ", error.message)
            } else {
                console.log('User signed up!');
            }
        } catch (error){
            console.log('Error: ', error.message)
        }
    }

    return (
        <>
        <h1>Welcome to the sign up page</h1>
        <Navbar />
        <input type="email" placeholder="Email" value={newEmail} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignup}>Register</button>
        <p>Already have an account? <a href="login">Login</a></p>
        </>
    )
}

export default SignUp;