const Post = require("../models/Post.js");
const Comment = require("../models/Comment.js");

const CommentController = {
  async create(req, res) {
    try {
      if (req.file) req.body.imageComment = req.file.filename;
      const comment = await Comment.create({ ...req.body, userId: req.user._id, postId: req.params._id });
      await Post.findByIdAndUpdate(req.params._id, {
        $push: { comments: comment._id },
      });
      res.status(201).send(comment);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el comentario" });
    }
  },
  async getComments(req, res) {
    try {
      const comments = await Post.findById(req.params._id).populate("comments");
      res.send({ comments, message: "Aquí tienes todos los comentarios" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al traer los comentarios" });
    }
  },
  async update(req, res) {
    try {
      if (req.file) req.body.imageComment = req.file.filename;
      const comment = await Comment.findByIdAndUpdate(
        req.params._id,
        { comment: req.body.comment, imageComment:req.body.imageComment, userId: req.user._id },
        { new: true }
      );
      res.send({ message: "Comentario actualizado correctamente", comment });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al actualizar el comentario" });
    }
  },
  async delete(req, res) {
    try {
      const comment = await Comment.findByIdAndDelete(req.params._id);
      await Post.findByIdAndUpdate(comment.postId, {
        $pull: { comments:req.params._id},
      })
      res.send({ comment, message: "Comentario eliminado" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al eliminar el comentario" });
    }
  },
  async like(req, res) {
    try {
        const existComment = await Comment.findById(req.params._id);
        if (!existComment.likes.includes(req.user._id)) {
        const comment = await Comment.findByIdAndUpdate(
          req.params._id,
          { $push: { likes: req.user._id } },
          { new: true }
        );
        res.send(comment);
        } else {
        res.status(400).send({ message: "No se puede dar like otra vez al comentario" });
        }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema a la hora de darle al like al comentario" });
    }
  },
  async dislike(req, res) {
    try {
      const existComment = await Comment.findById(req.params._id);
      if (existComment.likes.includes(req.user._id)) {
      const comment = await Comment.findByIdAndUpdate(
        req.params._id,
        { $pull: { likes: req.user._id } },
        { new: true }
      );
      res.send(comment);
    } else {
        res.status(400).send({ message: "No se puede dar dislike otra vez al comentario" });
        }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          message: "Ha habido un problema a la hora de darle al dislike al comentario",
        });
    }
  },
};

module.exports = CommentController;