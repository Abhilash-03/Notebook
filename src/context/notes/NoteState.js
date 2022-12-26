import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6387ad3cbf96df69c2ebdd30",
      user: "6384d8bd045eb8622db6af11",
      title: "Today note",
      description: "Morning masala babe!",
      tag: "mrng news",
      date: "2022-11-30T19:21:32.236Z",
      __v: 0,
    },
    {
      _id: "6387ad74bf96df69c2ebdd33",
      user: "6384d8bd045eb8622db6af11",
      title: "Morning masala",
      description: "Morning meri jaan ",
      tag: "mrngnews",
      date: "2022-11-30T19:22:28.733Z",
      __v: 0,
    },
    {
      _id: "6387ad1cbf96df69c2ebdd30",
      user: "6384d8bd045eb8622db6af11",
      title: "Today note",
      description: "Morning masala babe!",
      tag: "mrng news",
      date: "2022-11-30T19:21:32.236Z",
      __v: 0,
    },
    {
      _id: "6387ad74df96df69c2ebdd33",
      user: "6384d8bd045eb8622db6af11",
      title: "Morning masala",
      description: "Morning meri jaan ",
      tag: "mrngnews",
      date: "2022-11-30T19:22:28.733Z",
      __v: 0,
    },
    {
      _id: "6387ad3cbf96df60c2ebdd30",
      user: "6384d8bd045eb8622db6af11",
      title: "Today note",
      description: "Morning masala babe!",
      tag: "mrng news",
      date: "2022-11-30T19:21:32.236Z",
      __v: 0,
    },
 
  ];

  const [notes, setNotes] = useState(notesInitial);

  //Add a note
  const addNote = (title, description, tag) => {
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
  //Edit a note

  return (
    <NoteContext.Provider value={{ notes, addNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
