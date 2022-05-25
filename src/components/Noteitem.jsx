import React,{ useContext } from "react";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote}  = context;
  const { note , updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <MdDelete className=" i iconDel mx-2" onClick={() => {deleteNote(note._id); props.showAlert("Deleted Successfully!!" , "success")}}/>
            <BiEdit className="i iconEdit " onClick={()=>{updateNote(note)}} />
          </div>
          <p className="card-text my-2">{note.description}</p>
          <p className="card-text">{note.tag}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
