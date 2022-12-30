import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function AddNote(props) {
    const context = useContext(noteContext);
    const {addNote} = context;
   
    const [note, setNote] = useState({title: "", description: "", tag: ""});

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({title: "", description: "", tag: ""})
        props.showAlert("New note is added", "success");
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
            placeholder="Write something..."
            onChange={onChange}
            minLength={3} required
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
         <input type="text" name='description' value={note.description} className='form-control' id='description' onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
          Tag
          </label>
         <input type="text" name='tag' className='form-control' value={note.tag} id='tag' onChange={onChange} required />
        </div>
        <button disabled = {note.title.length < 5 || note.description.length < 5} type='submit' className='btn btn-primary' onClick={handleClick} >Add note</button>
        </form>
      </div>
    
  )
}

export default AddNote
