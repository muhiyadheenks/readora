import React, { StrictMode } from 'react'
import Navbar from "./compo/Navbar"

import Hero from "./compo/hero/Hero"
function App() {
  return (
    <div>
      <StrictMode>
        <Navbar />
        <Hero />
      </StrictMode>
    </div>
  )
}

export default App
