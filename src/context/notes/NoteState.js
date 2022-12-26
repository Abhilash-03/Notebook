import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [
   
  ];

  const [notes, setNotes] = useState(notesInitial);
  
    //get a note
    const getNotes = async() => {
      //API CALL
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers : {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4NGQ4YmQwNDVlYjg2MjJkYjZhZjExIn0sImlhdCI6MTY2OTY1MjA1OX0.u0UeBucOsIu0ru-blpjABb7RveHeWGnTYweUTPrVFBs'
        }
      })
      const json = await response.json();
      console.log(json); 
      setNotes(json)

  
    };
  
    //Add a note
    const addNote = async(title, description, tag) => {
      //API CALL
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers : {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4NGQ4YmQwNDVlYjg2MjJkYjZhZjExIn0sImlhdCI6MTY2OTY1MjA1OX0.u0UeBucOsIu0ru-blpjABb7RveHeWGnTYweUTPrVFBs'
        },
         body: JSON.stringify({title, description, tag})
      })
       const json = response.json();
  
     let note =  {
        _id: "6387ad74bf96df69c2ebdx33",
        user: "6384d8bd045eb8622db6af11",
        title: title,
        description: description,
        tag: tag,
        date: "2022-11-30T19:22:28.733Z",
        __v: 0,
      }
  
      setNotes(notes.concat(note))
  
    };

  //Delete a note
  const deleteNote = (id)=>{
       console.log("Deleting the note is successfull " + id);

      const newNotes = notes.filter((note)=>{return note._id !== id})

       setNotes(newNotes)
  }

  //Edit a note
  const editNote = async(id, title, description, tag)=>{
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4NGQ4YmQwNDVlYjg2MjJkYjZhZjExIn0sImlhdCI6MTY2OTY1MjA1OX0.u0UeBucOsIu0ru-blpjABb7RveHeWGnTYweUTPrVFBs'
      },
      body: JSON.stringify({title, description, tag})
    })
     const json = response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id){
        element.title = title
        element.description = description
        element.tag = tag
      }
      
    }

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
