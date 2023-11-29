import React, { useState } from 'react';
import Navbar from './Navbar';
import './TipsAndTricks.css';
import Footer from './Footer';

const TipsAndTricks = () => {
  const [answersVisible, setAnswersVisible] = useState({});

  const toggleAnswer = (question) => {
    setAnswersVisible({
      ...answersVisible,
      [question]: !answersVisible[question],
    });
  };

  return (
    <>
      <Navbar active='tips' />
      <h1>Tips, Tricks, and Questions </h1>
      <div className='question'>        
        <h2 onClick={() => toggleAnswer('getStarted')} className='questionText'>How Do I Get Started? <span className='drop'>{answersVisible['getStarted'] ? '-' : '+'}</span></h2>
        {answersVisible['getStarted'] && (
          <p>
            Start by gathering your materials and following a beginner-friendly tutorial.
          </p>
        )}
      </div>
      <div className='question'>
      <h2 onClick={() => toggleAnswer('yarn')} className='questionText'>What Yarn Should I Use? <span className='drop'>{answersVisible['yarn'] ? '-' : '+'}</span></h2>
        {answersVisible['yarn'] && (
          <p>
            Choose a yarn that suits the project and fits your preferences for texture and color.
          </p>
        )}
      </div>
      <div className='question'>
      <h2 onClick={() => toggleAnswer('hooks')} className='questionText'>What Hooks Should I Use? <span className='drop'>{answersVisible['hooks'] ? '-' : '+'}</span></h2>
        {answersVisible['hooks'] && (
          <p>
            Use hooks recommended for the yarn and project to achieve the desired outcome.
          </p>
        )}
      </div>
      <div className='question'>
      <h2 onClick={() => toggleAnswer('Creators')} className='questionText'>Who Are the Creators of CrochetPals? <span className='drop'>{answersVisible['hooks'] ? '-' : '+'}</span></h2>
        {answersVisible['Creators'] && (
          <p>
            We are so glad you asked! Crochet pal is made by 3 developers:
            Mabel Heiner, Darcy Merilan, and Emma Ward.
          </p>
         
        )}
      </div>

      <Footer />
    </>
  );
};

export default TipsAndTricks;
