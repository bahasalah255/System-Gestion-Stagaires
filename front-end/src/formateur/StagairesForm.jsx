import React,{useState,useEffect} from 'react';
function StagairesForm(){
    const [data,setdata] = useState([])
    const [token,settoken] = useState(null);
    const [id,setid] = useState(null);
    const [search , setsearch] = useState('');
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
       fetch('http://localhost:8000/stagaires_formateur.php', {
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
 const filtre = data.filter(d => {
        const matchename = d.nom.toLowerCase().includes(search.toLowerCase())
         
        return matchename
        
    })
return(
    <>
     <h1 className='text-center fw-bold'>Gestion Des Stagaires</h1>
        <p className='text-center text-muted'>Gerez et Suivre les informations des Stagaires</p>
        <div className='utili'>
        <div className='stagaires'>
              <input type='text' className='form-control mb-2' placeholder='Search Bar' onChange={(e) => setsearch(e.target.value)}/>
        <table className='table'>

             <thead>
                    <tr className='table-secondary'>
                        <th scope="col">ID Stagaire</th>
                        <th scope="col">Nom</th>
                        <th scope="col">FIliere</th>
                        
                    </tr>
                </thead>
                <tbody>
            {filtre && filtre.map(user => {
           return(
              <tr key={user.id_stagaire}>
            <td className='text-center fw-bold'>#{user.id_stagaire}</td>
            <td>{user.nom}</td>
            <td>{user.filiere}</td>
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
export default StagairesForm