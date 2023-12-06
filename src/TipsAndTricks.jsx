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
      <br></br>
      <h1>Tips, Tricks, and Questions </h1>

      <div className='question'>        
        <h2 onClick={() => toggleAnswer('getStarted')} className='questionText'>How do I get started? <span className='drop'>{answersVisible['getStarted'] ? '-' : '+'}</span></h2>
        {answersVisible['getStarted'] && (
          <>
          <p>Everyone starts out a little differently, but here are some ideas to get you started:</p>
          <ol>
            <li>Find a pattern or project that you want to create.</li>
            <li>Watch a video tutorial for something you want to make.</li>
            <li>Find a yarn that you want to use and the hook that matches that yarn</li>
          </ol>
          </>
        )}
      </div>

      <div className='question'>
      <h2 onClick={() => toggleAnswer('yarn')} className='questionText'>What yarn should I use? <span className='drop'>{answersVisible['yarn'] ? '-' : '+'}</span></h2>
        {answersVisible['yarn'] && (
          <p>Find a yarn to match the colors and texture for the project that you want to create. One thing to keep in mind when finding yarn is the weight. On the package the yarn will have a weight typically between 3 and 7, this number describes how thick the yarn is. 3 is thin and 7 is super bulky. <br></br>Skeins with a higher number tend to be bigger as the yarn is thicker, this also means that your hook will be bigger. Thinner yarns often come in smaller skeins, but tend to have more yards. Pick whatever yarn you want, but make sure that your yarn matches your pattern.</p>
        )}
      </div>

      <div className='question'>
      <h2 onClick={() => toggleAnswer('hooks')} className='questionText'>What hook should I use? <span className='drop'>{answersVisible['hooks'] ? '-' : '+'}</span></h2>
        {answersVisible['hooks'] && (
          <p>As mentioned above, it is best to pick the hook that best matches your yarn skein/type. Thicker yarns will need thicker hooks and vice versa. <br></br>There is a lot more to picking a hook rather than just size, you may notice walking down the aisles of the craft store that many hooks have different shapes, this is because people all hold their crochet hooks differently and our hands are all the same shape. I recommend that you start with the cheapest and practice until you have a specific way you like to hold the hook and yarn, then test all the different hooks until you find your perfect match!</p>
        )}
      </div>

      <div className='question'>
      <h2 onClick={() => toggleAnswer('holding')} className='questionText'>How to hold the crochet hook and the yarn?<span className='drop'>{answersVisible['holding'] ? '-' : '+'}</span></h2>
        {answersVisible['holding'] && (
          <p>There are a lot of different ways to hold the yarn and the hook, but in the end, just start crocheting and your hands will find what they like!</p>
        )}
      </div>

      <div className='question'>
        <h2 onClick={() => toggleAnswer('attaching')} className='questionText'>How do I attach the yarn to my hook?<span className='drop'>{answersVisible['attaching'] ? '-' : '+'}</span></h2>
        {answersVisible['attaching'] && (
          <>
          <p>There are many ways to attach the yarn for the hook, but here is a good go to way: </p>
          <ol>
            <li>Create a loop with your yarn.</li>
            <li>Pull a string up into the loop.</li>
            <li>Place hook inside loop.</li>
            <li>Pull string tight.</li>
          </ol>
          </>
        )}
      </div>

      <div className='question'>
      <h2 onClick={() => toggleAnswer('chain')} className='questionText'>How to do make a chain?<span className='drop'>{answersVisible['chain'] ? '-' : '+'}</span></h2>
        {answersVisible['chain'] && (
          <p>Typically you will start your project if you are doing a blanket or a flat project with a row of chains. <br></br>To complete a chain you must first have your yarn attached to the hook. Then you yarn over and pull up a loop. That's all a chain takes! Repeat this process for as many chains as you need.</p>
        )}
      </div>

      <div className='question'>
      <h2 onClick={() => toggleAnswer('single_c')} className='questionText'>How to do a single crochet stitch?<span className='drop'>{answersVisible['single_c'] ? '-' : '+'}</span></h2>
        {answersVisible['single_c'] && (
          <ol>
            <li>Insert hook into stitch and pull up a loop. You should have two loops on your hook.</li>
            <li>Yarn over and pull through both loops.</li>
            <li>Continue to next stitch and repeat steps 1 and 2.</li>
          </ol>
        )}
      </div>
        
      <div className='question'>
      <h2 onClick={() => toggleAnswer('half_c')} className='questionText'>How to do a half double crochet stitch?<span className='drop'>{answersVisible['half_c'] ? '-' : '+'}</span></h2>
        {answersVisible['half_c'] && (
          <ol>
            <li>Yarn over.</li>
            <li>Insert hook into stitch and pull up a loop.</li>
            <li>Yarn over and pull through 3 loops.</li>
            <li>Continue to next stitch and repeat steps 1 through 3.</li>
          </ol>
        )}
      </div>

      <div className='question'>
      <h2 onClick={() => toggleAnswer('double_c')} className='questionText'>How to do a double crochet stitch?<span className='drop'>{answersVisible['double_c'] ? '-' : '+'}</span></h2>
        {answersVisible['double_c'] && (
          <ol>
            <li>Yarn over.</li>
            <li>Insert hook into stitch and pull up a loop.</li>
            <li>Yarn over and pull through the middle two loops.</li>
            <li>Yarn over and pull through two loops. *You should have one loop left on your hook.</li>
            <li>Continue to next stitch and repeat steps 1 through 5.</li>
          </ol>
        )}
      </div>      

      <div className='question'>
      <h2 onClick={() => toggleAnswer('Tracking')} className='questionText'>How do I track my projects?<span className='drop'>{answersVisible['Tracking'] ? '-' : '+'}</span></h2>
        {answersVisible['Tracking'] && (
          <p>Check out the track project page on one of your<br></br><a href='/'>Projects</a><br></br>Just click on a project and click on the track project button!
          <br />The most important things to keep in mind are to track the time spent, the row that you're on and what number stitch you're on.
          <br />It is highly recommended that you use stitch markers to mark the beginning of your rounds if your are working in a round. Stitch markers can also help mark any number of stitches.
          <br />For example, if you are working on a blanket that is 200 stitches wide and there is a pattern every 50 stitches, then you can place a stitch marker every 50 stitches to remember when to repeat the pattern.</p>
        )}
      </div>

      <div className='question'>
      <h2 onClick={() => toggleAnswer('creators')} className='questionText'>Who Are the Creators of CrochetPals? <span className='drop'>{answersVisible['creators'] ? '-' : '+'}</span></h2>
        {answersVisible['creators'] && (
          <p>
            We are so glad you asked! Crochet pal is made by 3 developers:
            Mabel Heiner, Darcy Merilan, and Emma Ward.<br></br>
            <br></br>
            Mabel Heiner: 
            <br></br>
            <br></br>

            <br></br>
            <br></br>
            Darcy Merilan:
            <br></br>
            <br></br>
            Hello, My name is Darcy Merilan. I am a software engineer and an inspiring project manager. 
            When working on this website, my knowledge of making and using website coding languages was rusty at best. 
            However, I have come to learn and love designing this webpage and utilizing all my knowledge to
            create a website I am proud of. <br></br> I enjoy Sleeping, reading stories and watching movies and tv shows, 
            playing games, solving problems, but most importantly I LOVE hanging out with people and helping anyone in need.
            <br></br>
            <br></br>
            Emma Ward:
            <br></br>
            <br></br>
            Hi, my name is Emma Ward. I am a software engineer, and I am working towards a career in designing and developing software.
            This project was difficult for me, as my focus has been mainly on designing code, rather than websites. This project helped me
            learn more about the front-end process, and helped me gain a greater appreciation for it. I enjoyed working on this project with
            my team, and I am pleased with the result that we have brought forward.
            <br></br>
            <br></br>
          </p>
         
        )}
      </div>

      <div className='question'>
      <h2 onClick={() => toggleAnswer('Examples')} className='questionText'><a href='/inspiration'>Need some inspiration, here are some examples!</a></h2>
      </div>

      <Footer />
    </>
  );
};

export default TipsAndTricks;
