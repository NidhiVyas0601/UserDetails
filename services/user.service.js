const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const auth = require('../middlewares/auth');
const { response } = require('express');

async function login( {email,password},callback){
    const user = await User.findOne({email});

    if(user!==null){
        if(bcrypt.compareSync(password,user.password)){
            const token = auth.generateAccessToken(email);
            return callback(null,{...user.toJSON(),token});
        }
        else{
            return callback({message:'Invalid email/password!'})
        }
    }
    else{
        return callback({message:'User not found!'})
    }
};

async function register(body,callback){
    if(body.email=== undefined){
        return callback({message: 'email is required'});
    }

    const user = new User(params);
    user.save().then((response)=>{
        return callback(null,response);
    }).catch((err)=>{
        console.log(err)
        return callback(err);
    })
};

module.exports={login,register}