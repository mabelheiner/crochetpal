/*The main app/button on the main page*/


import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar'

export default function App() {
  return (
    <>
      <header>
        <img className='logo' src="./images/CrochetPal.png" alt="Crochet Pal Logo" />
        <h1>Welcome to CrochetPal</h1>
      </header>
      <Navbar />
    </>
  )
}
