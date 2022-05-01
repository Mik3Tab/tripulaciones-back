const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

const isAuthorPost = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params._id);
        if (post.userId.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: 'Este no es tu post' });
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema de autorizacion con el post' })
    }
}

const isAuthorComment = async(req, res, next) => {
    try {
        const comment = await Comment.findById(req.params._id);
        if (comment.userId.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: 'Este no es tu comentario' });
        } 
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema de autorizacion con el comentario' })
    }
}

module.exports = { isAuthorPost, isAuthorComment }