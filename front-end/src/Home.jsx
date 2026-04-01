import React,{useState, useEffect} from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { BASE_URL } from './config';

function Home(){
const [user,setUser] = useState('');
const [stagaires,setStagaires] = useState(null)
const [formateurs,setformateurs] = useState(null)
const [groupes,setGroupes] = useState(null)
const [modules,setModels] = useState(null)
const [data,setdata] = useState([]);
const [datas,setdatas] = useState([]);
const [datach,setdatacha] = useState();
const [datacount,setdatacount] = useState();
const [filieres,setfiliere] = useState(null);
const [users , setusers] = useState(null);
const [token,settoken] = useState('');
const [stagairesdata,setstagairesdata] = useState([]);
const [affectation,setaffec] = useState([]);
useEffect(() => {
    fetch(`${BASE_URL}/count_groupes.php`)
    .then(res => res.json())
    .then(data => {
        setdata(data)
    })
},[])
 useEffect(() => {
      const userData = localStorage.getItem('user');
      const user1 = JSON.parse(userData);
      settoken(user1.token)
    }, []);
useEffect(() => {
    if(!token) return;
    fetch(`${BASE_URL}/count_stagaires.php`)
    .then(res => res.json())
    .then(data => {
        setdatas(data)
        console.log('stagaires',data)
    })
    fetch(`${BASE_URL}/stagaires_last.php`,{
        method : 'POST',
          headers : {
             "Content-Type": "application/json",
             'Authorization': 'Bearer ' + token
          },
      
    }
)
.then(res => res.json())
.then(data => {
    setstagairesdata(data)
})
 fetch(`${BASE_URL}/afectation_home.php`,{
        method : 'POST',
          headers : {
             "Content-Type": "application/json",
             'Authorization': 'Bearer ' + token
          },
      
    }
)
.then(res => res.json())
.then(data => {
    setaffec(data)
})
},[token])
useEffect(() => {
    const list = 
        Object.entries(data).map(([key,value]) => ({
            Groupe : key,  
            stagairescount : value
        }))
    const chardata = list.map(item => ({
        groupe : item.Groupe,
        stagaires : item.stagairescount
    }))
    setdatacha(chardata)
    
},[data])
useEffect(() => {
    const list = 
        Object.entries(datas).map(([key,value]) => ({
            Filiere : key,  
            stagairescount : value
        }))
    const charcount = list.map(item => ({
        filiere : item.Filiere,
        stagaires : item.stagairescount
    }))
    setdatacount(charcount)
},[datas])
useEffect(() => {
    const us = JSON.parse(localStorage.getItem('user'))
    setUser(us.nom)
},[])
useEffect(() => {
    fetch(`${BASE_URL}/home.php`)
    .then(response => response.json())
    .then(data => {
        setStagaires(data.counter)
        setGroupes(data.grouper)
        setformateurs(data.formateur1)
        setModels(data.module1)
        setfiliere(data.counter2)
        setusers(data.counter3)
    })
    
},[])

return(
    <>
    <h1 className="fw-bold"> 👋 Welcome {user} !</h1>
    <p className='text-muted mx-5 fs-5'>Voici un apercu de votre tableau de bord</p>
    <div className="row p-5 g-3">
        <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card">
                <div className="card-body">
                   <i className="bi bi-person-lines-fill text-primary fs-1"></i>
                   <h4>Nos Stagaires</h4>
                   <p className="text-center fs-2">{stagaires}</p>
                </div>
            </div>
        </div>
    <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card">
                <div className="card-body">
                    <i className="bi bi-person-workspace text-secondary fs-1"></i>
                    <h4>Nos Formateurs</h4>
                     <p className="text-center fs-2">{formateurs}</p>
                </div>
            </div>
        </div>
    <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card">
                <div className="card-body">
                    <i class="bi bi-diagram-3-fill text-info fs-1"></i>
                    <h4>Nos Groupes</h4>
                     <p className="text-center fs-2">{groupes}</p>
                </div>
            </div>
        </div>
    <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card">
                <div className="card-body">
                    <i class="bi bi-journal-bookmark-fill text-warning fs-1"></i>
                    <h4>Nos Modules</h4>
                     <p className="text-center fs-2">{modules}</p>
                </div>
            </div>
        </div>
     <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card">
                <div className="card-body">
                    <i className="bi bi-mortarboard text-success fs-1"></i>
                    <h4>Nos Filiers</h4>
                     <p className="text-center fs-2">{filieres}</p>
                </div>
            </div>
        </div>
     <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card">
                <div className="card-body">
                    <i class="bi bi-people-fill text-info fs-1"></i>
                    <h4>Users</h4>
                     <p className="text-center fs-2">{users}</p>
                </div>
            </div>
        </div>
    </div>
  
    <div className="container p-4">


  {/* Charts row */}
  <div className="row">
    <div className="col-lg-6 col-md-12">
        <h5 className="text-center mb-3">Stagiaires par Groupe</h5>
            { (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={datach} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="groupe" 
                  tick={{ fill: "#333", fontSize: 14 }}/>
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="stagaires" fill="#0088FE" name="Stagaires" label={{position : "top"}} animationDuration={1500} />
                  
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
    <div className="col-lg-6 col-md-12">
    <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 8px #0001" }}>
          <h5 style={{ marginBottom: 12 }}>🕸️ Stagaires par Filiere (Radar)</h5>
          {(
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={datacount}>
                <PolarGrid />
                <PolarAngleAxis dataKey="filiere" />
                <PolarRadiusAxis angle={30} domain={[0, 30]} />
                <Radar
                  name="Stagaires"
                  dataKey="stagaires"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.5}
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>
    </div>
  </div>
</div>
<div className='row'>
    <div className='col-lg-6'>
        <div className='seances'>
    <h5 className='text-center m-5'>Dernier Stagaires</h5>
     <div className='utili'>
        <div className='stagaires'>
        <table className='table'>

             <thead>
                    <tr className='table-secondary'>
                        <th scope="col">ID Stagaire</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Telephone</th>
                        <th scope="col">Date de naissance</th>
                        <th scope="col">Groupe</th>
                        <th scope='col'>Filiere</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {stagairesdata && stagairesdata.map((item) => {
                        return(
                            <>
                            <tr>
                                <td>{item.id_stagaire}</td>
                                <td>{item.nom_stagaire}</td>
                                <td>{item.telephone}</td>
                                <td>{item.date_naissance}</td>
                                <td>{item.nom_group}</td>
                                <td>{item.nom}</td>
                            </tr>
                            
                            </>
                        );
                    })}
                </tbody>
                </table>
                </div>
                </div>
</div>
    </div>
     <div className='col-lg-6'>
        <div className='seances'>
    <h5 className='text-center m-5'>Dernier Affectation</h5>
     <div className='utili'>
        <div className='stagaires'>
        <table className='table'>

             <thead>
                    <tr className='table-secondary'>
                        <th scope="col">ID Affectation</th>
                        <th scope="col">Formateur Assigner</th>
                        <th scope="col">Groupe</th>
                        <th scope="col">Module</th>
                        <th scope="col">Annee</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {affectation && affectation.map((item) => {
                        return(<>
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.formateur}</td>
                            <td>{item.groupe}</td>
                            <td>{item.module}</td>
                            <td>{item.annee}</td>

                        </tr>
                        </>)
                    })}
                </tbody>
                </table>
                </div>
                </div>
    </div>
    </div>
</div>
    </>
)
}
export default Home