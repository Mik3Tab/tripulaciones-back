const express = require("express");
const router = express.Router();
const CompanyController = require("../controllers/CompanyController");

const {
  authenticationCompany,
  authentication,
} = require("../middlewares/authentication");
const { uploadCompanyImages } = require("../middlewares/multer");
const { isAdmin } = require("../middlewares/role");

router.post("/", CompanyController.create);
router.put("/confirm/:_id", authentication, isAdmin, CompanyController.confirm);
router.post("/login", CompanyController.login);
router.put(
  "/",
  authenticationCompany,
  uploadCompanyImages.single("imageCompany"),
  CompanyController.update
);
router.delete("/", authenticationCompany, CompanyController.delete);
router.delete("/logout", authenticationCompany, CompanyController.logout);
router.get("/id/:_id", authenticationCompany , CompanyController.getCompanyById);
router.get("/", CompanyController.getAll);
router.get("/company/:name", authenticationCompany,  CompanyController.getCompanyByName);

module.exports = router;
