import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
          <input type="text" placeholder='Enter fullname or license no.' />
          <button>submit test</button>
    </div>
    </>
  )
}

export default App
