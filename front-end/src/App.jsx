import { useState,useEffect } from 'react'
import Conn from './Conn.jsx'
import Login from './Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard.jsx'
import Register from './Register.jsx'

function App() {
  
  
 return (
<>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>

</>
 );
}

export default App
