import React, { useState, useEffect } from 'react';
import Login from './Login';
import './LoadingScreen.css';

const LoadingScreen = () => {
    const [dots, setDots] = useState('');
    let [count, setCount] = useState(0)

    useEffect(() => {        
        const interval = setInterval(() => {
            setDots(prevDots => (prevDots.length >= 3 ? '' : prevDots + '.'));
            setCount(count += 1);
            console.log('count', count);
            if (count > 10) {
                return <Login />
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
        {count > 10 ? (
            <>
            <Login />
            </>
        ) : (
            <>
            <img className='loaderimage' src='/images/Yarn-Loader.gif' alt='Yarn Turning'></img>
            <h1>Loading{dots}</h1>
            </>
        )
}
        </>
    );
};

export default LoadingScreen;
