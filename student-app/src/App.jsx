import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  return(
    <div>
      <h1>Hello,Students!</h1>
      <p>Welcome to React.js</p>
      <button onClick={()=> alert("Welcome!")}>
        click me
      </button>
    </div>
  );
}

export default App;
