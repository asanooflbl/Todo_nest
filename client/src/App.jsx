import React from 'react'
import Todo from './Pages/Todo'
import { Routes, Route } from "react-router-dom"
import { ToastContainer} from 'react-toastify';

function App() {
  return (
    <div>
       <ToastContainer/>
      <Routes>
      <Route path="/" element={<Todo />} />
    </Routes>
    </div>
  )
}

export default App