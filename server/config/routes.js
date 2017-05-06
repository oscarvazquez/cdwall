var usersController = require('../controllers/users.js')
var postsController = require('../controllers/posts.js')
var decode = require("../middleware/decode.js");
var validate = require("../middleware/validate.js");
var accessControl = require("../middleware/accessControl.js");
module.exports = function(app){
	app.use(accessControl);
	app.get("/users", usersController.index);
	app.post('/users/create', usersController.create)
	
	//clearing data
	app.get('/users/destroy/password/forreal', usersController.destroyAll)
	app.get('/posts/destroy/password/forreal', postsController.destroyAll)		
	
	//post
	app.post("/posts/create", decode, validate, postsController.create);
	app.get("/posts/:user_id", decode, validate, postsController.index);
	app.post("/posts/:post_id/destroy", decode, validate, postsController.destroy);

	//auth
	app.get("/users/:user_id/authenticate", decode, validate, usersController.authenticate);
	app.post("/login", usersController.login)
}
