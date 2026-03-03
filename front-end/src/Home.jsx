import React,{useState, useEffect} from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

function Home(){
const [user,setUser] = useState('');
const [stagaires,setStagaires] = useState(null)
const [formateurs,setformateurs] = useState(null)
const [groupes,setGroupes] = useState(null)
const [modules,setModels] = useState(null)
const [data,setdata] = useState([]);
const [datach,setdatacha] = useState();
useEffect(() => {
    fetch('http://localhost:8000/count_groupes.php')
    .then(res => res.json())
    .then(data => {
        setdata(data)
    })
},[])
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
    list.map(l => {
        console.log(l)
    })
},[data])
useEffect(() => {
    const us = JSON.parse(localStorage.getItem('user'))
    setUser(us.nom)
},[])
useEffect(() => {
    fetch('http://localhost:8000/home.php')
    .then(response => response.json())
    .then(data => {
        setStagaires(data.counter)
        setGroupes(data.grouper)
        setformateurs(data.formateur1)
        setModels(data.module1)
    })
    
},[])

return(
    <>
    <h1 className="fw-bold"> 👋 Welcome {user}</h1>
    <div className="row p-5">
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
     <div className="col-lg-6 col-md-12">
         
          </div>
    </div>
  </div>
</div>
    </>
)
}
export default Home