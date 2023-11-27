import Navbar from "./Navbar";
import "./DeleteProject.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./Supabase";
import Footer from "./Footer";

const DeleteProject = () => {
    const params = useParams();
    const [project, setProject] = useState(null);
    const img_src = 'https://poxfdvqxzpsmhcslibty.supabase.co/storage/v1/object/sign/project_images/Pattern-Images/Pattern-Placeholder.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9qZWN0X2ltYWdlcy9QYXR0ZXJuLUltYWdlcy9QYXR0ZXJuLVBsYWNlaG9sZGVyLnBuZyIsImlhdCI6MTY5Nzc2NjM0MiwiZXhwIjoxNjk4MzcxMTQyfQ.JNch5HO9d1sHU-om8jsbRPnf8Kpl0d8K_TJYfdo5eF0&t=2023-10-20T01%3A45%3A40.666Z';

    const [img_link, setLink] = useState('');

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const { data, error } = await supabase
                    .from('UserProjects')
                    .select('*')
                    .eq('id', params.id);

                const img_link = await supabase.storage.from('project_images').getPublicUrl('Pattern-Placeholder.png');

                setLink(img_link.data.publicUrl);
                console.log('image link set', img_link.data.publicUrl);
    
                if (error) {
                    console.error('Error fetching project:', error);
                } else if (data && data.length > 0) {
                    setProject(data[0]);
                }
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };
        fetchProject(); 


    }, [params.id]);

    const deleteProject = async () =>  {
        await supabase
        .from('UserProjects')
        .delete('*')
        .eq('id', params.id);
        <a href="/"></a>
        //<a href="/account">Project Deleted, Return to Account</a>
    };

    return (
        <>
        <Navbar />
        {project ? (
            <div className='delete'>
             <h1>Are you sure you would like to delete this project?</h1>
              <h2><strong>{project.name}</strong></h2>
                <img src={img_link} alt={project.name}></img>
                <p></p>
                <p></p>
                <button onClick={deleteProject}>Confirm</button>
                <a href="/">
                    <button>Cancel</button>
                </a>   
            </div>
        
        ) : null}   
        <Footer />     
        </>
        )
    }

export default DeleteProject;