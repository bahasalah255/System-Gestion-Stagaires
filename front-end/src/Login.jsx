import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [nom, setNom] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Le fetch doit être ICI, dans le handleSubmit
    fetch('http://localhost/gestion_ofppt/back-end/login.php', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nom: nom,
        password: password
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.status === "ok" && data.user.role === 'admin') {
            localStorage.setItem('user',JSON.stringify(data.user))
            setMessage("Connexion réussie !");
            navigate('/dashboard');
        }
        
         else if(data.status === "ok" && data.user.role === 'formateur') {
            localStorage.setItem('user',JSON.stringify(data.user))
            setMessage("Connexion réussie !");
            navigate('/dashboard-formateur');   
         
      }
      else {
         localStorage.setItem('user',JSON.stringify(data.user))
            setMessage("Connexion réussie !");
            navigate('/dashboard-stagaire');   
         
      }
    })
    .catch(err => console.error("Erreur:", err));
  }
function handleclick(){
    navigate('/register');
}
  return (
    <>
    <div className='formulaire'>
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <h1 className='text-center'>Login</h1>
        <label>Username</label>
        <input
          type="text"
          name='nom'
          className='form-control'
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          name='password'
          className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {message && <p>{message}</p>}<br/>
        <div className='d-flex justify-content-center'>
             <input type="submit" value="Se connecter" className='form-control' />
        <button type='button' onClick={handleclick} className='btn btn-danger'>Register</button>
        </div>
       
      </form>
      </div>
      </div>
    </>
  );
}

export default Login