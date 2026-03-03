import React,{useState, useEffect} from 'react';
function Groupe(){
    const [data,setdata] = useState('');
    const [filiere,setFiliere] = useState(null);
    const [filiers,setFilieres] = useState('');
    const [nom , setnom] = useState('');
    const [annee , setannee] = useState('');
    const [id, setid] = useState(null);
    const Editsub = (e,id) => {
       setid(id)
      e.preventDefault();
      console.log(id)
      fetch('http://localhost:8000/groupe.php', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          id : id
        }),
      })
    
    
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setnom(data.nom_group)
      setFiliere(data.id_filiere)
      setannee(data.annee_formation)
    }
  )
    .catch((err) => {
      console.error("Error deleting:", err);
    });
};
const handleEditform = (e) => {
  e.preventDefault();
  
  fetch('http://localhost:8000/editgroupe.php', {
    method : 'POST',
    headers : {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
  id : id,
  nom : nom,
  filiere: filiere,
  annee : annee
})
  }
)
 .then(res => res.json())
 .then(data => {console.log('updated ',data)
loadgroupes()})
 .catch(error => console.log(error))
}
     const handledelete = (id) => {
      console.log(id);
      fetch('http://localhost:8000/groupe_delete.php',{
          method : 'POST',
          headers : {
             "Content-Type": "application/json"
          },
      
      body: JSON.stringify({
        id : id
      }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
        loadgroupes()
    })
    .catch((err) => {
      console.error("Error deleting:", err);
    });
};
    const handlAdd = () => {
        fetch('http://localhost:8000/add_groupe.php',{
            method : 'POST',
            headers : {
                  'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                nom : nom,
                filiere: filiere,
                annee : annee
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log('adedd')
            loadgroupes()
        })
    }
    useEffect(() => {
        fetch('http://localhost:8000/list_groupes.php')
        .then(res => res.json())
        .then(data => {setdata(data)
            console.log(data)
        })
    },[])
    useEffect(() => {
        fetch('http://localhost:8000/filiere.php')
        .then(res => res.json())
        .then(data => {setFilieres(data)
            console.log(data)
        })
    },[])
    const loadgroupes = () => {
        fetch('http://localhost:8000/list_groupes.php')
        .then(res => res.json())
        .then(data => {setdata(data)
            console.log(data)
        })
    }
    return (
        <>
        <h1 className="text-center fw-bold">Gestion des Groupes</h1>
        <p className="text-muted text-center">Gerez les Groupes Du Centre ISTA</p>
        <button className='btn btn-add btn-primary' data-bs-toggle="modal" data-bs-target="#GroupeModal"> <i class="bi bi-plus me-1"></i>Ajouter Un Groupe</button>
        {/* AJOUTER Groupe MODAL */}
        <div className="modal fade" id="GroupeModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Ajouter Un Groupe</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handlAdd}>
                  <div className="mb-3">
                    <label className="form-label">Filiere</label>
                    <select name="filiere" className='form-select' value={filiere} onChange={(e) => setFiliere(e.target.value)}>
                        <option value="">-- choisir une filiere -- </option>
                        {filiers && filiers.map(f => {
                            return(
                                <>
                                <option value={f.id_filiere}>{f.nom}</option>
                                </>
                            );
                        })}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Nom Groupe</label>
                    <input type="tel" className="form-control" name='nom' placeholder="DD/ID/GE" onChange={(e) => setnom(e.target.value)}/>
                  </div>
                   <div className="mb-3">
                    <label className="form-label">Annee Formation</label>
                    <select className="form-select" name="formation" onChange={(e) => setannee(e.target.value)}>
                         <option value="">-- Choisir une spécialité --</option>
                            <option value="1ere annee">1ere annee</option>
                            <option value="2eme aneee">2eme annee</option>
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
{/* finit MODAL Groupe */}
         <div className='utili'>
        <div className='stagaires'>
        <table className='table'>

             <thead>
                    <tr className='table-secondary'>
                        <th scope="col">ID Groupe</th>
                        <th scope="col">Filiere</th>
                        <th scope="col">Nom Groupe</th>
                        <th scope="col">Annee Formation</th>
                        <th scope="col">Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                {data && data.map((d) => {
                    return(
                        <>
                          <tr key={d.id_group}>
                        <td>{d.id_group}</td>
                        <td>{d.filiere}</td>
                        <td>{d.nom_group}</td>
                        <td>{d.annee_formation}</td>
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
                 {/* EDIT Groupe MODAL */}
        <div className="modal fade" id="EditGroupeModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Ajouter Un Groupe</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleEditform}>
                    <div className='mb-3'>
                        <label className='form-label'>ID Groupe</label>
                        <input type='text' className='form-control' value={id} readOnly/>
                    </div>
                  <div className="mb-3">
                    <label className="form-label">Filiere</label>
                    <select name="filiere" className='form-select' value={filiere} onChange={(e) => setFiliere(e.target.value)}>
                        <option value="">-- choisir une filiere -- </option>
                        {filiers && filiers.map(f => {
                            return(
                                <>
                                <option value={f.id_filiere}>{f.nom}</option>
                                </>
                            );
                        })}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Nom Groupe</label>
                    <input type="tel" className="form-control" name='nom' value={nom} placeholder="DD/ID/GE" onChange={(e) => setnom(e.target.value)}/>
                  </div>
                   <div className="mb-3">
                    <label className="form-label">Annee Formation</label>
                    <select className="form-select" name="formation" value={annee} onChange={(e) => setannee(e.target.value)}>
                         <option value="">-- Choisir une spécialité --</option>
                            <option value="1ere annee">1ere annee</option>
                            <option value="2eme aneee">2eme annee</option>
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
{/* finit MODAL Groupe */}
        </>
    );
}
export default Groupe