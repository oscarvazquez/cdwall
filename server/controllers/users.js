var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require("jsonwebtoken");

function UsersController(){
	this.index = function(req, res){
		User.find({}, function(err, users){
			if(err){
				console.log(err);
				res.json({error: true, errors: err})
			} else {
				res.json(users);
			}
		})		
	}
	this.create = function(req, res){
		User.find({username: req.body.username}, function(err, users){
			if(err){
				return res.status(400).json(err);
			} else if(users.length > 0){
				return res.status(400).json({errors: {username: {message: "Username Must Be Unique"}}});
			} else {
				var newUser = new User(req.body);
				newUser.save(function(err, user){
					if(err){
						return res.status(400).json(err);
					}
					return res.status(201).json({user: user, message: "Succesfully Created User!" })
				})
			}
		})
	}
	this.authenticate = function(req, res){
		User.findOne({_id: req.params.user_id}, function(err, user){
			if(err){
				res.status(404).json(err);
			} else{
				res.status(200).json({user: user});
			}
		})
	}
	this.destroyAll = function(req, res){
		User.remove({}, function(err, users){
			if(err){
				res.status(401).send({message: "Could not destroy all"})
			} else {
				res.status(200).send({message: "Destroy Alll"})
			}
		})
		console.log(req.body.id)
	}
	this.login = function(req, res){
		console.log(req.body.username)
		User.findOne({username: req.body.username}, function(err, user){
			if(err || !user){
				console.log("error", err)
				console.log(err, user);
				return res.status(401).send({success: false, message: "Invalid Credentials"});				
			}
			console.log(user, req.body.password);
			if(user.password == req.body.password){
				let token = jwt.sign({user_id: user._id}, "Super Secret", {
                	expiresIn: "5h"
				})
				return res.status(201).json({success: true, token: token, message: "Succesfully signed in", user_id: user._id}); 
			} else {
				console.log('wrong apssword', user.password, req.body.password)
				return res.status(401).send({success: false, message: "Invalid Credentials"});				
			}
		})
	}
}

module.exports = new UsersController();