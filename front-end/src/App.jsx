import { useState,useEffect } from 'react'
import Conn from './Conn.jsx'

function App() {
  
 const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost/gestion_ofppt/back-end/index.php")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);
  
  
 return (
<>

 {data ? <p>{data.message}</p> : <p>Chargement...</p>}
<Conn/>
</>
 );
}

export default App
