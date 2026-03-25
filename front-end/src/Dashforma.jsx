import { useEffect, useState } from 'react'
import {  Link, NavLink, Outlet,useNavigate } from 'react-router-dom'
function Dashforma(){
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const [isopen,setisopen] = useState(true);
  const [token,settoken] = useState(null)
  const toggleSidebar = () => setisopen(!isopen);
  const [id,setid] = useState('');
  useEffect(() => {
    // Récupère les données du localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      // Si pas connecté, redirige vers login
      navigate('/')
      return ;
    }
      const user = JSON.parse(userData);
      setid(user.id);
      settoken(user.token)
        if(user.role != "formateur" && user.role != "admin"){
          navigate("/")
          return ;
        }
        else {
             if(!user) setUser(user)
        }
       
  
  }, [])

  const handleLogout = () => {
    
    fetch('http://localhost:8000/logout.php',{
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
  .then(res => res.json())
  .then(data => {
    if(data){
      localStorage.removeItem('user') // Supprime la session
    navigate('/')
    }
  })
    
    
    
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
        <div className={`col-lg-${ isopen ? 3 : 1} col-md-${isopen ? 4 : 1} col-sm-12`}>
      <div className='sidebar' style={{width : isopen ? '100%' : '95px' , transition : '0.3s'}}>
        <div className='back d-flex justify-content-between px-1'>
        <h4 className='text-center mt-3' style={{ display : isopen ? 'block' : 'none',  width: isopen ? 'auto' : '0px',
        }}>Formateur Panel</h4>
         <button className="btn bg-transparent " onClick={toggleSidebar}>
             <i className={`${isopen ? 'bi bi-list' : 'bi bi-list'} fs-5`}></i>
            </button>
        </div>
        <hr />
        <div className='elements'>
            <ul className='links'>
              <NavLink to='/dashboard-formateur/home' end style={linkStyle}>
                 <i className="bi bi-speedometer2 fs-4"></i>  {isopen && 'Home'}
              </NavLink>
              <NavLink to='/dashboard-formateur/cahier' style={linkStyle}>
              <i className="bi bi-collection fs-4"></i> {isopen && "Cahier Text"}
              </NavLink>
              <NavLink to='/dashboard-formateur/groupes' style={linkStyle}>
              <i className="bi bi-collection fs-4"></i> {isopen && "Groupes"}
              </NavLink>
               <NavLink to='/dashboard-formateur/stagaires' style={linkStyle}>
              <i className="bi bi-mortarboard fs-4"></i> {isopen && "Stagaires"}
              </NavLink>
               <NavLink to='/dashboard-formateur/modules' style={linkStyle}>
                 <i className="bi bi-book fs-4"></i> {isopen && "Modules"}
              </NavLink>
               <NavLink to='/dashboard-formateur/notes' style={linkStyle}>
                 <i className="bi bi-file-earmark-text fs-4"></i> {isopen && "Notes"}
              </NavLink>
               <NavLink to='/dashboard-formateur/parametres' style={linkStyle}>
                 <i className="bi bi-gear-fill fs-4"></i> {isopen && "Parametres"}
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
 </div>
         <div className="p-4">
          
          <Outlet />
        </div>
    </div>
    </div>
    
    </>
  )
}
export default Dashforma