var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username cannot be blank"],
        validate: {
            validator: function(v){
                return v.length >= 5
            }, 
            message: `Username must be at least 5 characters long`
        }
    },
    password: {
        type: String,
        required: [true, "Password cannot be blank"],
        validate: {
            validator: function(v){
                return v.length >= 5
            }, 
            message: `Password must be at least 5 characters long`
        }      
    },
    posts : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]    
}, { timestamps: {} });
mongoose.model('User', UserSchema);