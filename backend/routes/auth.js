const express = require('express');
const Users = require('../models/Users');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Create a user using: POST '/api/auth/createuser'. No Login required
router.post('/createuser',
[body('name', 'Enter a valid name').isLength({ min: 3 }),
body('email', 'Enter a valid email').isEmail(),
body('password', 'Password must be contained atleast 5 characters.').isLength({ min: 5 })],
(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    //it will save the data in mongodb users database.
    Users.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      }).then(user => res.json(user))
      .catch(err => console.log(err));   
})

module.exports = router;