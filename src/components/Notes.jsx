import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate  = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
        navigate("/login")
    }
    //eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const ref = useRef(null);
  const refClose = useRef(null);

  // modal style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated Successfully!!" , "success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} />

      {/* Modal */}

      <div>
        <Button className="d-none" onClick={handleOpen} ref={ref}>
          Open modal
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form>
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">
                  <h5>Title</h5>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="etitle"
                  placeholder="Add Title"
                  aria-describedby="emailHelp"
                  value={note.etitle}
                  minLength={3}
                  required
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  <h5>Description</h5>
                </label>
                <input
                  type="text"
                  placeholder="Add Description"
                  className="form-control"
                  name="edescription"
                  value={note.edescription}
                  minLength={3}
                  required
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">
                  <h5>Tag</h5>
                </label>
                <input
                  type="text"
                  placeholder="Add Tag"
                  className="form-control"
                  name="etag"
                  value={note.etag}
                  minLength={3}
                  required
                  onChange={onChange}
                />
              </div>
              <button
                type="submit"
                disabled={
                  note.etitle.length < 3 ||
                  note.edescription.length < 3 ||
                  note.etag.length < 3
                }
                className="btn btn-primary mx-4 my-2 "
                style={{ float: "right", backgroundColor: "#000000" }}
                onClick={handleClick}
              >
                UpdateNote
              </button>
              <button
                ref={refClose}
                type="submit"
                // disabled={
                //   note.etitle.length < 3 ||
                //   note.edescription.length < 3 ||
                //   note.etag.length < 3
                // }
                className="btn btn-primary my-2 "
                style={{ float: "right", backgroundColor: "#FF0000" }}
                onClick={handleClick}
              >
                Close
              </button>
            </form>
          </Box>
        </Modal>
      </div>
      <div className="row my-3">
        <h2>Your notes.</h2>
        {notes.length === 0 && (
          <div className="container">
            "SORRY! Notes are not available for display ."
          </div>
        )}

        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
