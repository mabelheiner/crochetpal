/*Page used for when user logs into the website, its the first thing they see (slide 4- home on canva)*/

import { useState, useEffect } from 'react';
import './Home.css';
import { supabase } from './Supabase';
import Navbar from './Navbar';
import Login from './Login';

const Home = () => {
    const [session, setSession] = useState(null);
    const [projects, setProjects] = useState(null);
    const [projectList, setProjectList] = useState(null);

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

                const img_src = 'https://poxfdvqxzpsmhcslibty.supabase.co/storage/v1/object/public/project_images/Pattern-Placeholder.png';
                const img_link = await supabase.storage.from('project_images').getPublicUrl('Pattern-Placeholder.png');
                console.log('img link:', img_link.data.publicUrl)

                console.log('Image', img_src);

                

                let projectList = projects.map((project) => 
                <li> <a href={`project-details/${project.id}`}>
                    <h2><strong>{project.name}</strong></h2>
                    <img src={img_link.data.publicUrl} alt={project.name}></img>
                    <p>${project.estimatedPrice}</p>
                    <a href={project.url} target="_blank">{project.name} Url</a>
                    <p>Row Count: {project.rowCount}</p>
                    <p>Time Spent: {formatTime(parseInt(project.timeSpent))}</p>
                    </a>
                </li>)

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
    }

    return (
        <>
        {session ? (
            <>
        <header>
            <h1>Home Page</h1>
        </header>

        <div class ="containter">
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
        </>
    )
}

export default Home;