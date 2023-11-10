import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DeleteProject from './DeleteProject.jsx';

import App from './App.jsx';
import Project from './tracker.jsx';
import Login from './Login.jsx';
import './index.css';
import SignUp from './SignUp.jsx';
import Account from './Account.jsx';
import Pricing from './Pricing.jsx';
import Home from './Home.jsx';
import ProjectDetails from './ProjectDetails.jsx';
import { SessionProvider } from './SessionProvider.jsx';
import AddProject from './addproject.jsx';
import EditProjectDetails from './EditProjectDetails.jsx';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <SessionProvider>
      <BrowserRouter basename=''>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
          <Route path="/addproject" element={<AddProject />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/project-details/:id" element={<ProjectDetails />} />
          <Route path="/editdetails/:id" element={<EditProjectDetails />} />
          <Route path="/deleteproject/:id" element={<DeleteProject />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  </React.StrictMode>
);

createRoot(root).render(app); 

