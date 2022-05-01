const Company = require("../models/Company");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require('axios')

const CompanyController = {
  async create(req, res) {
    try {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const company = await Company.create({
        ...req.body,
        password: hash,
        confirmed: false,
      });
      res.status(201).send({
        message:
          "Gracias por registrate en breves confirmaremos sus credenciales.",
        company
      });
    } catch (error) {
      console.error(error);
    }
  },
  async confirm(req, res) {
    try {
      const company = await Company.findByIdAndUpdate(
        req.params._id,
        { confirmed: true },
        { new: true }
      );
      res.status(201).send({ msg: "Empresa confirmada", company });
    } catch (error) {
      console.error(error);
    }
  },

  async getCompanyById(req, res) {
    try {
      const company = await Company.findById(req.params._id).populate("employees");
      res.send(company);
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
      const company = await Company.findOne({ email: req.body.email });
      if (!company) {
        return res
          .status(400)
          .send({ message: "Email o contraseña incorrectos" });
      }
      if (!company.confirmed) {
        return res.status(400).send({
          message:
            "Estamos revisando tu información. En breve confirmaremos tu cuenta",
        });
      }
      const isMatch = bcrypt.compareSync(req.body.password, company.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Email o contraseña incorrectos" });
      }
      token = jwt.sign({ _id: company._id }, process.env.JWT_SECRET);
      if (company.token.length > 4) company.token.shift();
      company.token.push(token);
      await company.save();
      res.send({ message: "Bienvenido " + company.name, token, company });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema al intentar logearte" });
    }
  },
  async logout(req, res) {
    try {
      await Company.findByIdAndUpdate(req.company._id, {
        $pull: { token: req.headers.authorization },
      });
      res.send({ message: "Compañia deslogeada con exito" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al intentar deslogearte",
      });
    }
  },

  async update(req, res) {
    try {
      if (req.file) req.body.imageCompany = req.file.filename;
      const company = await Company.findByIdAndUpdate(
        req.company._id,
        req.body,
        {
          new: true,
        }
      );
      res.send({ message: "Empresa editada con exito", company });
    } catch (error) {
      console.error(error);
    }
  },

  async delete(req, res) {
    try {
      const company = await Company.findByIdAndDelete(req.company._id);
      res.send({ company, message: "Empresa eliminada" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al eliminar la empresa" });
    }
  },
  async getAll(req, res) {
    try {
      const companies = await Company.find()
        .sort([["score", -1]])
        .populate("employees");
      res.send(companies);
    } catch (error) {
      console.error(error);
    }
  },
  async getCompanyByName(req, res) {
    try {
      const name = new RegExp(`${req.params.name}`, "i");
      const companies = await Company.aggregate([
        {
          $match: {
            name,
          },
        },
      ]);
      res.send(companies);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = CompanyController;
