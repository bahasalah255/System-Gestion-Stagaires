import React,{useState, useEffect} from 'react';
function Parametres(){
    const [nom,setnom] = useState('');
    const [prenom ,setprenom] = useState('');
    const [email ,setemail] = useState('');
    const [password ,setpassword] = useState('');
    const [role ,setrole] = useState('');
    const [id,setid] = useState(null);
      useEffect(() => {
      const userData = localStorage.getItem('user');
      const user1 = JSON.parse(userData);
      setid(user1.id)
    }, []);
    return(
        <>
        <h1 className="text-center fw-bold">Modifier Vos Informations</h1>
        <p className="text-muted mb-0 text-center" style={{fontSize: "0.85rem"}}>
  Mettez à jour les informations de votre compte.
</p>
        <div className="container1">
            <form>
            <h4 className="text-muted"> Les Informations Personnels </h4>
            <div className="row">
            <div className="col-lg-6">

                          <div className="mb-3">
                    <label className="form-label">Nom Utilisateur</label>
                    <input type="nom" className="form-control" name='nom' placeholder='Nom Utilisateur' onChange={(e) => setnom(e.target.value)} required/>
                    </div>
            </div>
              <div className="col-lg-6">

                          <div className="mb-3">
                    <label className="form-label">Prenom</label>
                    <input type="nom" className="form-control" name='prenom' placeholder='Prenom' onChange={(e) => setprenom(e.target.value)} required/>
                    </div>
            </div>
              <div className="col-lg-6">

                          <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="nom" className="form-control" name='email' placeholder='Email' onChange={(e) => setemail(e.target.value)} required/>
                    </div>
            </div>
              <div className="col-lg-6">

                          <div className="mb-3">
                    <label className="form-label">Role</label>
                     <select name="role" className='form-select'  disabled >
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
                    <input type="nom" className="form-control" name='password' placeholder='Mot De passe Actual' onChange={(e) => setnom(e.target.value)} required/>
                    </div>
                </div>
                <div className="col-lg-6">
                     <div className="mb-3">
                    <label className="form-label">Nouveau Mot de passe</label>
                    <input type="nom" className="form-control" name='password' placeholder='Mot De passe Actual' onChange={(e) => setpassword(e.target.value)} required/>
                    </div>
                    
                        <button className="btn btn-success">Enregister</button>
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