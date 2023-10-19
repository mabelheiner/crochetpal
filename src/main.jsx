import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Project from './tracker.jsx';
import Login from './Login.jsx';
import './index.css';
import SignUp from './SignUp.jsx';
import Account from './Account.jsx';
import Tester from './editproject.jsx';
import Pricing from './Pricing.jsx';
import Home from './Home.jsx';
import { SessionProvider } from './SessionProvider.jsx';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <SessionProvider>
      <BrowserRouter basename=''>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
          <Route path="/editproject" element={<Tester />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  </React.StrictMode>
);

createRoot(root).render(app); 

