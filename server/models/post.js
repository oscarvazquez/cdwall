var mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
    post: {
        type: String,
        required: [true, "Post cannot be blank"],
        validate: {
            validator: function(v){
                return v.length < 500
            }, 
            message: `post must be less than 500 characters`
        }
    },
    _author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: {} });
mongoose.model('Post', PostSchema);