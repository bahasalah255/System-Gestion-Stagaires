import React,{useState , useEffect} from 'react'

function Affectation(){
    const [dataform,setdataform] = useState([]);
    const [datagroup,setdatagroup] = useState([]);
    const [datamodule,setdatamodule] = useState([]);
    const [formateur,setformateur] = useState('');
    const [groupe,setgroupe] = useState('');
    const [module,setmodule] = useState('');
    const [message,setmessage] = useState('');
    const [annee,setannee] = useState('');
    const [data,setdata] = useState([]);
    const [id,setid] = useState(null);
    const Editsub = (e,id) => {
        e.preventDefault()
        setid(id)
        fetch('http://localhost:8000/affection_id.php',{
            method : "POST",
            headers : {
                 "Content-Type": "application/json"
            },
            body : JSON.stringify ({
                id : id
            })
        }
    )
    .then(res => res.json())
    .then(data => {
        setformateur(data.id_formateur)
        setgroupe(data.id_groupe)
        setmodule(data.id_module)
        setannee(data.annee)
    }
    )
    }
    const editform = (e) => {
         e.preventDefault();
        fetch('http://localhost:8000/editaffection.php',{
            method : "POST",
            headers : {
                 'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                id: id,
                formateur : formateur ,
                groupe : groupe ,
                module : module,
                annee : annee
            })
        }
    )
    .then(res => res.json())
    .then(data => {
        setmessage(data.message)
        loadaffec()
        setTimeout(() => {
            setmessage('')
        }, 3000);
    })
    }
    useEffect(() => {
        fetch('http://localhost:8000/formateur.php')
        .then(res => res.json())
        .then(data => setdataform(data))
        fetch('http://localhost:8000/list_groupes.php')
        .then(res => res.json())
        .then(data => setdatagroup(data))
        fetch('http://localhost:8000/module.php')
        .then(res => res.json())
        .then(data => setdatamodule(data))
    },[])
    const handleadd = (e) => {
        e.preventDefault()
        fetch('http://localhost:8000/addAffec.php',{
            method : 'POST',
            headers : {
                 "Content-Type": "application/json"
            },
            body : JSON.stringify({
                formateur : formateur,
                groupe : groupe,
                module : module,
                annee : annee
            })
        }
    )
    .then(res => res.json())
    .then(data => {setmessage(data.message)
        loadaffec()
        setTimeout(() => {
            setmessage('')
        }, 3000);
    })
    }
    useEffect(() => {
        fetch('http://localhost:8000/affectation.php')
        .then(res => res.json())
        .then(data => setdata(data))
    },[])
    const loadaffec = () => {
         fetch('http://localhost:8000/affectation.php')
        .then(res => res.json())
        .then(data => setdata(data))
    }
    const handledelete = (id) => {
        fetch('http://localhost:8000/delete-affection.php',{
            method : "POST" ,
            headers : {
                 "Content-Type": "application/json"
            },
            body : JSON.stringify({
                id : id
            })
        }
    )
    .then(res => res.json())
    .then(data => { setmessage(data.message)
        setTimeout(() => {
            setmessage('');
        }, 3000);
    })
    }
    return(

        <>
        <h1 className="text-center fw-bold">Gestion des Affectations</h1>
         <p  className="text-muted text-center">Gerez les Affectation Des Groupes Et des Modules Du Centre ISTA</p>
         <button className='btn btn-add btn-primary' data-bs-toggle="modal" data-bs-target="#AffectationModel"> <i className="bi bi-plus me-1"></i>Ajouter Une Affectation</button>
          {/* AJOUTER Affectation MODAL */}
        <div className="modal fade" id="AffectationModel" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Ajouter Une Affectation</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleadd}>

                  <div className="mb-3">
                    <label className="form-label">Formateur</label>
                    <select name="formateur" className='form-select' onChange={(e) => setformateur(e.target.value)}>
                        <option value="">-- chosi un formateur ---</option>
                        {dataform && dataform.map(d => {
                            return(
                                <>
                                <option value={d.id_formateur}>{d.nom_formateur}</option>
                                </>
                            );
                        })}
                    </select>
                  </div>
                   <div className="mb-3">
                    <label className="form-label">Groupe</label>
                    <select name="coef" id="coef" className='form-select' onChange={(e) => setgroupe(e.target.value)}>
                        <option value="">--- Choisi un Groupe -- </option>
                            {datagroup && datagroup.map(d => {
                                return(
                                    <>
                                    <option value={d.id_group}>{d.nom_group} || {d.annee_formation} || {d.filiere} </option>
                                    </>
                                );
                            })}
                        </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Module</label>
                    <select name="filiere" className='form-select' onChange={(e) => setmodule(e.target.value)}>
                        <option value="">--- Choisi un Module -- </option>
                        {datamodule && datamodule.map(d => {
                            return(
                                <>
                                <option value={d.id_module}>{d.nom_module} || {d.coeficient} || {d.masse_horaire} || {d.filiere} </option>
                                </>
                            );
                        })}
                        </select>
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Annee Formation</label>
                    <input type="number" min="2000" max="2100" placeholder="Année" className='form-control' onChange={(e) => setannee(e.target.value)}/>


                  </div>
                  
                  <button type="submit" className="btn btn-primary w-100" data-bs-dismiss="modal"  >
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
             <input type='text' className='form-control mb-2' placeholder='Search Bar' />
             
        <table className='table'>
             <thead>
                    <tr className='table-secondary'>
                        <th scope="col">ID</th>
                        <th scope="col">Nom Formateur</th>
                        <th scope="col">Nom Groupe</th>
                        <th scope="col">Nom Module</th>
                        <th scope='col'>Annee De Formation</th>
                        <th scope="col">Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                {data && data.map((d) => {
                    return(
                        <>
                          <tr key={d.id}>
                        <td>{d.id}</td>
                        <td>{d.nom_formateur}</td>
                        <td>{d.nom_group}</td>
                        <td>{d.nom_module}</td>
                        <td>{d.annee}</td>
                        <td>
                            <div className='d-flex justify-content-center gap-3'>
                            <button className='btn btn-info' data-bs-toggle="modal" data-bs-target="#EditaffectionModel" onClick={(e) => Editsub(e,d.id)}> <i className="bi bi-pencil me-1"></i></button>
                            <button className='btn btn-danger' onClick={() => {
                                if(window.confirm('Sure You want to remove it')){
                                    handledelete(d.id)
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
              {/* Edit Affectation MODAL */}
               <div className="modal fade" id="EditaffectionModel" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Modifier Un Module</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <form onSubmit={editform}>
                    <div className='mb-3'>
                        <label className='form-label'>ID Affecation</label>
                        <input type="number" className='form-control' value={id}  readOnly/>
                    </div>
                     <div className="mb-3">
                    <label className="form-label">Formateur</label>
                    <select name="formateur" className='form-select' value={formateur} onChange={(e) => setformateur(e.target.value)}>
                        <option value="">-- chosi un formateur ---</option>
                        {dataform && dataform.map(d => {
                            return(
                                <>
                                <option value={d.id_formateur}>{d.nom_formateur}</option>
                                </>
                            );
                        })}
                    </select>
                  </div>
                   <div className="mb-3">
                    <label className="form-label">Groupe</label>
                    <select name="coef" id="coef" className='form-select' value={groupe} onChange={(e) => setgroupe(e.target.value)}>
                        <option value="">--- Choisi un Groupe -- </option>
                            {datagroup && datagroup.map(d => {
                                return(
                                    <>
                                    <option value={d.id_group}>{d.nom_group} || {d.annee_formation} || {d.filiere} </option>
                                    </>
                                );
                            })}
                        </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Module</label>
                    <select name="filiere" className='form-select' value={module} onChange={(e) => setmodule(e.target.value)}>
                        <option value="">--- Choisi un Module -- </option>
                        {datamodule && datamodule.map(d => {
                            return(
                                <>
                                <option value={d.id_module}>{d.nom_module} || {d.coeficient} || {d.masse_horaire} || {d.filiere} </option>
                                </>
                            );
                        })}
                        </select>
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Annee Formation</label>
                    <input type="number" min="2000" max="2100" placeholder="Année" value={annee} className='form-control' onChange={(e) => setannee(e.target.value)}/>


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
export default Affectation