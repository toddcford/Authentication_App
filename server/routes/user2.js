const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User2 = require('../../models/User2');

router.post('/signup',
  [
    check('username', 'Please Enter a Valid Username')
    .not()
    .isEmpty(),
    check("email","Please enter a valid email").isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      username,
      email,
      password
    } = req.body;
    try {
      let user = await User2.findOne({email});
      if (user) {
        return res.status(400).json({msg: "User already exists" });
      }
      console.log("creating new user");
      user = new User2({
        name,
        username,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = { 
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload, "randomString", {
          expiresIn: 10000
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({token});
        }
      );
    res.redirect('/about?name=' + name + "&username=" + username + "&email=" + email + "&from=signup");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post(
  "/login", 
  [ 
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({min: 6})
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {email, password} = req.body;
    try {
      let user = await User2.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Does Not Exist"
        })
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({message: "Incorrect Password!"})
      }
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
      res.redirect('/about?name=' + user.name + "&username=" + user.username + "&email=" + email + '&from=login');
    } catch(e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
    
  }
);


module.exports = router;