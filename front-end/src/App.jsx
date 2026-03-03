import { useState,useEffect } from 'react'
import Conn from './Conn.jsx'
import Login from './Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard.jsx'
import Register from './Register.jsx'
import Dashforma from './Dashforma.jsx'
import Dashstagaire from './Dashstagaire.jsx'
import Utili from './Utili.jsx'
import Home from './Home.jsx'
import Formateur from './Formateur.jsx'
import Groupe from './Groupe.jsx'
import Filiere from './Filiere.jsx'
function App() {
  
  
 return (
<>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} >
          <Route path='utilisateurs' element={<Utili/>}/>
          <Route path='home' element={<Home/>}/>
          <Route path='formateur' element={<Formateur/>}/>
          <Route path='groupe' element={<Groupe/>}/>
          <Route path='filieres' element={<Filiere/>}/>
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
