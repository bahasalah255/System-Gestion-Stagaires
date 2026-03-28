import React,{useState, useEffect} from 'react';
function Cahier1(){
 const [data,setdata] = useState([])
        const [token,settoken] = useState(null);
        const [id,setid] = useState(null);
        const [verified,setverified] = useState(false);
        const [message,setmessage] = useState('');
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
          fetch('http://localhost:8000/cahier_text.php',{
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
    },[id, token])
    const handlevalide = (id) => {
        //console.log(id)
        //setverified(true)
        setverified(prev => ({
        ...prev,
        [id]: true
        }));
         fetch('http://localhost:8000/change_status.php',{
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
        fetch('http://localhost:8000/cahier_text.php',{
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
    return(
        <>
         <h1 className='text-center fw-bold'>Gestion De Cahier Text</h1>
            <p className='text-center text-muted'>Suivre les seances et l'avencement des Groupes</p>
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