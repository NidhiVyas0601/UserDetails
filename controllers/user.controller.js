const bcryptjs = require('bcryptjs');
const userService = require('../services//user.service');

exports.register = (req,res,next)=>{
    const {password} = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password,salt);

    userService.register(req.body,(err,result)=>{
        if(err){
            return next(err);
        }
        return res.status(200).send({
            message: 'success',
            data: result,
        });
    });
};

exports.login = (req,res,next)=>{
    const { username,password} = req.body;
    userService.login({username,password},(err,result)=>{
        if(err){
            return next(err);
        }
        return res.status(200).send({
            message: 'success',
            data: result,
        });
    });
};

exports.userProfile = (req,res,next)=>{
    return res.status(200).json({message:'Authorised User!'});
    const filters = req.query;
    const filteredUsers = User.filter(user => {
      let isValid = true;
      for (key in filters) {
        console.log(key, user[key], filters[key]);
        isValid = isValid && user[key] == filters[key];
      }
      return isValid;
    });
    res.send(filteredUsers);
};

