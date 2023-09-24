import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Project from './Project.jsx';
import Login from './Login.jsx';
import './index.css';
import SignUp from './SignUp.jsx';

import { createClient } from '@supabase/supabase-js';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <BrowserRouter basename=''>
      <Routes> 
        <Route path="/" element={<App />} />
        <Route path="/project" element={<Project />} />
        <Route path="/login" element={<Project />} />
        <Route path="/signup" element={<Project />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

createRoot(root).render(app); 

