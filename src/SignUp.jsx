/*page used allow users to sign up, page 3 on canva */

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
                    alert('Error in signing up, please try again.')
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
                window.location.href = '/';
            } catch (error) {
                alert('Error in signing up, please try again.')
            }
            
    } else {
        alert("Passwords do not match!");
    }
    }

    return (
        <>
        <h1>Crochet Pals</h1>
        <p><i>Crocheting together one step at a time!</i></p>
        {/* <Navbar /> */}
        <div className="signup">
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type='email' placeholder='Email' value={newEmail} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button onClick={handleSignup}>Register</button>
        {error ? (
            <div>
                <p>{error.message}</p>
            </div>
        
        ):(<></>)}
        </div>
        <p>Already have an account? <a href="login">Login</a></p>
        
        </>
        
    )
}

export default SignUp;