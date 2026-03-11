import React,{useState, useEffect} from 'react';
function Users(){
    const [users,setusers] = useState([])
    const [ishide,setishide] = useState(true)
    const [background,setbackground] = useState('');
    const [message,setmessage] = useState('');
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
        setTimeout(() => {
                setmessage('')
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
    const badges = (role) => {
        if(role == "admin"){
            setbackground('bg-primary')
        }
        else if(role == "formateur"){
            setbackground('bg-success')
        }
        else {
            setbackground('bg-white')
        }

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
       <div className='utili'>
        {message && (
        <p className='message bg-success fs-5' role="alert">{message}   <i className="bi bi-check-circle-fill me-2"></i></p>
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
                            <button className='btn btn-danger' onClick={() => 
                                {
                                    if(window.confirm('Are you sure : ')){
                                        handledelete(d.id_user)
                                    }
                                }
                            }><i className="bi bi-trash me-1"></i></button>
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