import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditProjectLoading.css';

const EditProjectLoadingScreen = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    const [dots, setDots] = useState('');
    const params = useParams();

    const messages = [
        'Saving Project Name',
        'Saving Project Notes',
        'Saving Time Spent',
        'Saving Current Row Count',
        'Saving Estimated Price',
        'Saving Pattern Link',
        'Saving Picture Upload'
    ];

    useEffect(() => {
        let dotsInterval;
        let messageInterval;

        const runIntervals = () => {
            messageInterval = setInterval(() => {
                setMessageIndex(prevIndex =>
                    prevIndex < messages.length - 1 ? prevIndex + 1 : 0
                );
                setDots('');
                clearInterval(dotsInterval); 
                dotsInterval = setInterval(() => {
                    setDots(prevDots => (prevDots.length >= 3 ? '' : prevDots + '.'));
                }, 500); 
            }, 5000); 
        };

        runIntervals();

        return () => {
            clearInterval(messageInterval);
            clearInterval(dotsInterval);
            window.location.href = '/project-details/' + params.id;
        };        
    }, [messages.length]);

    return (
        <>
            <img className='loaderimage' src='/images/Yarn-Loader.gif' alt='Yarn Turning' />
            <h1>{messages[messageIndex]}{dots}</h1>
        </>
    );
};

export default EditProjectLoadingScreen;



