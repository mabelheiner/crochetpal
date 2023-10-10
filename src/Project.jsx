import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Stopwatch from "./Stopwatch";
import RowCounter from "./RowCounter";
import { supabase } from "./Supabase";
import './Project.css';

const Project = () => {
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
    return (
        <>
        {session ? (
            <>
            <h1>Welcome to the project page, {session.firstName}!</h1>
            <Navbar />
            <Stopwatch />
            <RowCounter />
            </>
        ) : (
            <>
        <h1>Hello from Project Page</h1>
        <Navbar />
        <Stopwatch />
        <RowCounter />
        </>
        )}
        </>
    )
}

export default Project;