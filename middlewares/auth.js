const jwt = require ('jsonwebtoken');


function authenticateToken(req,res,next){
    const authHeader = req.header['authorizasion'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token===null){
        return res.sendStatus(401);
    }

    jwt.verify(token,'UserDetail_Snippet_SceretKEY',(err,user)=>{ 
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

function generateAccessToken(email){
    res.jwt.sign({data:email},'UserDetail_Snippet_SceretKEY',{
        expireIn:"1h"
    })
};

module.exports = { authenticateToken,generateAccessToken }