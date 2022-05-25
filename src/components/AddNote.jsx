import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    ;props.showAlert("Addesd Successfully!!" , "success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Add Notes.</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <h5>Title</h5>
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Add Title"
            aria-describedby="emailHelp"
            minLength={3}
            required
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            <h5>Description</h5>
          </label>
          <input
            type="text"
            placeholder="Add Description"
            className="form-control"
            name="description"
            minLength={3}
            required
            value={note.description}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            <h5>Tag</h5>
          </label>
          <input
            type="text"
            placeholder="Add Tag"
            className="form-control"
            name="tag"
            minLength={3}
            required
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button
          disabled={
            note.title.length < 3 ||
            note.description.length < 3 ||
            note.tag.length < 3
          }
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
