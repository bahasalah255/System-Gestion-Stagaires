import React,{useState,useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Utili(){
    const [nom,setNom] = useState()
    const [group,setGroup] = useState([])
    const [stnom,setstNom] = useState()
    const [telephone,settelephone] = useState()
    const [date,setdate] = useState()
    const [groupid,setgroupid] = useState()
    const [nomgroupe,setnomgroup] = useState()
    const navigate = useNavigate()
    
     const handleSubmit = (e) => {
     e.preventDefault();
     fetch('http://localhost:8000/add_stagaire.php',{
        method: 'POST',
        headers : {
             "Content-Type": "application/json"
        },
        body: JSON.stringify({
  nom: stnom,
  telephone: telephone,
  date_naissance: date,
  groupe_id: groupid
})
    })
    .then(res => res.json())
    .then(data => {console.log(data)
      navigate('dashboard')
    })
}
    
   useEffect(() => {
     fetch('http://localhost:8000/list-stagaire.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        fetch('http://localhost:8000/list-stagaire.php')
        .then(res => res.json())
        .then(data => setNom(data));
    })
    .catch(error => console.error('Error:', error));
    
   },[])
   useEffect(() => {
     fetch('http://localhost:8000/list_groupes.php')
     
    .then(response => 
        response.json())
    .then(datag => {
        console.log(datag)
        setGroup(datag)
        setnomgroup(datag.nom_group)
    })
    .catch(error => console.error('Error:', error));
   },[])
 
    return(
        <>
        <h1>Stagaires</h1>
        <button className='btn btn-add btn-primary'data-bs-toggle="modal" data-bs-target="#formModal">Add Stagaire</button>
         {/* MODAL */}
        <div className="modal fade" id="formModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Add Stagaire</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input type="text" className="form-control" name='nom' value={stnom} onChange={(e) => setstNom(e.target.value)}/>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Telephone</label>
                    <input type="tel" className="form-control" name='telephone' onChange={(e) => settelephone(e.target.value)} />
                  </div>
                   <div className="mb-3">
                    <label className="form-label">Date Naissance</label>
                    <input type="date" className="form-control" name='date' value={date} onChange={(e) => setdate(e.target.value)}/>
                  </div>
                   <div className="mb-3">
                    <label className="form-label">Group ID</label>
                    <select name='groupid' className='form-select' onChange={(e) => setgroupid(e.target.value)}>
                        {group.map(g => (
    <option key={g.id_group} value={g.id_group}>
      {g.id_group}
    </option>
  ))}
                    </select>
                    
                  </div>

                  <button type="submit" className="btn btn-success w-100" >
                    Enregistrer
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
        <div className='utili'>
        <div className='stagaires'>
        <table className='table'>

             <thead>
                    <tr>
                        <th scope="col">ID Stagaire</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Telephone</th>
                        <th scope="col">Date de naissance</th>
                        <th scope="col">Group ID</th>
                        
                    </tr>
                </thead>
                <tbody>
            {nom && nom.map(user => {
           return(
              <tr key={user.id_stagaire}>
            <td className='text-center fw-bold'>#{user.id_stagaire}</td>
            <td>{user.nom}</td>
            <td>{user.telephone}</td>
            <td>{user.date_naissance}</td>
            <td>{user.groupe_id}</td>
            <td>{nomgroupe}</td>
           </tr>

           );
        })}
        </tbody>
        </table>
        </div>
        </div>
        </>
    );
}
export default Utili