import React, { StrictMode } from 'react'
import Navbar from "./compo/Navbar"
import Hero from "./compo/hero/Hero"
import Books from './compo/Books/Books'
function App() {
  return (
    <div>

      <Navbar />
      <Hero />
      <Books />
    </div>
  )
}

export default App
