const { StatusCodes } = require("http-status-codes");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

const signUp = async (req, res) => {

  const { fullName, email, password,contactNumber,profilePicture,dateOfBirth } = req.body;
  if (!fullName || !email || !password) {
     return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please Provide Required Information",
     });
  }

  const hash_password = await bcrypt.hash(password, 10);
 
  const userData = {
    fullName,
     email,
     hash_password,
     contactNumber,
     profilePicture,
     dateOfBirth
  };

  const user = await User.findOne({ email });
  if (user) {
     return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already registered",
     });
  } else {
     User.create(userData).then((data, err) => {
     if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
     else
       res
        .status(StatusCodes.CREATED)
        .json({ message: "User created Successfully" });
     });
  }
};

const signIn = async (req, res) => {
  try {
     if (!req.body.email || !req.body.password) {
        res.status(StatusCodes.BAD_REQUEST).json({
           message: "Please enter email and password",
        });
     }
 
     const user = await User.findOne({ email: req.body.email });


     if (user) {
     if (user.authenticate(req.body.password)) {
           const token = jwt.sign(
              { _id: user._id },
              process.env.JWT_SECRET,{ expiresIn: "1h"});
  const { _id, email, fullName } = user;
  res.status(StatusCodes.OK).json({
       token,
       user: { _id, email, fullName },
  });
 } else {
  res.status(StatusCodes.UNAUTHORIZED).json({
     message: "Something went wrong!",
  });
 }
} else {
  res.status(StatusCodes.BAD_REQUEST).json({
      message: "User does not exist..!",
  });
}
} catch (error) {
    console.log(error)
   res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

const getUserProfile = async (req,res,next)=>{
    try{
        const name =  req.query.fullName;
        console.log(name.toString())
        User.find({fullName:name})
            .then((data)=>{return res.status(201).json({message:"success",data:data})})
            .catch(err=> {
                res.status(406)
                return next(err);
            })
        //return res.status(200).json({message:'Authorised User!'});

    }catch (error) {
        console.log(error)
       res.status(StatusCodes.BAD_REQUEST).json({ error });
      }
}

module.exports = { signUp, signIn,getUserProfile};