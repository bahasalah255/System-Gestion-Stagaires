import React,{useEffect, useState} from 'react';
function GroupeForma(){
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
           fetch('http://localhost:8000/groupes_formateurs.php', {
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
     .then(test => {setdata(test)
        //console.log(test)
     })
     .catch(error => console.log(error))
    },[id, token])
    return(
        <>
         <h1 className='text-center fw-bold'>Gestion Des Groupes</h1>
            <p className='text-center text-muted'>Suivre les informations des Groupes</p>
            <div className='utili'>
            <div className='stagaires'>
            <table className='table'>
    
                 <thead>
                        <tr className='table-secondary'>
                            <th scope="col">ID</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Annee</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                {data && data.map(user => {
               return(
                  <tr key={user.id}>
                <td className='text-center fw-bold'>#{user.id_group}</td>
                <td>{user.nom_group}</td>
                <td>{user.annee}</td>
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
export default GroupeForma