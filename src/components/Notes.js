import React, { useContext, useEffect } from "react";
 import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

function Notes() {
    const context = useContext(noteContext);
    const {notes, getNotes} = context;
    
    useEffect(()=>{
      getNotes();

    }, [])
  return (
    <>
    <AddNote/> 
    <div className="container row">
    <h2>Your Notes</h2>
    {notes.map((note)=>{
      return <Noteitem note = {note} key={note._id}/>
    })}
  </div>
  </>
  )
}

export default Notes
