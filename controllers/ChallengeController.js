const Challenge = require("../models/Challenge.js");
const User = require("../models/User.js");


const ChallengeController = {
  async create(req, res) {
    try {
      if (req.file) req.body.imageChallenge = req.file.filename;
      const challenge = await Challenge.create({ ...req.body, userId: req.user._id });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { challenges: challenge._id },
      });
      res.status(201).send(challenge);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el reto" });
    }
  },

  async getAll(req, res) {
    try {
      const challenges = await Challenge.find();
      res.send({ challenges, message: "Aquí tienes todos los retos" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al traer los retos" });
    }
  },
  async getById(req, res) {
    try {
      const challenge = await Challenge.findById(req.params._id);
      res.send(challenge);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al traer el reto por Id" });
    }
  }
};

module.exports = ChallengeController;
