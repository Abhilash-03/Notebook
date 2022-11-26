const express = require('express');
const Users = require('../models/Users');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Create a user using: POST '/api/auth/createuser'. No Login required
router.post('/createuser',
[body('name', 'Enter a valid name').isLength({ min: 3 }),
body('email', 'Enter a valid email').isEmail(),
body('password', 'Password must be contained atleast 5 characters.').isLength({ min: 5 })],
async(req, res)=>{

    //If there are errors, return Bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    //Check whether the user with this email exists already or not
   try{ 
    
    let user = await Users.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({error: "Sorry a user with this email already exists."})
    }

    //Create a user and it will save the data in mongodb users database.
  user =  await Users.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      })
      
    res.json(user);
   }
   catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured!");
   }
})

module.exports = router;