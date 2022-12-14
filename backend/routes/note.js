const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator');

//Route 1: Get all the  notes using : GET 'api/notes/fetchallnotes/'. Login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        
        const note = await Note.find({user: req.user.id});
        res.json(note);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 2: Add a new  notes using : POST 'api/notes/addnote/'.  Login required
router.post('/addnote', fetchuser,[
    body('title', 'Enter a title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 chars').isLength({min: 5}),
], async (req, res)=>{
    try {
        
  
    const {title, description, tag} = req.body

    //If there are errors, return Bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Create a new note.
    const note = new Note({
        title, description,tag, user: req.user.id
    })
    
    //save notes in database.
    const savedNote = await note.save();
    res.json(savedNote);

   } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})


//Route 3: Udpdate an existing notes using :PUT 'api/notes/updatenote/'.  Login required
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    const {title, description, tag} = req.body
    
    try {
        
  
    //Create a newNote object
    const newNote = {}
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //Find the note to be updated and update it!
    let note = await Note.findById(req.params.id);
    //if user requesting note id and it will be not matched then send status 404.
    if(!note){return res.status(404).send("Not found!")}   
    
    //If any user trying to access and update other user note then 401(not allowed) status will be shown. 
     if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed!");
     }

     // If user trying to find own existing note for updation.
     note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
     res.json(note);

    } catch (error) {
        console.error(error.message);
    res.status(500).send("Internal Server Error");
    }

});

//Route 4: Delete an existing notes using :DELETE 'api/notes/deletenote/'.  Login required
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
   
    try {
   
    //Find the note to be deleted and delete it!
    let note = await Note.findById(req.params.id);

    //If user is finding a note for deletion but note is not found in existing notes. 
    if(!note){return res.status(404).send("Not found!")}   
    
    //Don't allow deletion if user doesn't own this note. 
     if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed!");
     }

     // Allow deletion if user owns this note
     note = await Note.findByIdAndDelete(req.params.id);

     res.json({"Success": "Note has been deleted", note: note});
     
    } catch (error) {
        console.error(error.message);
    res.status(500).send("Internal Server Error");
    }

});


module.exports = router