import { useEffect, useState } from 'react'
import {  Link, NavLink, Outlet,useNavigate } from 'react-router-dom'
import { BASE_URL } from './config';

function Dashboard() {
  const [user, setUser] = useState(null)
  const [isopen,setisopen] = useState(true);
  const [id,setid] = useState('');
  const [token,settoken] = useState('')
  const navigate = useNavigate()
  
  const toggleSidebar = () => setisopen(!isopen);
  useEffect(() => {
     const userData = localStorage.getItem('user');
     
    if (!userData) {
        navigate('/');
        return;
    }

    const user = JSON.parse(userData);
    settoken(user.token) // parse une seule fois
    setid(user.id);
    if (user.role !== "admin") {
        navigate('/');
        return;
    }

    if(!user) setUser(user); // réutilise la variable déjà parsée
  }, [])

  const handleLogout = () => {
    fetch(`${BASE_URL}/logout.php`,{
      method : 'POST',
      headers : {
         'Content-Type' : 'application/json',
         'Authorization': 'Bearer ' + token
      },
      body : JSON.stringify({
        id : id

      })
    }
  )
    
    
    localStorage.removeItem('user') // Supprime la session
    navigate('/')
  }
  const linkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? '#4F46E5' : '#1E293B',
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
      
        <div className={`col-lg-${ isopen ? 3 : 2} col-md-${isopen ? 4 : 2} col-sm-12`}>
      <div className='sidebar' style={{width : isopen ? '100%' : '140px' , transition : '0.3s'}}>
        <div className='back d-flex justify-content-between px-1'>
        <h4 className='text-center mt-3' style={{ display : isopen ? 'block' : 'none',  width: isopen ? 'auto' : '0px',
        }}>Admin Panel</h4>
         <button className="btn bg-transparent " onClick={toggleSidebar}>
             <i className={`${isopen ? 'bi bi-list' : 'bi bi-list'} fs-5`}></i>
            </button>
        </div>
        <hr />
        <div className='elements'>
            <ul className='links'>
              <NavLink to='/dashboard/home' end style={linkStyle}>
                 <i className="bi bi-speedometer2 fs-4"></i>  {isopen && 'Home'}
              </NavLink>
                <NavLink to='/dashboard/users' style={linkStyle}>
               <i className="bi bi-person-gear fs-4"></i> {isopen && "Manage Users"}
              </NavLink>
              <NavLink to='/dashboard/utilisateurs' style={linkStyle}>
                 <i className="bi bi-people me-2 fs-4"></i>
     {isopen && "Stagiaires"}
              </NavLink>
              <NavLink to='/dashboard/formateur' style={linkStyle}>
              <i className="bi bi-person-workspace fs-4"></i> {isopen && "Formateurs"}
              </NavLink>
               <NavLink to='/dashboard/cahier' style={linkStyle}>
              <i className="bi bi-person-workspace fs-4"></i> {isopen && "Cahier Text"}
              </NavLink>
              <NavLink to='/dashboard/groupe' style={linkStyle}>
              <i className="bi bi-collection fs-4"></i> {isopen && "Groupes"}
              </NavLink>
               <NavLink to='/dashboard/affectation' style={linkStyle}>
              <i className="bi bi-person-check fs-4"></i> {isopen && "Affectations"}
              </NavLink>
              <NavLink to='/dashboard/filieres' style={linkStyle}>
              <i className="bi bi-pc-display fs-4"></i> {isopen && "Filières"}
              </NavLink>
               <NavLink to='/dashboard/modules' style={linkStyle}>
                 <i className="bi bi-book fs-4"></i> {isopen && "Modules"}
              </NavLink>
               <NavLink to='/dashboard/notes' style={linkStyle}>
                 <i className="bi bi-file-earmark-text fs-4"></i> {isopen && "Notes"}
              </NavLink>
                <button className="btn btn-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2 fs-4"></i> {isopen && "Se déconnecter"}
          </button>
            </ul>
        </div>
      </div>
      </div>
      
      <div className='col-lg-9 col-md-8 col-sm-12'>
      <div className="navbar sticky-top">
        <p className='fs-4 m-1 mt-3'>Tableau De Bord</p>
        <p>{user && user.nom}</p>
        <NavLink to='/dashboard/parametres' >
        <button className='btn btn-secondary mx-3 fs-6'><i className="bi bi-gear-fill"></i> Parametres</button>
        </NavLink>
 </div>
         <div className="main p-5">
          
          <Outlet />
        </div>
    </div>
    </div>
    </>
  )
}

export default Dashboard