const express = require ('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const userRoutes = require('./routes/users.route');
mongoose.set('strictQuery', true);

dotenv.config();

const auth = require ('./middlewares/auth');
const error = require('./middlewares/errors');

var { unless } = require("express-unless");
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{ 
    console.log('Databse Connected Successfully!')
},(error)=>{
    console.log('Error while connecting the database!',error)
});

auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path:[
        {
            url:'/users/login', method: ['POST']
        },
        {
            url:'/users/register', method: ['POST']
        },
    ]
    })
);

app.use(express.json);
app.use('/users', userRoutes);
app.use(error.errorHandler);
app.listen(process.env.PORT || 3600, function (){
    console.log('server listning on port' , process.env.PORT)
});