import React,{useState, useEffect} from 'react';
function Module(){
    const [nom,setnom] = useState('');
    const [coeficient,setcoeficient] = useState('');
    const [filiere,setfiliere] = useState('');
    const [masse,setmasse] = useState('');
    const [filieredata,setfilieredata] = useState('');
    const [data,setdata] = useState([]);
    const [message,setmessage] = useState('');
    const [id,setid] = useState('');
    const [search,setsearch] = useState('');
    const [filtreby, setfilireby] = useState('all');
    const [token,settoken] = useState('');
               useEffect(() => {
              const userData = localStorage.getItem('user');
              const user1 = JSON.parse(userData);
              settoken(user1.token)
            }, []);
    const filitresmodules = data.filter(d => {
        const matchename = d.nom_module.toLowerCase().includes(search.toLowerCase())
        const matchefilire = 
        filtreby == "all" || d.filiere == filtreby 
         
        return matchefilire && matchename
        
    })
    const Editsub  = (e,id) => {
        setid(id);
        fetch('http://localhost:8000/module_id.php',{
            method: "POST",
            headers : {
                 'Content-Type' : 'application/json',
                 'Authorization': 'Bearer ' + token
            },
            body : JSON.stringify({
                id: id
            })
        }
    )
        .then(res => res.json())
        .then(data1 => {
            setnom(data1.nom_module)
            setcoeficient(data1.coeficient)
            setfiliere(data1.id_filiere)
            setmasse(data1.masse_horaire)
            
        })

    }
    const handlEdit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/editmodule.php',{
            method : "POST",
            headers : {
                 'Content-Type' : 'application/json',
                 'Authorization': 'Bearer ' + token
            },
            body : JSON.stringify({
                id: id,
                nom : nom,
                filiere : filiere,
                masse: masse,
                coeficient : coeficient
            })
        }
    )
    .then(res => res.json())
    .then(data => {
        setmessage(data.message)
        loadmodule()
        setTimeout(() => {
            setmessage('')
        }, 3000);
    })
    }
    const handledelete = (id) => {
        fetch('http://localhost:8000/delete_module.php',{
            method: "POST",
            headers : {
                   'Content-Type' : 'application/json',
                   'Authorization': 'Bearer ' + token
            },
            body : JSON.stringify({
                id: id
            })
        }
    )
    .then(res => res.json())
    .then(data => {
        loadmodule()
        console.log(data.message)
        setmessage(data.message)
        setTimeout(() => {
                setmessage('')
            }, 3000);
    })
    }
    useEffect(() => {
        if (!token) return ;
        fetch('http://localhost:8000/module.php',{
            headers : {
                   'Content-Type' : 'application/json',
                   'Authorization': 'Bearer ' + token
            }
        }
    )
        .then(res => res.json())
        .then(data =>setdata(data))
        ;
    },[token])
    const loadmodule = () => {
        fetch('http://localhost:8000/module.php',{
            headers : {
                 'Content-Type' : 'application/json',
                   'Authorization': 'Bearer ' + token
            }
        }
    )
        .then(res => res.json())
        .then(data =>setdata(data))
    }
    const handlAdd = (e) => {
         e.preventDefault()
        fetch('http://localhost:8000/add_module.php',{
            method : 'POST',
            headers : {
                  'Content-Type' : 'application/json',
                  'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                nom : nom,
                filiere: filiere,
                coeficient : coeficient,
                masse : masse
            })
        })
        .then(res => res.json())
        .then(dataf => {
            loadmodule()
            setmessage(dataf.message)
            setTimeout(() => {
                setmessage('')
            }, 3000);
        })
        .catch(err => console.error('Erreur:', err))
    }
     useEffect(() => {
        if(!token) return;
            fetch('http://localhost:8000/filiere.php',{
                headers : {
                     'Content-Type' : 'application/json',
                  'Authorization': 'Bearer ' + token
                }
            }
        )
            .then(res => res.json())
            .then(data => {setfilieredata(data)
                console.log(data)
            })
        },[filiere,token])

    return(
        <>
         <h1 className="text-center fw-bold">Gestion des Modules</h1>
         <p  className="text-muted text-center">Gerez les Modules Du Centre ISTA</p>
         <button className='btn btn-add btn-danger' data-bs-toggle="modal" data-bs-target="#moduleModel"> <i className="bi bi-plus me-1"></i>Ajouter Un Module</button>
           {/* AJOUTER MOdule MODAL */}
        <div className="modal fade" id="moduleModel" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Ajouter Un Module</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handlAdd }>

                  <div className="mb-3">
                    <label className="form-label">Nom Module</label>
                    <input type="tel" className="form-control" name='nom' onChange={(e) => setnom(e.target.value)}/>
                  </div>
                   <div className="mb-3">
                    <label className="form-label">coeficient Module</label>
                    <select name="coef" id="coef" className='form-select' onChange={(e) => setcoeficient(e.target.value)}>
                        <option value="">--- Choisi un Coeficient -- </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Filiere</label>
                    <select name="filiere" className='form-select' onChange={(e) => setfiliere(e.target.value)}>
                        <option value="">--- Choisi une Filiere -- </option>
                        {filieredata && filieredata.map(filiere => {
                            return(
                                <>
                                <option value={filiere.id_filiere}>{filiere.nom}</option>
                                </>
                            );
                        })}
                            
                        </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Massa Horaire Module</label>
                    <input type="number" name='massehoraire' className='form-control'  onChange={(e) => setmasse(e.target.value)}/>
                  </div>

                  <button type="submit" className="btn btn-danger w-100" data-bs-dismiss="modal"  >
                    Enregistrer
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
{/* finit MODAL module */}

 <div className='utili'>
    {message && (
        <p className='message bg-success fs-5' role="alert">{message}   <i className="bi bi-check-circle-fill me-2"></i></p>
    )} 
        <div className='stagaires'>
             <input type='text' className='form-control mb-2' placeholder='Search Bar' onChange={(e) => setsearch(e.target.value)}/>
             <select className='form-select ' onChange={(e) => setfilireby(e.target.value)}>
                 <option value="all">--- All -- </option>
                        {filieredata && filieredata.map(filiere => {
                            return(
                                <>
                                <option value={filiere.nom}>{filiere.nom}</option>
                                </>
                            );
                        })}
             </select>
        <table className='table'>
             <thead>
                    <tr className='table-secondary'>
                        <th scope="col">ID Module</th>
                        <th scope="col">Nom Module</th>
                        <th scope="col">Coefficient</th>
                        <th scope="col">Filiere</th>
                        <th scope='col'>Masse Horaire</th>
                        <th scope="col">Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                {filitresmodules && filitresmodules.map((d) => {
                    return(
                        <>
                          <tr key={d.id_module}>
                        <td>{d.id_module}</td>
                        <td>{d.nom_module}</td>
                        <td>{d.coeficient}</td>
                        <td>{d.filiere}</td>
                        <td>{d.masse_horaire}H</td>
                        <td>
                            <div className='d-flex justify-content-center gap-3'>
                            <button className='btn btn-info' data-bs-toggle="modal" data-bs-target="#EditmoduleModel" onClick={(e) => Editsub(e,d.id_module)}> <i className="bi bi-pencil me-1"></i></button>
                            <button className='btn btn-danger' onClick={() => {
                                if(window.confirm('Sure You want to remove it')){
                                    handledelete(d.id_module)
                                }
                                /*
                                const x = window.prompt('Type Yes or Oui if You Want to Delete');
                                if(x.toLowerCase() == "oui"  || x.toLowerCase() == 'yes'){
                                    handledelete(d.id_module)
                                }
                                    */
                            }}><i className="bi bi-trash me-1"></i></button>
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
              {/* AJOUTER MOdule MODAL */}
        <div className="modal fade" id="EditmoduleModel" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Modifier Un Module</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handlEdit }>
                     <div className="mb-3">
                    <label className="form-label">ID Module</label>
                    <input type="tel" className="form-control bg-secondary text-white" name='id' value={id} readOnly/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nom Module</label>
                    <input type="nom" className="form-control" name='nom' value={nom} onChange={(e) => setnom(e.target.value)}/>
                  </div>
                   <div className="mb-3">
                    <label className="form-label">coeficient Module</label>
                    <select name="coef" id="coef" className='form-select' value={coeficient} onChange={(e) => setcoeficient(e.target.value)}>
                        <option value="">--- Choisi un Coeficient -- </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Filiere</label>
                    <select name="filiere" className='form-select' value={filiere} onChange={(e) => setfiliere(e.target.value)}>
                        <option value="">--- Choisi une Filiere -- </option>
                        {filieredata && filieredata.map(filiere => {
                            return(
                                <>
                                <option value={filiere.id_filiere}>{filiere.nom}</option>
                                </>
                            );
                        })}
                            
                        </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Massa Horaire Module</label>
                    <input type="number" name='massehoraire' className='form-control' value={masse} onChange={(e) => setmasse(e.target.value)}/>
                  </div>

                  <button type="submit" className="btn btn-danger w-100" data-bs-dismiss="modal"  >
                    Enregistrer
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
{/* finit MODAL module */}
        </>

    );
}
export default Module
