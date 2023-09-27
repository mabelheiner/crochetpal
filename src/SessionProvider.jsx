import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './Supabase'; // Make sure supabase is correctly imported

const SessionContext = createContext();

export const useSession = () => {
    return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(supabase.auth.getSession()); 

    useEffect(() => {
        const subscription = supabase.auth.onAuthStateChange((event, newSession) => {
            setSession(newSession);
        });
        
        return () => {
            subscription.data.subscription.unsubscribe();
        }
    }, []);

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    )
}
