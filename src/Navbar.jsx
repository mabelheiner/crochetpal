/*This simply edits the nav bar*/

import { useState, useEffect } from 'react';
import { supabase } from './Supabase';
import './Navbar.css';


const Navbar = (props) => {
    const [session , setSession] = useState(null);
    const [HamIsVisible, setHamIsVisible] = useState(true);
    const [NonHamIsVisible, setNonHamIsVisible] = useState(false);
    const [NavIsVisible, setNavIsVisible] = useState(true);
    console.log('props.active:', props.active)

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

    window.addEventListener('resize', hamVisibility);
    hamVisibility();
    fetchUser();
    }, [])
    
    const hamVisibility = () => {
        if (window.innerWidth > 812) {
            setHamIsVisible(true);
            setNonHamIsVisible(true);
            setNavIsVisible(true);
        }
        else {
            console.log('ham', HamIsVisible);
            console.log('non', NonHamIsVisible);
            checkVisibility();
        }
    }

    const checkVisibility = () => {
        if (HamIsVisible == true) {
            setNonHamIsVisible(true);
            setNavIsVisible(false);
            setHamIsVisible(false);
        }
        else {
            setNonHamIsVisible(false);
            setHamIsVisible(true);
            setNavIsVisible(true);
        }
    }
    return (
        
        <>
        {/* <h1>Crochet Pals</h1>
        <p><i>Crocheting together one step at a time!</i></p> */}
        <div class="underline">
            <nav>
                <div>
                    <img src='/images/CrochetPal-Logo.png' alt='CrochetPal'></img>
                    <h2>CrochetPal</h2>
                </div>

            <ul className='non-ham' style={{display: NavIsVisible ? 'flex': 'none'}}>

                <li className={props.active == 'home' ? 'active': null}><a href="/">Home</a></li>
                <li className={props.active == 'editproject' ? 'active': null}><a href="/addproject">Add Project</a></li>
                <li className={props.active == 'pricing' ? 'active': null}><a href="/pricing">Pricing</a></li>
                <li className={props.active == 'tips' ? 'active': null}><a href='/tips'>Tips and Tricks</a></li>
        {session ? (
                <li className={props.active == 'account' ? 'active': null}><a href="/account">Account</a></li>
        ):(
                <li className={props.active == 'login' ? 'active': null}><a href="/login">Login</a></li>
        )}
        </ul>

        <button className='ham' onClick={hamVisibility} style={{display: HamIsVisible ? 'none': 'block', backgroundColor: '#720097'}}><span className='button-text'>&equiv;</span></button>
        <button className='ex-ham' onClick={hamVisibility} style={{display: NonHamIsVisible ? 'none': 'block', backgroundColor: '#8901AF'}}><span className='button-text'>X</span></button>

        </nav>

        </div>
        </>
    )

}

export default Navbar;