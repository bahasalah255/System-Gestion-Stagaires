import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Dashstagaire(){
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
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user') // Supprime la session
    navigate('/')
  }

  return (
    <div className="container mt-5">
      {user && (
        <>
          <h1>Bienvenue, {user.nom} !</h1>
          <button className="btn btn-danger" onClick={handleLogout}>
            Se déconnecter
          </button>
        </>
      )}
    </div>
  )
}
export default Dashstagaire