/*Page used for when user logs into the website, its the first thing they see (slide 4- home on canva)*/

import { useState, useEffect } from 'react';
import './Home.css';
import { supabase } from './Supabase';
import Navbar from './Navbar';
import Login from './Login';
import LoadingScreen from './LoadingScreen';
import Footer from './Footer';

const Home = () => {
    const [session, setSession] = useState(null);
    const [projects, setProjects] = useState(null);
    const [projectList, setProjectList] = useState(null);
    const [imgLink, setImageLink] = useState(null);
    
    const formatTime = (time) => {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 60000) % 60);
        const hours = Math.floor((time / 3600000) % 60);

        return (
            String(hours).padStart(2, '0') + 
            ':' +
            String(minutes).padStart(2, '0') +
            ':' +
            String(seconds).padStart(2, '0')
        );
    };
        const fetchUser = async () => {
            const curr_user = await supabase.auth.getSession();
            if (curr_user) {
                const user_data = curr_user.data.session.user;
                
                const user_info = await supabase.from('CurrentUsers')
                .select('*')
                .eq('email', user_data.email);

                setSession(user_info.data[0]);
                //console.log('Session', session.id);

                const userProjects = await supabase
                .from('UserProjects')
                .select('*')
                .eq('userId', session.id)
                
                setProjects(userProjects.data);

                let projectList = await Promise.all(projects.map(async (project) => {
                        const tryLink = await supabase
                        .storage
                        .from('project_images/private')
                        .getPublicUrl(project.id);

                        console.log('try link', tryLink.data.publicUrl);
                        setImageLink(tryLink.data.publicUrl);

                        async function displayPlaceholder(e) {
                            const placholderLink = await supabase
                            .storage
                            .from('project_images')
                            .getPublicUrl('Pattern-Placeholder.png')

                            e.target.src = placholderLink.data.publicUrl;
                        }
                        
                        return (
                            <li> <a href={`project-details/${project.id}`}>
                                <h2><strong>{project.name}</strong></h2>
                                <img src={tryLink.data.publicUrl} alt={project.name} onError={displayPlaceholder}></img>
                                <p>${project.estimatedPrice}</p>
                                <a href={`https://${project.url}`} target="_blank" rel='noopener noreferrer'>{project.name} Url</a>
                                <p>Row Count: {project.rowCount}</p>
                                <p>Time Spent: {formatTime(parseInt(project.timeSpent))}</p>
                                </a>
                            </li>)
                }))

                const newProject = <li>
                    <a href={'addproject'}>
                    <p className='plus'>+</p>
                    <h2><strong>Add New Project</strong></h2>
                    </a>
                </li>

                projectList.unshift(newProject);
                setProjectList(projectList);
                
            }
        }

    if (projectList == null){
        fetchUser();
        return <LoadingScreen />
    }
    // window.addEventListener("load", () => {
    //     const loader = document.querySelector(".loader");
    //     loader.classList.add("loader-hidden");
    //     loader.addEventListener("transitionend", () => {
    //         document.body.removeChild("loader");
    //     })
    // })

    return (
        <>
        {session ? (
            <>
        <div class ="container">
            <div id="loader">
                <div class= "progress">
                    <div class="indetermined"></div>
                </div>
            </div>
            <div id="app"></div>
        </div>

        <Navbar active='home'/>
        <ul className='project-list'>{projectList}</ul>
        </>
        ) : (
            <>
            <Login />
            </>
        )}

        <Footer />
        </>
    )
}

export default Home;