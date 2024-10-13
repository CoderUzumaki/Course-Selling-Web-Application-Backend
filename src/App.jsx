import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WorldClock from './WorldClock.jsx'
import StopWatch from './StopWatch.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
      <h1>World Clock</h1>
      <div className="clocks">
        {/* <WorldClock city="New York" timezone="America/New_York" /> */}
        <StopWatch/>

      </div>
    </div>
    </>
  )
}

export default App
