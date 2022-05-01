const Post = require("../models/Post.js");
const User = require("../models/User.js");
const Challenge = require("../models/Challenge.js");

const PostController = {
  async create(req, res) {
    try {
      if (req.file) req.body.imagePost = req.file.filename;
      const post = await Post.create({ ...req.body, userId: req.user._id })
      await User.findByIdAndUpdate(req.user._id, {
        $push: { postIds: post._id },
      });
      await Challenge.findByIdAndUpdate(req.body.challengeId, {
        $push: { postsId: post._id },
      });
      res.status(201).send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el post" });
    }
  },
  async getAll(req, res) {
    try {
      const posts = await Post.find().populate("comments").populate("challengeId").populate({
        path : 'userId',
        populate : {
          path : 'company'
        }
      }).sort([["createdAt", -1]]);
      res.send({ posts, message: "Aquí tienes todos los posts" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al traer los posts" });
    }
  },
  async getById(req, res) {
    try {
      const post = await Post.findById(req.params._id).populate(
        "userId"
      ).populate({
        path : 'comments',
        populate : {
          path : 'userId'
        }
      })
      .populate('challengeId').populate({
        path : 'userId',
        populate : {
          path : 'company'
        }
      })
      res.send(post);
    } catch (error) {
      console.error(error); 
      res
        .status(500)
        .send({ message: "Ha habido un problema al traer el post por Id" });
    }
  }, 
  async getByDescription(req, res) {
    try {
      const description = new RegExp(`${req.params.description}`, "i");
      const post = await Post.aggregate([
        {
          $match: {
            description,
          },
        },
      ]);
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al traer el post por descripción",
      });
    }
  },
  async update(req, res) {
    try {
      if (req.file) req.body.imagePost = req.file.filename;
      const post = await Post.findByIdAndUpdate(req.params._id, { ...req.body, userId: req.user._id }, {
        new: true,
      });
      res.status(201).send({ post, message: "Post editado con exito" });
    } catch (error) {
      console.error(error);
    }
  },
  async delete(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id);
      await User.findByIdAndUpdate(
        post.userId,
        {
          $pull: {
            postIds: post._id
          },
        },
        { new: true } 
      );
      res.send({ post, message: "Post eliminado con exito" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al eliminar el post" });
    }
  },
  async like(req, res) {
    try {
      const existPost = await Post.findById(req.params._id);
      if (!existPost.likes.includes(req.user._id)) {
        const post = await Post.findByIdAndUpdate(
          req.params._id,
          { $push: { likes: req.user._id } },
          { new: true }
        );
        await User.findByIdAndUpdate(
          req.user._id,
          { $push: { favorites: req.params._id } },
          { new: true }
        );
        res.send(post);
      } else {
        res.status(400).send({ message: "No se puede dar like otra vez" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema a la hora de darle al like" });
    }
  },
  async dislike(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { $pull: { likes: req.user._id } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { favorites: req.params._id } },
        { new: true }
      );
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema a la hora de darle al dislike",
      });
    }
  },
};

module.exports = PostController;
