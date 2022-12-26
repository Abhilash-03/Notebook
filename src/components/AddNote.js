import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function AddNote() {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: "default"});

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
    }
  return (
    
       <div className="container my-3">
        <h2>Make a Notes</h2>
        <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name='title'
            placeholder="Write somthing..."
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
         <input type="text" name='description' className='form-control' id='description' onChange={onChange} />
        </div>
        <button type='submit' className='btn btn-primary' onClick={handleClick}>Add note</button>
        </form>
      </div>
    
  )
}

export default AddNote
