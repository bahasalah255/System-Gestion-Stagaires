import React,{useState,useEffect} from 'react'

function Utili(){
    const [nom,setNom] = useState()
    const [stnom,setstNom] = useState()
    const [telephone,settelephone] = useState()
    const [date,setdate] = useState()
    const [groupid,setgroupid] = useState()
     const handleSubmit = (e) => {
    e.preventDefault();

   useEffect(() => {
     fetch('http://localhost/gestion_ofppt/back-end/list-stagaire.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setNom(data)
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
                <form onSubmit={handlesubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input type="text" className="form-control" name='nom' value={nom} onChange={(e) => setstNom(e.target.value)}/>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Telephone</label>
                    <input type="tel" className="form-control" name='telephone'/>
                  </div>
                   <div className="mb-3">
                    <label className="form-label">Date Naissance</label>
                    <input type="date" className="form-control" name='date'/>
                  </div>
                   <div className="mb-3">
                    <label className="form-label">Group ID</label>
                    <input type="text" className="form-control" name='groupid'/>
                  </div>

                  <button type="submit" className="btn btn-success w-100">
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
            {nom && nom.map(user => {
           return(
              <tr>
            <td className='text-center fw-bold'>#{user.id_user}</td>
            <td>{user.nom}</td>
           </tr>

           );
        })}
        </table>
        </div>
        </div>
        </>
    );
}
export default Utili