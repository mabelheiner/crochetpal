import './Inspiration.css';
import Navbar from './Navbar';

const Inspiration = () => {
    return (
        <>
        <Navbar active='tips'/>
        <br />
        <h1>Projects to Inspire You</h1>
        <div className='inspiration-list'>
            <div className='project'>
                <h1>Axolotl</h1>
                <img src="/public/images/axolotl.jpg" alt="Baby Axolotl" />
            </div>
            <div className='project'>
                <h1>Baby Hat</h1>
                <img src="/public/images/babyhat.jpg" alt="Baby Hat" />
            </div>
            <div className='project'>
                <h1>Blanket</h1>
                <img src="/public/images/blanket.jpg" alt="Blanket" />
            </div>
            <div className='project'>
                <h1>Fox</h1>
                <img src="/public/images/fox.jpg" alt="Fox" />
            </div>
            <div className='project'>
                <h1>Frog</h1>
                <img src="/public/images/frog.jpg" alt="Frog" />
            </div>
            <div className='project'>
                <h1>Giraffe</h1>
                <img src="/public/images/giraffe.jpg" alt="Giraffe" />
            </div>
            <div className='project'>
                <h1>Hot Pad</h1>
                <img src="/public/images/hotpad.jpg" alt="Hot Pad" />
            </div>
            <div className='project'>
                <h1>Lemon Head</h1>
                <img src="/public/images/lemonhead.jpg" alt="Lemon Head" />
            </div>
        </div>
        </>
    )
}

export default Inspiration;