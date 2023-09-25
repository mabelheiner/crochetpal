import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Project from './Project.jsx';
import Login from './Login.jsx';
import './index.css';
import SignUp from './SignUp.jsx';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_DATABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

console.log('Url: ', supabaseUrl);
console.log('Key: ', supabaseKey);

const supabase = createClient(
  supabaseUrl,
  supabaseKey,
); 

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <BrowserRouter basename=''>
      <Routes> 
        <Route path="/" element={<App />} />
        <Route path="/project" element={<Project />} />
        <Route path="/login" element={<Login supabase={supabase}/>} />
        <Route path="/signup" element={<SignUp supabase={supabase}/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

createRoot(root).render(app); 

