import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prevDots => (prevDots.length >= 3 ? '' : prevDots + '.'));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <img className='loaderimage' src='/images/Yarn-Loader.gif' alt='Yarn Turning'></img>
            <h1>Loading{dots}</h1>
        </>
    );
};

export default LoadingScreen;
