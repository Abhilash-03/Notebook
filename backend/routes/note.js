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
module.exports = router