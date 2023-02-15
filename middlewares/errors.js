function errorHandler(err,req,res,next){
    if(typeof err === "string"){
        res.status(400).json({message: err.message});
    }

    if(typeof err === "validationError"){
        res.status(400).json({message: err.message});
    }

    if(typeof err === "UnauthorisedError"){
        res.status(401).json({message: err.message});
    }

    res.status(500).json({message: err.message});
};

module.exports ={ errorHandler };