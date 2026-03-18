import React,{useState, useEffect} from 'react';
function Parametres(){
    const [nom,setnom] = useState('');
    const [prenom ,setprenom] = useState('');
    const [email ,setemail] = useState('');
    const [password ,setpassword] = useState('');
    const [role ,setrole] = useState('');
    const [id,setid] = useState(null);
    const [newpassword,setnewpassword] = useState('');
    const [error , seterror] = useState('');
    const [message,setmessage] = useState('');
    const [token,settoken] = useState('');
      useEffect(() => {
      const userData = localStorage.getItem('user');
      const user1 = JSON.parse(userData);
      setid(user1.id)
      settoken(user1.token)
    }, []);
    useEffect(() => {
        if(!token) return;
        fetch('http://localhost:8000/user_id.php',{
            method : "POST",
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
         data.map(d => {
            setnom(d.nom)
        setprenom(d.prenom)
        setemail(d.email)
        setrole(d.role)
        
        })
    })
    },[id,token])
    const handleEdit = (e) => {
        console.log(password)
         e.preventDefault()
        fetch('http://localhost:8000/edituser_dashbord.php',{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                 'Authorization': 'Bearer ' + token
            },
            body : JSON.stringify({
                id : id,
                nom : nom,
                prenom : prenom,
                email : email ,
                password : password,
                role : role,
                newpassword : newpassword
            })
        }
    )
    .then( res => res.json())
    .then(data => {
        setmessage(data.message)
        seterror(data.error)
        setTimeout(() => {
            setmessage('')
        seterror('')
        }, 3000);
    })
    .catch (error => console.log(error))
    }
    return(
        <>

        <h1 className="text-center fw-bold">Modifier Vos Informations</h1>
        <p className="text-muted mb-0 text-center" style={{fontSize: "0.85rem"}}>
  Mettez à jour les informations de votre compte.
</p>
  {message && (
        <p className='message bg-success fs-5' role="alert">{message}   <i className="bi bi-check-circle-fill me-2"></i></p>
    )} 
    {error && (
        <p className='error bg-danger fs-5' role="alert">{error}  <i className="bi bi-x-circle me-2"></i>  </p>
    )} 
        <div className="container1">
            <div className="alert alert-warning d-flex align-items-center gap-2" role="alert">
  <i className="bi bi-exclamation-triangle-fill fs-5"></i>
  <span>Le <strong>mot de passe actuel</strong> est obligatoire pour effectuer des modifications.</span>
</div>
            <form onSubmit={handleEdit}>
            <h4 className="text-muted"> Les Informations Personnels </h4>
            <div className="row">
            <div className="col-lg-6">

                          <div className="mb-3">
                    <label className="form-label">Nom Utilisateur</label>
                    <input type="nom" className="form-control" name='nom' value={nom} placeholder='Nom Utilisateur' onChange={(e) => setnom(e.target.value)} required/>
                    </div>
            </div>
              <div className="col-lg-6">

                          <div className="mb-3">
                    <label className="form-label">Prenom</label>
                    <input type="nom" className="form-control" name='prenom' value={prenom} placeholder='Prenom' onChange={(e) => setprenom(e.target.value)} required/>
                    </div>
            </div>
              <div className="col-lg-6">

                          <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="nom" className="form-control" name='email' value={email} placeholder='Email' onChange={(e) => setemail(e.target.value)} required/>
                    </div>
            </div>
              <div className="col-lg-6">

                          <div className="mb-3">
                    <label className="form-label">Role</label>
                     <select name="role" className='form-select' value={role}  disabled >
                        <option value="">--------Choisir Un Role -----</option>
                        <option value="admin">Admin</option>
                        <option value="formateur">Formateur</option>
                        <option value="stagaire">Stagaire</option>
                    </select>
                    </div>
            </div>
            </div>
             <h4 className="text-muted">Securite</h4>
             <div className="row">
                <div className="col-lg-6">
                     <div className="mb-3">
                    <label className="form-label">Mot de passe Actual</label>
                    <input type="password" className="form-control" name='password' placeholder='Mot De passe Actual' onChange={(e) => setpassword(e.target.value)} />
                    </div>
                </div>
                <div className="col-lg-6">
                     <div className="mb-3">
                    <label className="form-label">Nouveau Mot de passe</label>
                    <input type="password" className="form-control" name='newpassword' placeholder='Mot De passe Actual' onChange={(e) => setnewpassword(e.target.value)} />
                    </div>
                    
                        <button type="submit" className="btn btn-success">Enregister</button>
                    &nbsp;
                       <button className="btn btn-info" type="reset">Reset</button>
                    
                    
                </div>
                
             </div>
        </form>
        </div>
        </>
    );
}
export default Parametres