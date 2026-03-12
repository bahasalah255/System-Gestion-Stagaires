import React,{useState, useEffect} from 'react';
import {NavLink  } from 'react-router-dom'
function DeleteUsers() {
    const [users,setusers] = useState('');
     const [ishide,setishide] = useState(true);
     const [id,setid] = useState('');
     const [message,setmessage] = useState('');
     const [error,seterror] = useState('');
        const loadUsers = () => {
         fetch('http://localhost:8000/list_users0.php')
        .then(res => res.json())
        .then(data => setusers(data))
    }
       useEffect(() => {
            fetch('http://localhost:8000/list_users0.php')
            .then(res => res.json())
            .then(data => setusers(data))
        },[])
         const hidepassword = (id) => {
      setishide((pr) => ({
        ...pr,
        [id] : !pr[id]

      })  
    
    )
    };
    const Restaurer = (id) => {
        console.log(id)
        setid(id)
        fetch('http://localhost:8000/Restaurer.php',{
            method : "POST",
            headers : {
                 'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                id : id
            })
        }
    )
    .then(res => res.json())
    .then(data => {
        setmessage(data.message)
        seterror(data.error)
        loadUsers()
        setTimeout(() => {
            setmessage('')
        },3000)
    })

        
    }
    return(
        <>
        <h1 className="text-center fw-bold">Gestion des Utilisateurs Archives</h1>
     <p  className="text-muted text-center">Gerez les Utilisateurs Archive Du Centre ISTA</p>
      {message && (
        <p className='message bg-success fs-5' role="alert">{message}   <i className="bi bi-check-circle-fill me-2"></i></p>
    )} 
     {error && (
        <p className='error bg-danger fs-5' role="alert">{error}  <i className="bi bi-x-circle me-2"></i>  </p>
    )} 
      <div className='utili'>
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
                {users && users.map((d) => {
                    return(
                        <>
                          <tr key={d.id_user}>
                        <td>{d.id_user}</td>
                        <td>{d.nom}</td>
                        <td>{d.prenom}</td>
                        <td>{d.email}</td>
                        <td > <p style={{display : ishide[d.id_user] ? 'block' : 'none' , transition : '0.3s'}}>{d.password}</p> <button className='btn btn-white'  onClick={() => hidepassword(d.id_user)}><i className={` ${ishide[d.id_user] ? "bi bi-eye-slash-fill" : "bi bi-eye-fill" }`}></i>  </button></td>
                        <td className={`badge badge-primary `}>{d.role}</td>
                        <td>{d.date_creation}</td>
                        <td>
                            <div className='d-flex justify-content-center gap-3'>
                            <button className='btn btn-info'onClick={() => Restaurer(d.id_user)}> <i className="bi bi-arrow-counterclockwise me-2"></i></button>
                           
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
                <NavLink to='/dashboard/users' >
              <button class="btn btn-info">
  <i className="bi bi-arrow-left-circle-fill me-2 text-white"></i> Retour
</button>
                </NavLink>
        </>
    );
}
export default DeleteUsers