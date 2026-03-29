import React,{useState,useEffect} from 'react'
import { BASE_URL } from './config';
function Conn(){
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    useEffect(() => {
        fetch(`${BASE_URL}/connexion.php`)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => setError(err));
    },[])
    if(error) return  <p>Erreur : {error.message}</p>;
    return (
        
        <>
        {data ? <p>{data.status} {data.message}</p> : <p>Chargement...</p>}
        </>
    );
}
export default Conn