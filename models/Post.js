const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    imagePost: {
        type: String
    },
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    challengeId: {
        type: ObjectId,
        ref: 'Challenge'
    }, 
    comments: [{
         type: ObjectId, ref: "Comment" 
    }],
    likes: [{type: ObjectId, ref: 'User' }]
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;