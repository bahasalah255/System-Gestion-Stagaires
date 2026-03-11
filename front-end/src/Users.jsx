import React,{useState, useEffect} from 'react';
import Delete from './Delete.jsx';
function Users(){
    const [users,setusers] = useState([])
    const [ishide,setishide] = useState(true)
    const [background,setbackground] = useState('');
    const [message,setmessage] = useState('');
    const [nom ,setnom] = useState('');
    const [prenom ,setprenom] = useState('');
    const [email ,setemail] = useState('');
    const [password ,setpassword] = useState('');
    const [role ,setrole] = useState('');
    const [selectedid,setSelectedId] = useState(null);
    const [user, setuser] = useState('');
    const [error , seterror] = useState('');
   useEffect(() => {
  const userData = localStorage.getItem('user');
  const user1 = JSON.parse(userData);
  setuser(user1.nom);
}, []);

useEffect(() => {
  console.log(user); 
}, [user]); 
    
    const handledelete = (id) => {
        fetch('http://localhost:8000/delete_user.php',{
            method: "POST",
            headers : {
                   'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                id: id
            })
        }
    )
    .then(res => res.json())
    .then(data => {
       loadUsers()
        console.log(data.message)
        setmessage(data.message)
        seterror(data.error)
        setTimeout(() => {
                setmessage('')
                seterror('')
            }, 3000);
    })
    }
    const hidepassword = (id) => {
      setishide((pr) => ({
        ...pr,
        [id] : !pr[id]

      })  
    
    )
    };
   const handlAdd = (e) => {
         e.preventDefault()
        fetch('http://localhost:8000/add_user.php',{
            method : 'POST',
            headers : {
                  'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                nom : nom,
                prenom : prenom,
                email : email,
                password : password,
                role : role
            })
        })
        .then(res => res.json())
        .then(dataf => {
            loadUsers()
            setmessage(dataf.message)
            seterror(dataf.error)
            setTimeout(() => {
                setmessage('')
                seterror('')
            }, 3000);
        })
        .catch(err => console.error('Erreur:', err))
    }
    useEffect(() => {
        fetch('http://localhost:8000/users.php')
        .then(res => res.json())
        .then(data => setusers(data))
    },[])
    const loadUsers = () => {
         fetch('http://localhost:8000/users.php')
        .then(res => res.json())
        .then(data => setusers(data))
    }
return(
    <>
     <h1 className="text-center fw-bold">Gestion des Utilisateurs</h1>
     <p  className="text-muted text-center">Gerez les Utilisateurs Du Centre ISTA</p>
      <button className='btn btn-add btn-primary' data-bs-toggle="modal" data-bs-target="#userModel"> <i className="bi bi-plus me-1"></i>Ajouter Un Utilisateur</button>
        {/* AJOUTER user MODAL */}
        <div className="modal fade" id="userModel" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Ajouter Un Utilisateur</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handlAdd}>
                 <div className='row'>
                    <div className='col-lg-4'>
                          <div className="mb-3">
                    <label className="form-label">Nom Utilisateur</label>
                    <input type="nom" className="form-control" name='nom' placeholder='Nom Utilisateur' onChange={(e) => setnom(e.target.value)} required/>
                    </div>
                    </div>
                    <div className='col-lg-4'>
                     <div className="mb-3">
                    <label className="form-label">Prenom</label>
                    <input type="nom" className="form-control" name='prenom' placeholder='Prenom Utilisateur' onChange={(e) => setprenom(e.target.value)} required />
                  </div>
                  </div>
                  <div className='col-lg-4'>
                     <div className="mb-3">
                    <label className="form-label">Email</label>
                  <input type="email" className="form-control" name='email' placeholder='Email Utilisateur' onChange={(e) => setemail(e.target.value)} required />
                  </div>
                  </div>
                  <div className='col-lg-6'>
                     <div className="mb-3">
                    <label className="form-label">Password</label>
                  <input type="password" className="form-control" name='password' placeholder='Mot de passe' onChange={(e) => setpassword(e.target.value)}required />
                  </div>
                  </div>
                  <div className='col-lg-6'>
                     <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select name="role" className='form-select' onChange={(e) => setrole(e.target.value)} required >
                        <option value="">--------Choisir Un Role -----</option>
                        <option value="admin">Admin</option>
                        <option value="formateur">Formateur</option>
                        <option value="stagaire">Stagaire</option>
                    </select>
                  </div>
                  </div>
                 </div>
                
                  <button type="submit" className="btn btn-primary w-100" data-bs-dismiss="modal"  >
                    Enregistrer
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
{/* finit MODAL user */}
       <div className='utili'>
        {message && (
        <p className='message bg-success fs-5' role="alert">{message}   <i className="bi bi-check-circle-fill me-2"></i></p>
    )} 
    {error && (
        <p className='error bg-danger fs-5' role="alert">{error}   <i className="bi bi-check-circle-fill me-2"></i></p>
    )} 
        <div className='stagaires'>
        <table className='table'>

             <thead>
                    <tr className='table-secondary'>
                        <th scope="col">ID User</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prenom</th>
                        <th scope="col">Email</th>
                         <th scope="col">Password</th>
                        <th scope="col">Role</th>
                         <th scope="col">Date Creation</th>
                        <th scope="col">Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <Delete  modalId="deletemodal" onConfirm={() => {
                                handledelete(selectedid)
                            }}/>
                {users && users.map((d) => {
                    return(
                        <>
                          <tr key={d.id_user}>
                        <td>{d.id_user}</td>
                        <td>{d.nom}</td>
                        <td>{d.prenom}</td>
                        <td>{d.email}</td>
                        <td > <p style={{display : ishide[d.id_user] ? 'block' : 'none' , transition : '0.3s'}}>{d.password}</p> <button className='btn btn-white'  onClick={() => hidepassword(d.id_user)}><i className={` ${ishide[d.id_user] ? "bi bi-eye-slash-fill" : "bi bi-eye-fill" }`}></i>  </button></td>
                        <td className={`badge badge-primary ${background} `} onClick={() => badges(d.role)}>{d.role}</td>
                        <td>{d.date_creation}</td>
                        <td>
                            <div className='d-flex justify-content-center gap-3'>
                            <button className='btn btn-info' data-bs-toggle="modal" data-bs-target="#EditGroupeModal" onClick={(e) => Editsub(e,d.id_group)}> <i className="bi bi-pencil me-1"></i></button>
                            <button className={`btn btn-danger ${ user == d.nom ? 'd-none' : 'd-block'}`} data-bs-toggle="modal" data-bs-target="#deletemodal"  onClick={() => setSelectedId(d.id_user)} ><i className="bi bi-trash me-1"></i></button>
                            </div>
                            
                        </td>

                    </tr>
                        </>
                    );
                  
                })}
                </tbody>
                </table>
                </div>
                </div>
                
    </>
);
}
export default Users