import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <img class='logo' src="./images/CrochetPal.png" alt="Crochet Pal Logo" />
        <h1>Welcome to CrochetPal</h1>
      </header>
    </>
  )
}

export default App
