var jwt = require("jsonwebtoken");

module.exports = function(req, res, next){
    console.log("headers", req.headers);
     var token = req.body.token || req.query.token || req.headers.authorization;
     if(token){
         console.log("token provided")
        jwt.verify(token, "Super Secret", function(err, decoded){
            if(err){
                console.log(err);
                return res.status(401).send({success: false, message: "Invalid Credentials"});
            } else {
                console.log("token decoded");
                req.body.decoded = decoded;
                next()
            }
        })
     } else {
         console.log('no token provided');
        res.status(401).send({
            success: false,
            message: "No token provided"
        })
     }    
}