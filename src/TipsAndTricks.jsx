import React, { useState } from 'react';
import Navbar from './Navbar';
import './TipsAndTricks.css';

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
      <div className='question'>        
        <h2 onClick={() => toggleAnswer('getStarted')} className='questionText'>How Do I Get Started <span className='drop'>{answersVisible['getStarted'] ? '\u2228' : '>'}</span></h2>
        {answersVisible['getStarted'] && (
          <p>
            Start by gathering your materials and following a beginner-friendly tutorial.
          </p>
        )}
      </div>
      <div className='question'>
        <h2 onClick={() => toggleAnswer('yarn')} className='questionText'>What Yarn Should I Use <span className='drop'>{answersVisible['getStarted'] ? '\u2228' : '>'}</span></h2>
        {answersVisible['yarn'] && (
          <p>
            Choose a yarn that suits the project and fits your preferences for texture and color.
          </p>
        )}
      </div>
      <div className='question'>
        <h2 onClick={() => toggleAnswer('hooks')} className='questionText'>What Hooks Should I Use <span className='drop'>{answersVisible['getStarted'] ? '\u2228' : '>'}</span></h2>
        {answersVisible['hooks'] && (
          <p>
            Use hooks recommended for the yarn and project to achieve the desired outcome.
          </p>
        )}
      </div>
    </>
  );
};

export default TipsAndTricks;
