import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import the correct components

import App from './App.jsx';
import Project from './Project.jsx';
import './index.css';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <Routes> {/* Use Routes component to define your routes */}
        <Route path="/" element={<App />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

createRoot(root).render(app); // Use createRoot to render your app
