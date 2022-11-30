import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'
function About() {
  const a = useContext(noteContext);
  useEffect(()=>{
    a.update();
    // eslint-disable-next-line
  }, [])

  return (

    <div>
      This is about {a.state.name} bro and he's study in class {a.state.class}.
    </div>
  )
}

export default About
