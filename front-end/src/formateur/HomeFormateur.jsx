import React,{useState, useEffect} from 'react';
function HomeFormateur(){
    const [user, setUser] = useState('');
    const [id,setid] = useState(null);
    const [data,setdata] = useState(null)
    useEffect(() => {
        const us = JSON.parse(localStorage.getItem('user'))
         if (!us) return; 
        setUser(us.nom)
        setid(us.id)
    },[])
    useEffect(() => {
        if (!id) return ;
        fetch('http://localhost:8000/home.php',{
            method: "POST",
            headers : {
                   'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                id: id
            })
        }
    )
    .then(res => res.json())
    .then(data => {
        //console.log(data.message)
       //console.log(data)
       setdata(data)
    })
    },[id])
    
    return(
        <>
        <h1 className="fw-bold"> 👋 Welcome {user} !</h1>
    <p className='text-muted mx-5 fs-5'>Voici un apercu de votre tableau de bord</p>
    <div className="row p-5 g-3">
        <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card">
                <div className="card-body">
                   <i className="bi bi-mortarboard text-primary fs-1"></i>
                   <h4>Vos stagiaires</h4>
                   <p className="text-center fs-2">{data && data.Stagairecount}</p>
                </div>
            </div>
        </div>
    <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card">
                <div className="card-body">
                    <i className="bi bi-person-workspace text-secondary fs-1"></i>
                    <h4>Vos Filieres</h4>
                     <p className="text-center fs-2">0</p>
                </div>
            </div>
        </div>
    <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card">
                <div className="card-body">
                    <i className="bi bi-diagram-3-fill text-info fs-1"></i>
                    <h4>Vos Groupes</h4>
                     <p className="text-center fs-2">{data && data.countergroupes}</p>
                </div>
            </div>
        </div>
    <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card">
                <div className="card-body">
                    <i className="bi bi-journal-bookmark-fill text-warning fs-1"></i>
                    <h4>Vos Modules</h4>
                     <p className="text-center fs-2">{data && data.module}</p>
                </div>
            </div>
        </div>
    
    </div>
        </>
    )
}
export default HomeFormateur