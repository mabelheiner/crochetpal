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
      <h2 onClick={() => toggleAnswer('holding')} className='questionText'>How to hold the Crochet stick and the Yarn?<span className='drop'>{answersVisible['holding'] ? '-' : '+'}</span></h2>
        {answersVisible['holding'] && (
          <p>
            Insert Here
          </p>
        )}
      </div>

      <div className='question'>
      <h2 onClick={() => toggleAnswer('single_c')} className='questionText'>How to do a single crochet stitch?<span className='drop'>{answersVisible['single_c'] ? '-' : '+'}</span></h2>
        {answersVisible['single_c'] && (
          <p>
            Insert Here
          </p>
        )}
      </div>
        
      <div className='question'>
      <h2 onClick={() => toggleAnswer('double_c')} className='questionText'>How to do a double crochet stitch?<span className='drop'>{answersVisible['double_c'] ? '-' : '+'}</span></h2>
        {answersVisible['double_c'] && (
          <p>
            Insert Here
          </p>
        )}
      </div>

      <div className='question'>
      <h2 onClick={() => toggleAnswer('half_c')} className='questionText'>How to do a half double crochet stitch?<span className='drop'>{answersVisible['half_c'] ? '-' : '+'}</span></h2>
        {answersVisible['half_c'] && (
          <p>
            Insert Here
          </p>
        )}
      </div>

      <div className='question'>
      <h2 onClick={() => toggleAnswer('chain')} className='questionText'>How to do make a chain?<span className='drop'>{answersVisible['chain'] ? '-' : '+'}</span></h2>
        {answersVisible['chain'] && (
          <p>
            Insert Here
          </p>
        )}
      </div>

      <div className='question'>
      <h2 onClick={() => toggleAnswer('Tracking')} className='questionText'>Some Tracking tricks to keep in mind<span className='drop'>{answersVisible['Tracking'] ? '-' : '+'}</span></h2>
        {answersVisible['Tracking'] && (
          <p>
            Insert Here
          </p>
        )}
      </div>
      
      <div className='question'>
      <h2 onClick={() => toggleAnswer('Examples')} className='questionText'>Need some Inspiration, here are some examples!<span className='drop'>{answersVisible['Examples'] ? '-' : '+'}</span></h2>
        {answersVisible['Examples'] && (
          <p>
            Insert Here
          </p>
        )}
      </div>

      <div className='question'>
      <h2 onClick={() => toggleAnswer('creators')} className='questionText'>Who Are the Creators of CrochetPals? <span className='drop'>{answersVisible['creators'] ? '-' : '+'}</span></h2>
        {answersVisible['creators'] && (
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
