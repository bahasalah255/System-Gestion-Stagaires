import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Register(){
    const [nom,setNom] = useState('');
    const [prenom,setPrenom] = useState('');
    const [email,setEmail] = useState('');
    const navigate = useNavigate();
    const [password,setPassword] = useState('');
     const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost/gestion_ofppt/back-end/register.php',{
        method: 'POST',
        headers : {
             "Content-Type": "application/json"
        },
         body: JSON.stringify({
        nom: nom,
        prenom: prenom,
        email : email,
        password: password
      })
    })
    .then(res => res.json())
    .then(data => {console.log(data)
if(data.reussi == 'ook'){
    navigate('/')
}
     })
    }
    function handleclick(){
        navigate('/')
    }
 return(
    <>
    <div className='formulaire'>
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <h1 className='text-center'>Register</h1>
        <label>Username</label>
        <input
          type="text"
          name='nom'
          className='form-control'
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        required/>
          <label>Prenom</label>
        <input
          type="text"
          name='prenom'
          className='form-control'
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        required/>
          <label>Email</label>
        <input
          type="email"
          name='email'
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        required/>
        <label>Password</label>
        <input
          type="password"
          name='password'
          className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        required/><br/>
        <div className='d-flex justify-content-center'>
             <input type="submit" value="Se connecter" className='form-control' />
        <button type='button' onClick={handleclick} className='btn btn-danger'>Login</button>
        </div>
       
      </form>
      </div>
      </div>
    </>
 );
}
export default Register