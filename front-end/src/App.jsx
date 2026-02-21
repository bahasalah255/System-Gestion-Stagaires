import { useState,useEffect } from 'react'
import Conn from './Conn.jsx'
import Login from './Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard.jsx'
import Register from './Register.jsx'
import Dashforma from './Dashforma.jsx'
import Dashstagaire from './Dashstagaire.jsx'
import Utili from './Utili.jsx'
function App() {
  
  
 return (
<>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} >
          <Route path='utilisateurs' element={<Utili/>}/>
        </Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard-formateur' element={<Dashforma/>}/>
        <Route path='/dashboard-stagaire' element={<Dashstagaire/>}/>
      </Routes>
    </BrowserRouter>

</>
 );
}

export default App
