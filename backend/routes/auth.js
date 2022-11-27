const express = require('express');
const Users = require('../models/Users');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const JWT_SECRET = '@bhilash$1221$@'

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
    
    try{ 
      
      //Check whether the user with this email exists already or not
    let user = await Users.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({error: "Sorry a user with this email already exists."})
    }
    
    //Using hash function and salt for secure the password.
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);

    //Create a user and it will save the data in mongodb users database.
  user =  await Users.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
      })
      
    const data = {
      user:{
        id: user.id  
      }
     } 

   const authToken = jwt.sign(data, JWT_SECRET);
    // res.json(user);
    res.json({authToken});
   }
   catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured!");
   }
})

module.exports = router;