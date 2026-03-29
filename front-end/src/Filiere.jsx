import React,{useState,useEffect} from 'react'
import { BASE_URL } from './config';
function Filiere(){
    const [data,setData] = useState('');
    const [nom , setnom] = useState('');
    const [annee , setannee] = useState('');
     const [message,setmessage] = useState('');
    const [id, setid] = useState('');
    const [token,settoken] = useState('');
           useEffect(() => {
          const userData = localStorage.getItem('user');
          const user1 = JSON.parse(userData);
          settoken(user1.token)
        }, []);
    useEffect(() => {
      if (!token) return 
        fetch(`${BASE_URL}/filiere.php`,{
          headers : {
            'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + token
          }
        }
      )
        .then(res => res.json())
        .then(data => setData(data))
    },[token])
    const handleEditform = (e) => {
  e.preventDefault();
  
  fetch(`${BASE_URL}/editfiliere.php`, {
    method : 'POST',
    headers : {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
  id : id,
  nom : nom,
  annee : annee
})
  }
)
 .then(res => res.json())
 .then(data => {console.log('updated ',data)
loadfiliers()})
 .catch(error => console.log(error))
}
        const Editsub = (e,id) => {
       setid(id)
      e.preventDefault();
      console.log(id)
      fetch(`${BASE_URL}/filiere_id.php`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          id : id
        }),
      })
    
    
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setnom(data.nom)
      setannee(data.annee_formation)
    }
  )
    .catch((err) => {
      console.error("Error deleting:", err);
    });
};
     const handledelete = (id) => {
      console.log(id);
      fetch(`${BASE_URL}/filiere_delete.php`,{
          method : 'POST',
          headers : {
             "Content-Type": "application/json",
             'Authorization': 'Bearer ' + token
          },
      
      body: JSON.stringify({
        id : id
      }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
        loadfiliers()
    })
    .catch((err) => {
      console.error("Error deleting:", err);
    });
};
 const loadfiliers = () => {
        fetch(`${BASE_URL}/filiere.php`,{
          headers : {
            'Content-Type' : 'application/json',
                  'Authorization': 'Bearer ' + token
          }
        }
      )
        .then(res => res.json())
        .then(data => {setData(data)
            console.log(data)
        })
    }
const handlAdd = (e) => {
  e.preventDefault()
        fetch(`${BASE_URL}/add_filiere.php`,{
            method : 'POST',
            headers : {
                  'Content-Type' : 'application/json',
                  'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                nom : nom,
                annee : annee
            })
        })
        .then(res => res.json())
        .then(data => {
            setmessage(data.message)
            setTimeout(() => {
              setmessage('')
            }, 3000);
            loadfiliers()
        })
    }
    return(
        <>
         <h1 className="text-center fw-bold">Gestion des Filiers</h1>
         <p  className="text-muted text-center">Gerez les Filiers Du Centre ISTA</p>
          <button className='btn btn-add btn-danger' data-bs-toggle="modal" data-bs-target="#FiliereModel"> <i class="bi bi-plus me-1"></i>Ajouter Une Filiere</button>
           {/* AJOUTER Groupe MODAL */}
        <div className="modal fade" id="FiliereModel" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Ajouter Une Filiere</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handlAdd}>

                  <div className="mb-3">
                    <label className="form-label">Nom Filiere</label>
                    <input type="tel" className="form-control" name='nom' onChange={(e) => setnom(e.target.value)}/>
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
            {message && (
        <p className='message bg-success fs-5' role="alert">{message}   <i className="bi bi-check-circle-fill me-2"></i></p>
    )} 
        <div className='stagaires'>
        <table className='table'>

             <thead>
                    <tr className='table-secondary'>
                        <th scope="col">ID Filiere</th>
                        <th scope="col">Nom Filiere</th>
                        <th scope="col">Annee Filiere</th>
                        <th scope="col">Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                {data && data.map((d) => {
                    return(
                        <>
                          <tr key={d.id_filiere}>
                        <td>{d.id_filiere}</td>
                        <td>{d.nom}</td>
                        <td>{d.annee_formation}</td>
                       
                        <td>
                            <div className='d-flex justify-content-center gap-3'>
                            <button className='btn btn-info' data-bs-toggle="modal" data-bs-target="#EditFiliereModel" onClick={(e) => Editsub(e,d.id_filiere)}> <i className="bi bi-pencil me-1"></i></button>
                            <button className='btn btn-danger' onClick={() => { 
                                const x = window.prompt('vous voulez supprimer (oui,Yes) ? ')
                                if(x == 'oui' || x == 'Yes'){
                                    handledelete(d.id_filiere)
                                }
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
                 {/* EDit Groupe MODAL */}
        <div className="modal fade" id="EditFiliereModel" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Ajouter Une Filiere</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleEditform}>

                  <div className="mb-3">
                    <label className="form-label">Nom Filiere</label>
                    <input type="tel" className="form-control" name='nom' value={nom} onChange={(e) => setnom(e.target.value)}/>
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
export default Filiere