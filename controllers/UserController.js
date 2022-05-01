const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");
const Company = require("../models/Company");

const UserController = {
  async create(req, res, next) {
    try {
      if (!req.body.password) {
        return res
          .status(400)
          .json({ message: "La contraseña es obligatoria" });
      }
      let user = await User.findOne({
        email: req.body.email,
      });
      if (user) return res.status(400).send("Este email ya existe.");
      req.body.role = req.body.role ? req.body.role : "employee";
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = await User.create({
        ...req.body,
        password: hash,
        confirmed: false,
      });
      await Company.findByIdAndUpdate(req.body.company, {
        $push: { employees: newUser._id },
      });
      const emailToken = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "48h",
        }
      );
      const url = "https://tripulacionesback.herokuapp.com/users/confirm/" + emailToken;
      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirme su registro",
        html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
                <a href="${url}"> Click para confirmar tu registro</a>`,
      });
      res.status(201).send({
        message: "Esperando confirmacion, por favor revise su email",
        newUser,
      });
    } catch (error) {
      console.error(error);
      error.origin = 'users'
      next(error)
    }
  },

  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      await User.findOneAndUpdate(
        { email: payload.email },
        { $set: { confirmed: true } },
        { new: true }
      );
      res.status(201).send("Usuario confirmado");
    } catch (error) {
      console.error(error);
    }
  },

  async login(req, res) {
    try {
      if (!req.body.password || !req.body.email) {
        return res
          .status(400)
          .json({ message: "Por favor rellene los campos que faltan" });
      }
      const user = await User.findOne({ email: req.body.email }).populate('company');
      if (!user) {
        return res
          .status(400)
          .send({ message: "Email o contraseña incorrectos" });
      }
      if (!user.confirmed) {
        return res.status(400).send({
          message: "Por favor revisa tu email y confirma tu cuenta",
        });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Email o contraseña incorrectos" });
      }
      token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      if (user.token.length > 4) user.token.shift();
      user.token.push(token);
      await user.save();
      res.send({ message: "Bienvenido " + user.name, token, user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema al intentar logearte" });
    }
  },

  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { token: req.headers.authorization },
      });
      res.send({ message: "Usuario deslogeado con exito" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al intentar deslogearte",
      });
    }
  },

  async getAll(req, res) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.error(error);
    }
  },

  async update(req, res) {
    try {
      if (req.file) req.body.imageUser = req.file.filename;
      const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
      });
      res.send({ message: "Usuario editado con exito", user });
    } catch (error) {
      console.error(error);
    }
  },

  async getUserByName(req, res) {
    try {
      const name = new RegExp(`${req.params.name}`, "i");
      const user = await User.aggregate([
        {
          $match: {
            name,
          },
        },
      ]);
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },

  async getById(req, res) {
    try {
      const user = await User.findById(req.params._id)
        .populate("postIds")
        .populate("favorites");
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },

  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params._id);
      res.send({ user, message: "Usuario eliminado" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al eliminar el usuario" });
    }
  },

  async deleteMySelf(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.user._id);
      res.send({ user, message: "Usuario eliminado" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al eliminar el usuario" });
    }
  },

  async recoverPasswod(req, res) {
    try {
      const recoverToken = jwt.sign(
        { email: req.params.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "48h",
        }
      );
      const url = "http://localhost:4000/users/resetPassword/" + recoverToken;
      await transporter.sendMail({
        to: req.params.email,
        subject: "Password recovery",
        html: `<h3>Recuperar Contraseña</h3><a href="${url}"> Recupera la contraseña </a> El link expira en 48h`,
      });
      res.send({
        message:
          "Se le ha enviado un email de recuperación a su bandeja de entrada",
      });
    } catch (error) {
      console.error(error);
    }
  },

  async resetPassword(req, res) {
    try {
      const recoverToken = req.params.recoverToken;
      const payload = jwt.verify(recoverToken, process.env.JWT_SECRET);
      const hash = await bcrypt.hashSync(req.body.password, 10);
      await User.findOneAndUpdate({ email: payload.email }, { password: hash });
      res.send({
        message: "La constraseña se ha cambiado de forma exitosa",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "ha habido un problema al cambiar la contraseña" });
    }
  },
};
module.exports = UserController;
