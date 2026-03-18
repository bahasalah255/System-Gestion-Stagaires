
import React,{useState , useEffect} from 'react'
function Formateur(){
    const [data,setdata] = useState('')
    const [nom,setnom] = useState('')
    const [telephone,settelephone] = useState('')
    const [specialite,setspecialite] = useState('')
    const [id,setID] = useState(null)
    const [datauser,setdatauser] = useState([]);
    const [user,setusernom] = useState('');
    const [message,setmessage] = useState('');
     const [token,settoken] = useState('');
       useEffect(() => {
      const userData = localStorage.getItem('user');
      const user1 = JSON.parse(userData);
      
      settoken(user1.token)
    }, []);
    useEffect(() => {
      if (!token) return;
        fetch('http://localhost:8000/formateur.php',{
          headers : {
             'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + token
          }
        }
      )
        .then(res => res.json())
      .then(data => {setdata(data)
        console.log(data)
        fetch('http://localhost:8000/list_users.php',{
          headers : {
             'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + token
          }
        }
      )
        .then(res => res.json())
        .then(data => 
          setdatauser(data)
        )
      })
    },[token])
    const loadformateurs = () => {
            fetch('http://localhost:8000/formateur.php',{
              headers : {
                 'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + token
              }
            }
          )
        .then(res => res.json())
      .then(data => {setdata(data)
        console.log(data)
      })
        
    }
    const Edit = (id) => {
        setID(id)
        fetch('http://localhost:8000/formateur_id.php',{
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                id : id
            })

        }
    )
    .then(res => res.json())
    .then(data => {
        setnom(data.nom_formateur)
        settelephone(data.telephone)
        setspecialite(data.specialite)
        setusernom(data.id_user)
    })
    }
    const EditForm = (e) => {
      e.preventDefault()
        fetch('http://localhost:8000/editformateur.php',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + token

            },
            body : JSON.stringify({
                id : id,
                nom : nom,
                telephone: telephone,
                specialite: specialite,
                user : user
            })

        }
    )
    .then(res => res.json())
    .then(data=> {
      setmessage(data.message)
      setTimeout(() => {
        setmessage('')
      }, 3000);
        loadformateurs()
    }
    )
    }
    const handleadd = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/add_formateur.php',{
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
          nom : nom,
          telephone : telephone,
          specialite : specialite,
          user : user
        })
        }
    )
    .then(res => res.json())
    .then(data => loadformateurs())
    }
    const deleteitem = (id) => {
        fetch('http://localhost:8000/delete_formateur.php',{
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
         id : id
        })
        })
        .then(res => res.json())
        .then(data => {console.log(data)
            loadformateurs()
        })
    }

