function Delete({ onConfirm }){
    return(
        <>
        <div className="modal" tabindex="-1" role="dialog" id="deletemodal">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Confirmation Delete</h5>
       <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
      </div>
      <div className="modal-body">
        <p>Vous etez Sure de supprimer ca</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" onClick={onConfirm} data-bs-dismiss="modal">Supprimer</button>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
        </>
    );
}
export default Delete