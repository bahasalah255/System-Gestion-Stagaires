import React,{useState, useEffect} from 'react';
import { BASE_URL } from './config';
function Cahier1(){
 const [data,setdata] = useState([])
        const [token,settoken] = useState(null);
        const [id,setid] = useState(null);
        const [verified,setverified] = useState(false);
        const [message,setmessage] = useState('');
         const [modules,setmodules] = useState(null);
         const [data1,setdata1] = useState([])
            const [groupes,setgroupes] = useState(null);
            const [module,setmodule] = useState('');
            const [groupe,setgroupe] = useState('');
            const [heure1,setheure1] = useState('');
            const [heure2,setheure2] = useState('');
            const [date,setdate] = useState('');
            const [contenu,setcontenu] = useState('');
            const [frm,setfrm] = useState('');
            const [formateur,setformateur] = useState([]);
        useEffect(() => {
            
            const user = JSON.parse(localStorage.getItem('user'));
            //console.log(user)
            if(!user) return;
            if(user){
                settoken(user.token);
                setid(user.id);
            }
            
        },[])
        useEffect(() => {
            if (!id || !token) return;
          fetch(`${BASE_URL}/cahier_text.php`,{
        method: "POST",
            headers : {
                   'Content-Type' : 'application/json',
                   'Authorization': 'Bearer ' + token
            },
            
        }
    )
     .then(res => res.json())
     .then(test => {setdata(test)
        //console.log(test)
     })
     .catch(error => console.log(error))
    fetch(`${BASE_URL}/module.php`, {
           method : 'POST',
           headers : {
             "Content-Type": "application/json",
             'Authorization': 'Bearer ' + token
           },
         }
       )
        .then(res => res.json())
        .then(test => {setmodules(test)
           //console.log(test)
        })
        .catch(error => console.log(error))
fetch(`${BASE_URL}/list_groupes.php`, {
           method : 'POST',
           headers : {
             "Content-Type": "application/json",
             'Authorization': 'Bearer ' + token
           },
         }
       )
        .then(res => res.json())
        .then(test => {setgroupes(test)
           //console.log(test)
        })
        .catch(error => console.log(error))
    fetch(`${BASE_URL}/users.php`,{
        method : 'POST',
           headers : {
             "Content-Type": "application/json",
             'Authorization': 'Bearer ' + token
           },
         }
       )
        .then(res => res.json())
        .then(test => {setformateur(test)
           //console.log(test)
        })
    },[id, token])
    const handlevalide = (id) => {
        //console.log(id)
        //setverified(true)
        setverified(prev => ({
        ...prev,
        [id]: true
        }));
         fetch(`${BASE_URL}/change_status.php`,{
        method: "POST",
            headers : {
                   'Content-Type' : 'application/json',
                   'Authorization': 'Bearer ' + token
            },
            body : JSON.stringify({
                id : id
            })
        }
    )
     .then(res => res.json())
     .then(test => {setmessage(test.message)
        setTimeout(() => {
        setmessage('')
     }, 3000);
        loadcahier()
        //console.log(test)
     })
    }
    const loadcahier = () => {
        fetch(`${BASE_URL}/cahier_text.php`,{
        method: "POST",
            headers : {
                   'Content-Type' : 'application/json',
                   'Authorization': 'Bearer ' + token
            },
            
        }
    )
     .then(res => res.json())
     .then(test => {setdata(test)
        //console.log(test)
     })
    }
    const handleadd = (e) => {
           e.preventDefault()
        fetch(`${BASE_URL}/add_seance1.php`,{
            method : 'POST',
             headers : {
             "Content-Type": "application/json",
             'Authorization': 'Bearer ' + token
           },
           body : JSON.stringify({
            formateur : frm,
            module : module,
            groupe : groupe,
            date : date,
            heure_debut : heure1,
            heure_fin : heure2,
            contenu : contenu
           })
        })
        .then(res => res.json())
        .then(data => loadcahier())
    
    

    }
    return(
        <>
         <h1 className='text-center fw-bold'>Gestion De Cahier Text</h1>
            <p className='text-center text-muted'>Suivre les seances et l'avencement des Groupes</p>
            <button className='btn btn-add btn-primary'data-bs-toggle="modal" data-bs-target="#formModal"> <i className="bi bi-plus"></i>Add Seance</button>
            {/* MODAL */}
        <div className="modal fade" id="formModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Ajouter Nouvelle Seance</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleadd}>
                    <div className='mb-3'>
                        <label className='form-label'>nom formateur</label>
                        <select name="module" className='form-select'onChange={(e) => setfrm(e.target.value)}>
                            <option value="choose">---------------------</option>
                        {formateur && formateur.map(el => {
                            return(
                                <>
                                <option value={el.id_user}>{el.nom}</option>
                                </>
                            );
                        })}
                        </select>
                  </div>
                     <div className='mb-3'>
                        <label className='form-label'>nom Module</label>
                        <select name="module" className='form-select'onChange={(e) => setmodule(e.target.value)}>
                            <option value="">---------------------</option>
                        {modules && modules.map(el => {
                            return(
                                <>
                                <option value={el.id_module}>{el.nom_module}</option>
                                </>
                            );
                        })}
                        </select>
                  </div>
                   <div className='mb-3'>
                        <label className='form-label'>Groupe</label>
                        <select name="groupe" className='form-select' onChange={(e) => setgroupe(e.target.value)}>
                            <option value="">---------------------</option>
                        {groupes && groupes.map(el => {
                            return(
                                <>
                                <option value={el.id_group}>{el.nom_group}</option>
                                </>
                            );
                        })}
                        </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" name='date'  onChange={(e) => setdate(e.target.value)}/>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Heure Debut</label>
                                                <select name="heure_debut" id="heure_debut" class="form-select" onChange={(e) => setheure1(e.target.value)}>
                                 <option value="08:30:00">08:30</option>
                                <option value="09:00:00">09:00</option>
                                <option value="09:30:00">09:30</option>
                                <option value="10:00:00">10:00</option>
                                <option value="10:30:00">10:30</option>
                                <option value="11:00:00">11:00</option>
                                <option value="11:30:00">11:30</option>
                                <option value="12:00:00">12:00</option>
                                <option value="12:30:00">12:30</option>
                                <option value="13:00:00">13:00</option>
                                <option value="13:30:00">13:30</option>
                                <option value="14:00:00">14:00</option>
                                <option value="14:30:00">14:30</option>
                                <option value="15:00:00">15:00</option>
                                <option value="15:30:00">15:30</option>
                                <option value="16:00:00">16:00</option>
                                <option value="16:30:00">16:30</option>
                                <option value="17:00:00">17:00</option>
                                <option value="17:30:00">17:30</option>
                                <option value="18:00:00">18:00</option>
                                <option value="18:30:00">18:30</option>
                            </select>
                  </div>
                   <div className="mb-3">
                    <label className="form-label">Heure Fin</label>
                         <select name="heure_fin" class="form-select" onChange={(e) => setheure2(e.target.value)}>
                                 <option value="08:30:00">08:30</option>
                                <option value="09:00:00">09:00</option>
                                <option value="09:30:00">09:30</option>
                                <option value="10:00:00">10:00</option>
                                <option value="10:30:00">10:30</option>
                                <option value="11:00:00">11:00</option>
                                <option value="11:30:00">11:30</option>
                                <option value="12:00:00">12:00</option>
                                <option value="12:30:00">12:30</option>
                                <option value="13:00:00">13:00</option>
                                <option value="13:30:00">13:30</option>
                                <option value="14:00:00">14:00</option>
                                <option value="14:30:00">14:30</option>
                                <option value="15:00:00">15:00</option>
                                <option value="15:30:00">15:30</option>
                                <option value="16:00:00">16:00</option>
                                <option value="16:30:00">16:30</option>
                                <option value="17:00:00">17:00</option>
                                <option value="17:30:00">17:30</option>
                                <option value="18:00:00">18:00</option>
                                <option value="18:30:00">18:30</option>
                            </select>
                  </div>
                  <div className='mb-3'>
                        <label className='form-label'>Contenu</label>
                        <textarea name="contenu" onChange={(e) => setcontenu(e.target.value)} className='form-control'></textarea>
                  </div>
                   
                   
                    

                  <button type="submit" className="btn btn-success w-100" data-bs-dismiss="modal"  >
                    Enregistrer
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
        {/* Finish modal */}
            <div className='utili'>
            <div className='stagaires'>
                 {message && (
        <p className='message bg-success fs-5' role="alert">{message}   <i className="bi bi-check-circle-fill me-2"></i></p>
    )} 
            <table className='table'>
    
                 <thead>
                       <tr className='table-secondary'>
                        <th scope='col'>ID Seance</th>
                        <th scope="col">ID Module</th>
                        <th scope="col">Nom Module</th>
                        <th scope="col">Date</th>
                        <th scope="col">Heure Debut</th>
                        <th scope="col">Heure Fin</th>
                        <th scope='col'>Statut</th>
                        <th scope='col'>Formateur</th>
                        <th scope='col'>Modifier</th>
                        
                    </tr>
                </thead>
                <tbody>
                {data && data.map(el => {
                    return(
                        <>
                        <tr key={el.id}>
                            <td>{el.id}</td>
                            <td>{el.id_module}</td>
                            <td>{el.nom_module}</td>
                            <td>{el.date}</td>
                            <td>{el.heure_debut}</td>
                            <td>{el.heure_fin}</td>
                            <td>{el.statut}</td>
                            <td>{el.nom_formateur}</td>
                            <td><button class="btn btn-warning">
                            <i class="bi bi-pencil"></i>
                        </button>
                       {el.statut  == 'Brouillon' &&   !verified[el.id] && <button className='btn btn-valider' onClick={() => {handlevalide(el.id)}}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <rect x="3" y="3" width="26" height="26" rx="4" stroke="#1D9E75" stroke-width="2"/>
  <polyline points="9,17 14,22 23,11" stroke="#1D9E75" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></button>}
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
export default Cahier1