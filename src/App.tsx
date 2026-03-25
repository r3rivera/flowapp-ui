import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="w-screen h-screen p-8">
      <h1 className="text-2xl font-bold p-4 border border-gray-300">Hello World</h1>
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setCount(count + 1)}
        >
          Count is {count}
        </button>
      </div>
    </div>
    </>
  )
}

export default App
