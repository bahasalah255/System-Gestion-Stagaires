import React,{useEffect, useState} from 'react';
import { BASE_URL } from '../config';
function Cahier(){
  const [data,setdata] = useState([])
        const [token,settoken] = useState(null);
        const [id,setid] = useState(null)
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
          fetch(`${BASE_URL}/cahier_text_id1.php`,{
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
     .then(test => {setdata(test)
        //console.log(test)
     })
     .catch(error => console.log(error))
    },[id, token])
    return(
        <>
         <h1 className='text-center fw-bold'>Gestion De Cahier Text</h1>
            <p className='text-center text-muted'>Suivre les seances et l'avencement des Groupes</p>
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