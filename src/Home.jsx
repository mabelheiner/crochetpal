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
                //console.log('Projects', projects);

                const img_src = 'https://poxfdvqxzpsmhcslibty.supabase.co/storage/v1/object/public/project_images/Pattern-Placeholder.png';
                const img_link = await supabase.storage.from('project_images').getPublicUrl('Pattern-Placeholder.png');
                console.log('img link:', img_link.data.publicUrl)

                console.log('Image', img_src);

                const projectList = projects.map((project) => 
                <li> <a href={`project-details/${project.id}`}>
                    <h2><strong>{project.name}</strong></h2>
                    <img src={img_link.data.publicUrl} alt={project.name}></img>
                    <p>${project.estimatedPrice}</p>
                    <a href={project.url} target="_blank">{project.name} Url</a>
                    <p>Row Count: {project.rowCount}</p>
                    <p>Time Spent: {project.timeSpent} hours</p>
                    </a>
                </li>)

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