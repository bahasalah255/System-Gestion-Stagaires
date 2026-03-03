import { useEffect, useState } from 'react'
import {  Link, NavLink, Outlet,useNavigate } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Récupère les données du localStorage
    const userData = localStorage.getItem('user')
    
    if (!userData) {
      // Si pas connecté, redirige vers login
      navigate('/')
    } else {
      setUser(JSON.parse(userData))
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('user') // Supprime la session
    navigate('/')
  }
  const linkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? '#0d6efd' : 'black',
    borderRadius: '8px',
    padding: '10px 15px',
    display: 'block',
    color: 'white',
    textDecoration: 'none',
    marginBottom: '5px'
  })
  return (
    <>
    <div className='row gx-0'>
        <div className='col-lg-3 col-md-4 col-sm-12'>
      <div className='sidebar'>
        <div className='back'>
        <h4 className='text-center mt-3'>Admin Panel</h4>
        </div>
        <hr />
        <div className='elements'>
            <ul className='links'>
              <NavLink to='/dashboard/home' end style={linkStyle}>
                 <i className="bi bi-speedometer2"></i> Home
              </NavLink>
              <NavLink to='/dashboard/utilisateurs' style={linkStyle}>
                 <i className="bi bi-people me-2"></i>
    Stagiaires
              </NavLink>
              <NavLink to='/dashboard/formateur' style={linkStyle}>
              <i className="bi bi-person-workspace"></i> Formateurs
              </NavLink>
              <NavLink to='/dashboard/groupe' style={linkStyle}>
              <i className="bi bi-collection"></i> Groupes
              </NavLink>
              <NavLink to='/dashboard/filieres' style={linkStyle}>
              <i className="bi bi-pc-display"></i> Filières
              </NavLink>
               <NavLink to='/dashboard/utilisateurs' style={linkStyle}>
                 <i className="bi bi-book"></i> Modules
              </NavLink>
               <NavLink to='/dashboard/utilisateurs' style={linkStyle}>
                 <i className="bi bi-file-earmark-text"></i> Notes
              </NavLink>
                <button className="btn btn-danger" onClick={handleLogout}>
            Se déconnecter
          </button>
            </ul>
        </div>
      </div>
      </div>
      <div className='col-lg-9 col-md-8 col-sm-12'>
      <div className="">
         <div className="p-4">
          
          <Outlet />
        </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Dashboard