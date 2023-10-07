import { useState } from "react";
import Navbar from "./Navbar";
import { supabase } from "./Supabase";
import './SignUp.css';

const SignUp = () => {
    const [newEmail, setEmail] = useState('');
    const [newPassword, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(null);

    const handleSignup = async () => {
        if (newPassword === confirmPassword) {
            try {
                const { data, error } = await supabase.auth.signUp({
                    email: newEmail,
                    password: newPassword,
                    username: userName,
                    firstName: firstName,
                    lastName: lastName
                });
            
                if (error) {
                    console.log("Error in signing up: ", error.message);
                    setError(error);
                    return;
                } else {
            
                const { data: insertedData, error: insertError } = await supabase
                    .from('CurrentUsers')
                    .insert([
                        {
                            firstName: firstName,
                            lastName: lastName,
                            username: userName,
                            email: newEmail
                        }
                    ]);
                }
            
                if (insertError) {
                    console.log('Error in storing user table: ', insertError.message);
                } else {
                    console.log('User signed up and data inserted successfully!');
                }
            } catch (error) {
                console.log('Error: ', error.message);
                setError(error);
            }
            
    } else {
        const error = {message: 'Passwords do not match'};
        setError(error);
    }
    }

    return (
        <>
        <h1>Welcome to the sign up page</h1>
        <Navbar />
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type='email' placeholder='Email' value={newEmail} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button onClick={handleSignup}>Register</button>
        {error ? (
            <div>
                <p>{error.message}</p>
            </div>
        ):(<></>)}
        <p>Already have an account? <a href="login">Login</a></p>
        </>
    )
}

export default SignUp;