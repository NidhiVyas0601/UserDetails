const mongoose = require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    phonenumber:{
        type: Number,
    },
    profileImage:{
        type: String
    },
    dateOfBirth:{
        type: Date
    }
});

userSchema.set('toJSON',{
    transform:(document,returnObj)=>{
        returnObj.id = returnObj._id.toString();
        delete returnObj._id;
        delete returnObj._v;
    }
});

userSchema.plugin(uniqueValidator,{ message: 'Email already in use!'});

const User = mongoose.model('user',userSchema);
module.exports ={ User };
