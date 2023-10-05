import { useState } from "react";
import Navbar from "./Navbar";
import { supabase } from "./Supabase";

const SignUp = () => {
    const [newEmail, setEmail] = useState('');
    const [newPassword, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSignup = async () => {
        if (newPassword === confirmPassword) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: newEmail,
                password: newPassword,
                username: userName,
                firstName: firstName,
                lastName: lastName
            })

            console.log('Data to insert:', { firstName, lastName, userName, newEmail });
            const { user, err } = await supabase
            .from('CurrentUsers')
            .upsert([{
                firstName: 'Mabel', 
                lastName: 'Heiner', 
                userName: 'mabelheiner', 
                newEmail: 'mabelheiner5@gmail.com'
            }]);
            console.log('user signed up: ', firstName);

            if (err){
                console.log('Error in storing user table: ', err);
            }
            
            if (error) {
                console.log("Error in signing up: ", error.message)
            } else {
                console.log('User signed up!');
            }
        } catch (error){
            console.log('Error: ', error.message)
        }
    } else {
        alert('passwords do not match!')
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
        <p>Already have an account? <a href="login">Login</a></p>
        </>
    )
}

export default SignUp;