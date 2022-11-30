import NoteContext from './noteContext';
import { useState } from 'react';
const NoteState = (props)=>{
    const s1 = {
        "name": "Abhi",
        "class": "3-A"
    }

    const[state, setState] = useState(s1);  
    const update = ()=>{
        setTimeout(() => {
            setState({
                "name": "Lash",
                "class": "12-A"
            })
        }, 2000);
    } 

    return (
        <NoteContext.Provider value={{state, update}} >
            {props.children}
        </NoteContext.Provider>
    )
    
}


export default NoteState;
