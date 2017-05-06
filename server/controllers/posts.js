var mongoose = require("mongoose");
const Post = mongoose.model("Post");

function PostController(){
    this.index = function(req, res){
        Post.find({})
            .populate("_author")
            .exec(function(err, posts){
                if(err){
                    console.log(err);
                   return res.status(400).json(err); 
                } else{
                    return res.status(200).json({posts: posts})
                }
            })
    }
    this.create = function(req, res){
        console.log(req.body.user_id);
        var newPost = new Post({post: req.body.post, _author: req.body.user_id});
        newPost.save(function(err, post){
            if(err){
                console.log(err);
                return res.status(400).json(err);
            } else{
                res.status(200).json({post: post});
            }
        })
    }

    this.destroy = function(req, res){
        Post.remove({_id: req.params.post_id}, function(err, post){
            if(err){
                console.log(err)
                res.status(401).send({message: "Could not destroy post"})
            } else{
                return res.status(200).json({message: "destroyed post"});
            }
        })
    }

	this.destroyAll = function(req, res){
		Post.remove({}, function(err, posts){
			if(err){
				res.status(401).send({message: "Could not destroy all"})
			} else {
				res.status(200).send({message: "Destroy Alll"})
			}
		})
		console.log(req.body.id)
	}    
}

module.exports = new PostController();