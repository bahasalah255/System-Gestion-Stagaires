import React,{useState, useEffect} from 'react';
function Module(){
    const [nom,setnom] = useState('');
    const [coeficient,setcoeficient] = useState('');
    const [filiere,setfiliere] = useState('');
    const [masse,setmasse] = useState('');
    const [filieredata,setfilieredata] = useState('');
    const [data,setdata] = useState('');
    useEffect(() => {
        fetch('http://localhost:8000/module.php')
        .then(res => res.json())
        .then(data =>setdata(data))
    },[])
    const loadmodule = () => {
        fetch('http://localhost:8000/module.php')
        .then(res => res.json())
        .then(data =>setdata(data))
    }
    const handlAdd = () => {
        fetch('http://localhost:8000/add_module.php',{
            method : 'POST',
            headers : {
                  'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                nom : nom,
                filiere: filiere,
                coeficient : coeficient,
                masse : masse
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log('adedd')
            loadmodule()
        })
    }
     useEffect(() => {
            fetch('http://localhost:8000/filiere.php')
            .then(res => res.json())
            .then(data => {setfilieredata(data)
                console.log(data)
            })
        },[])

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
        <div className='stagaires'>
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
                {data && data.map((d) => {
                    return(
                        <>
                          <tr key={d.id_module}>
                        <td>{d.id_module}</td>
                        <td>{d.nom_module}</td>
                        <td>{d.coeficient}</td>
                        <td>{d.filiere}</td>
                        <td>{d.masse_horaire}</td>
                        <td>
                            <div className='d-flex justify-content-center gap-3'>
                            <button className='btn btn-info' data-bs-toggle="modal" data-bs-target="#EditGroupeModal" onClick={(e) => Editsub(e,d.id_group)}> <i className="bi bi-pencil me-1"></i></button>
                            <button className='btn btn-danger' onClick={() => handledelete(d.id_group)}><i className="bi bi-trash me-1"></i></button>
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
export default Module