return(
    <>
    <h1 className="text-center fw-bold">Gestion des Formateurs</h1>
     <p className='text-center text-muted'>Gerez et Suivre les informations des Formateurs</p>
     <button className="btn btn-add btn-danger" data-bs-toggle="modal" data-bs-target="#formateurModal"> <i className="bi bi-plus"></i>Ajouter Un Formateur</button>
     {/* AJOUTER FORMATEUR MODAL */}
        <div className="modal fade" id="formateurModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Ajouter Un formateur</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleadd}>
                  <div className='mb-3'>
                    <label className='form-label'>Nom User</label>
                    <select name="iduser" className='form-select' onChange={(e) => setusernom(e.target.value)} >
                      <option value="">------------------</option>
                      {datauser && datauser.map(d => {
                        return(
                          <>
                          <option value={d.id_user}>{d.nom}</option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input type="text" className="form-control" name='nom' placeholder="Entrez le nom de formateur" onChange={(e) => setnom(e.target.value)}/>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Telephone</label>
                    <input type="tel" className="form-control" name='telephone' placeholder="+212000000" onChange={(e) => settelephone(e.target.value)}/>
                  </div>
                   <div className="mb-3">
                    <label className="form-label">Specialite</label>
                    <select className="form-select" name="specialite" onChange={(e) => setspecialite(e.target.value)}>
                         <option value="">-- Choisir une spécialité --</option>
                            <option value="html_css_js">HTML / CSS / JavaScript</option>
                            <option value="react">React.js</option>
                            <option value="vue">Vue.js</option>
                            <option value="angular">Angular</option>
                            <option value="php">PHP</option>
                            <option value="laravel">Laravel</option>
                            <option value="nodejs">Node.js</option>
                            <option value="python">Python</option>
                            <option value="mysql">MySQL</option>
                            <option value="mongodb">MongoDB</option>
                            <option value="POO">POO</option>
                            <option value="cloud">Cloud</option>
                            <option value="git">Git / GitHub</option>
                            <option value="culture numerique">Culture numerique</option>
                            <option value="bases algorithme">Les bases d'algorithme</option>
                            <option value="base Donnes">Base de Donnes</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-danger w-100" data-bs-dismiss="modal"  >
                    Enregistrer
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
{/* finit Formateur */}
{/* Tableau Affiche Formateur */}
    <div className='utili'>
         {message && (
        <p className='message bg-success fs-5' role="alert">{message}   <i className="bi bi-check-circle-fill me-2"></i></p>
    )} 
        <div className='stagaires'>
        <table className='table'>

             <thead>
                    <tr className='table-secondary'>
                        <th scope="col">ID Formateur</th>
                        <th scope="col">Nom Formateur</th>
                        <th scope="col">Telephone</th>
                        <th scope="col">Specialite</th>
                        <th scope='col'>User</th>
                        <th scope="col">Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                {data && data.map(d => {
                    return (
                        <>
                        <tr key={d.id_formateur}>
                            <td>{d.id_formateur}</td>
                            <td>{d.nom_formateur}</td>
                            <td>{d.telephone}</td>
                            <td>{d.specialite}</td>
                            <td>{d.nom}</td>
                            <td>
                                <div className='d-flex justify-content-center gap-3'>
                                     <button className='btn btn-info' data-bs-toggle="modal" data-bs-target="#EditformateurModal" onClick={() => Edit(d.id_formateur)}> <i className="bi bi-pencil"></i></button>
                                      <div className="modal fade" id="EditformateurModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Modifier Un formateur</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <form onSubmit={EditForm}>
                  <div className='mb-3'>
                    <label className='form-label'>Nom User</label>
                    <select name="iduser" className='form-select' value={user} onChange={(e) => setusernom(e.target.value)} >
                      <option value="">------------------</option>
                      {datauser && datauser.map(d => {
                        return(
                          <>
                          <option value={d.id_user}>{d.nom}</option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input type="text" className="form-control" name='nom' value={nom} placeholder="Entrez le nom de formateur" onChange={(e) => setnom(e.target.value)}/>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Telephone</label>
                    <input type="tel" className="form-control" name='telephone' value={telephone} placeholder="+212000000" onChange={(e) => settelephone(e.target.value)}/>
                  </div>
                   <div className="mb-3">
                    <label className="form-label">Specialite</label>
                    <select className="form-select" name="specialite" value={specialite} onChange={(e) => setspecialite(e.target.value)}>
                         <option value="">-- Choisir une spécialité --</option>
                            <option value="html_css_js">HTML / CSS / JavaScript</option>
                            <option value="react">React.js</option>
                            <option value="vue">Vue.js</option>
                            <option value="angular">Angular</option>
                            <option value="php">PHP</option>
                            <option value="laravel">Laravel</option>
                            <option value="nodejs">Node.js</option>
                            <option value="python">Python</option>
                            <option value="mysql">MySQL</option>
                            <option value="mongodb">MongoDB</option>
                            <option value="POO">POO</option>
                            <option value="cloud">Cloud</option>
                            <option value="git">Git / GitHub</option>
                            <option value="culture numerique">Culture numerique</option>
                            <option value="bases algorithme">Les bases d'algorithme</option>
                            <option value="base Donnes">Base de Donnes</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-danger w-100" data-bs-dismiss="modal"  >
                    Enregistrer
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
{/* finit Edit Formateur */}
                                <button className='btn btn-danger' onClick={() => {
                                   if(window.confirm('Are you sure you want to remove it')){
                                    deleteitem(d.id_formateur) }
                                }}>
                                <i className="bi bi-trash"></i></button>
                                </div>
                               
                            </td>
                        </tr>
                        </>
                    )
                })}
                </tbody>
                </table>
                </div>
                </div>
                {/* Tableau Affiche Formateur */}
    </>
);
}
export default Formateur