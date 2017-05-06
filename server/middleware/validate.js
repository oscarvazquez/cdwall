
module.exports = function(req, res, next){
    let user_id = req.params.user_id || req.body.user_id
    console.log(req.body.decoded.user_id, user_id)
    if(req.body.decoded.user_id === user_id){
        next();
    } else {
        return res.status(401).send({success: false, message: "Invalid Credentials"});
    }
}