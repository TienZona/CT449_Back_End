const express = require("express");
const classYear = require("../controllers/class.controller");
const router = express.Router();

router.route("/")
    .get(classYear.findAll)

module.exports = router;

