import React,{useEffect, useState} from 'react';
import { BASE_URL } from '../config';
function Cahier(){
  const [data,setdata] = useState([])
        const [token,settoken] = useState(null);
        const [id,setid] = useState(null);
        const [modules,setmodules] = useState(null);
            const [groupes,setgroupes] = useState(null);
            const [module,setmodule] = useState('');
            const [groupe,setgroupe] = useState('');
            const [heure1,setheure1] = useState('');
            const [heure2,setheure2] = useState('');
            const [date,setdate] = useState('');
            const [contenu,setcontenu] = useState('');
            const [data1,setdata1] = useState([]);
        useEffect(() => {
            
            const user = JSON.parse(localStorage.getItem('user'));
            //console.log(user)
            if(!user) return;
            if(user){
                settoken(user.token);
                setid(user.id);
            }
            
        },[])
          const loadCahier = () => {
            if (!id || !token) return;
            fetch(`${BASE_URL}/cahier_text_id1.php`,{
              method: "POST",
              headers : {
                   'Content-Type' : 'application/json',
                   'Authorization': 'Bearer ' + token
              },
              body : JSON.stringify({
                id: id
              })
            })
            .then(res => res.json())
            .then(test => {
              if (Array.isArray(test)) {
                setdata(test);
              } else {
                setdata([]);
              }
            })
            .catch(error => console.log(error));
          }
        useEffect(() => {
            if (!id || !token) return;
            loadCahier();
     fetch(`${BASE_URL}/cahier_text_id.php`,{
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
             //console.log(data.message)
            console.log(data)
            setdata1(data)
         }
     )
      fetch(`${BASE_URL}/modules_formateur-dis.php`, {
                method : 'POST',
                headers : {
                  "Content-Type": "application/json",
                  'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
              id : id,
            })
              }
            )
             .then(res => res.json())
             .then(test => {setmodules(test)
                //console.log(test)
             })
             .catch(error => console.log(error))
     fetch(`${BASE_URL}/groupes-formateur-dis.php`, {
                method : 'POST',
                headers : {
                  "Content-Type": "application/json",
                  'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
              id : id,
            })
              }
            )
             .then(res => res.json())
             .then(test => {setgroupes(test)
                //console.log(test)
             })
             .catch(error => console.log(error))
    },[id, token])
    const handleadd = (e) => {
            e.preventDefault()
            fetch(`${BASE_URL}/add_seance.php`,{
                method : 'POST',
                 headers : {
                 "Content-Type": "application/json",
                 'Authorization': 'Bearer ' + token
               },
               body : JSON.stringify({
                id : id,
                module : module,
                groupe : groupe,
                date : date,
                heure_debut : heure1,
                heure_fin : heure2,
                contenu : contenu
               })
            })
            .then(res => res.json())
              .then(() => loadCahier())
        
        }
    return(
        <>
        {/* MODAL */}
        <div className="modal fade" id="Addmodal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Ajouter Nouvelle Seance</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleadd}>
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
         <h1 className='text-center fw-bold'>Gestion De Cahier Text</h1>
            <p className='text-center text-muted'>Suivre les seances et l'avencement des Groupes</p>
             <button className='btn btn-add btn-danger' data-bs-toggle="modal" data-bs-target="#Addmodal" ><i className="bi bi-plus"></i>Nouvelle Seance</button>
            <div className='utili'>
            <div className='stagaires'>
            <table className='table'>
    
                 <thead>
                       <tr className='table-secondary'>
                        <th scope="col">ID Module</th>
                        <th scope="col">Nom Module</th>
                        <th scope="col">Date</th>
                        <th scope="col">Heure Debut</th>
                        <th scope="col">Heure Fin</th>
                        <th scope='col'>Statut</th>
                        <th scope='col'>Modifier</th>
                        
                    </tr>
                </thead>
                <tbody>
                {data && data.map(el => {
                    return(
                        <>
                        <tr key={el.id_module}>
                            <td>{el.id_module}</td>
                            <td>{el.nom_module}</td>
                            <td>{el.date}</td>
                            <td>{el.heure_debut}</td>
                            <td>{el.heure_fin}</td>
                            <td>{el.statut}</td>
                            <td><button class="btn btn-warning">
    <i class="bi bi-pencil"></i>
</button></td>

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
export default Cahier