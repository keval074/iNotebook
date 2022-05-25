const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Iamamern$tackDeveloper";
var fetchuser = require ('../middleware/fetchuser')

//ROUTE 1 : Create a user using :POST "/auth/api/createuser"  no login required

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false ;
    //if theree are error provide bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success , errors: errors.array() });
    }

    //check whether the user/email exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success ,
          err: "Sorry the entered email already exist with existing user!",
        });
      }

      //securing the password by giving hash value with additional salt value
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      //here we are using "JwtToken" for authentication returning back the unique value to authentitcate at any time it logins!
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success , authtoken });

      // res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error!!");
    }
  }
);

//ROUTE 2 : Authenticate a user using :POST "/auth/api/login"  no login required


router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  //if theree are error provide bad request
  async (req, res) => {
    let success = false ;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res
          .status(400)
          .json({ success, errors: "Please try to login with correcct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        success =false 
        return res
          .status(400)
          .json({ success ,errors: "Please try to login with correcct credentials" });
      }
      //here we are using "JwtToken" for authentication returning back the unique value to authentitcate at any time it logins!
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
       success = true;
      res.json({ success , authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error!!");
    }
  }
);

//ROUTE 3 :Get logged-in user details of a user using :POST "/auth/api/getuser"  login required
router.post(
  "/getuser",fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error!!");
  }
})
module.exports = router;
