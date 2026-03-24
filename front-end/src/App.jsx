
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
import Module from './Module.jsx'
import HomeFormateur from './formateur/HomeFormateur.jsx'
import GroupeForma from './formateur/GroupeForma.jsx'
import ModuleForma from './formateur/ModuleForma.jsx'
import NotesForma from './formateur/NotesForma.jsx'
import ParaForma from './formateur/ParaForma.jsx'
import Affectation from './Affectation.jsx'
import Users from './Users.jsx'
import DeleteUsers from './DeleteUsers.jsx'
import Parametres from './Parametres.jsx'
import StagairesForm from './formateur/StagairesForm.jsx';

function App() {
  
  
 return (
<>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} >
          <Route path='utilisateurs' element={<Utili/>}/>
          <Route path='home' element={<Home/>}/>
          <Route path='users' element={<Users/>}/>
          <Route path='formateur' element={<Formateur/>}/>
          <Route path='groupe' element={<Groupe/>}/>
          <Route path='filieres' element={<Filiere/>}/>
          <Route path='modules' element={<Module/>}/>
          <Route path='affectation' element={<Affectation/>}/>
          <Route path='user-delete' element={<DeleteUsers/>}/>
          <Route path='parametres' element={<Parametres/>}/>
        </Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard-formateur' element={<Dashforma/>}>
                  <Route path='home' element={<HomeFormateur/>}/>
                  <Route path='stagaires' element={<StagairesForm/>}/>
                  <Route path='groupes' element={<GroupeForma/>}/>
                  <Route path='modules' element={<ModuleForma/>}/>
                  <Route path='notes' element={<NotesForma/>}/>
                  <Route path='parametres' element={<ParaForma/>}/>
        </Route>
        <Route path='/dashboard-stagaire' element={<Dashstagaire/>}/>
      </Routes>
    </BrowserRouter>

</>
 );
}

export default App
