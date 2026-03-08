import React,{useState , useEffect} from 'react'

function Affectation(){
    const [dataform,setdataform] = useState([]);
    const [datagroup,setdatagroup] = useState([]);
    const [datamodule,setdatamodule] = useState([]);
    const [formateur,setformateur] = useState('');
    const [groupe,setgroupe] = useState('');
    const [module,setmodule] = useState('');
    useEffect(() => {
        fetch('http://localhost:8000/formateur.php')
        .then(res => res.json())
        .then(data => setdataform(data))
        fetch('http://localhost:8000/list_groupes.php')
        .then(res => res.json())
        .then(data => setdatagroup(data))
        fetch('http://localhost:8000/module.php')
        .then(res => res.json())
        .then(data => setdatamodule(data))
    },[])
    const handleadd = () => {
        fetch('http://localhost:8000/addAffec.php',{
            method : 'POST',
            headers : {
                 "Content-Type": "application/json"
            },
            body : JSON.stringify({
                formateur : formateur,
                groupe : groupe,
                module : module
            })
        }
    )
    .then(res => res.json())
    .then(data => console.log(data))
    }
    return(

        <>
        <h1 className="text-center fw-bold">Gestion des Affectations</h1>
         <p  className="text-muted text-center">Gerez les Affectation Des Groupes Et des Modules Du Centre ISTA</p>
         <button className='btn btn-add btn-primary' data-bs-toggle="modal" data-bs-target="#AffectationModel"> <i className="bi bi-plus me-1"></i>Ajouter Une Affectation</button>
          {/* AJOUTER Affectation MODAL */}
        <div className="modal fade" id="AffectationModel" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Ajouter Une Affectation</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleadd}>

                  <div className="mb-3">
                    <label className="form-label">Formateur</label>
                    <select name="formateur" className='form-select' onChange={(e) => setformateur(e.target.value)}>
                        <option value="">-- chosi un formateur ---</option>
                        {dataform && dataform.map(d => {
                            return(
                                <>
                                <option value={d.id_formateur}>{d.nom_formateur}</option>
                                </>
                            );
                        })}
                    </select>
                  </div>
                   <div className="mb-3">
                    <label className="form-label">Groupe</label>
                    <select name="coef" id="coef" className='form-select' onChange={(e) => setgroupe(e.target.value)}>
                        <option value="">--- Choisi un Groupe -- </option>
                            {datagroup && datagroup.map(d => {
                                return(
                                    <>
                                    <option value={d.id_group}>{d.nom_group} || {d.annee_formation} || {d.filiere} </option>
                                    </>
                                );
                            })}
                        </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Module</label>
                    <select name="filiere" className='form-select' onChange={(e) => setmodule(e.target.value)}>
                        <option value="">--- Choisi un Module -- </option>
                        {datamodule && datamodule.map(d => {
                            return(
                                <>
                                <option value={d.id_module}>{d.nom_module} || {d.coeficient} || {d.masse_horaire} || {d.filiere} </option>
                                </>
                            );
                        })}
                        </select>
                  </div>
                  
                  <button type="submit" className="btn btn-primary w-100" data-bs-dismiss="modal"  >
                    Enregistrer
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
{/* finit MODAL module */}
        </>
    );
}
export default Affectation