const express = require("express");
const Router = express.Router();
const adminMiddlewre = require("../middleware/adminMiddleware");
const copouncontroller = require("../controller/copounController");
Router.route("/copoun/add").post(adminMiddlewre, copouncontroller.addcopoun);
Router.route("/copouns").get(copouncontroller.getallCopoun);
Router.route("/checkcopoun").post(copouncontroller.checkcopoun);
Router.route("/copoun/delete/:id").delete(
  adminMiddlewre,
  copouncontroller.deletecopoun
);
module.exports = Router;
