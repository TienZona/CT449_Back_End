const express = require("express");
const students = require("../controllers/student.controller");
// const userHandlers = require('../controllers/auth.controller');
const router = express.Router();

router.route("/")
    .get(students.findAll)
    .post(students.create)

router.route("/:id")
    .get(students.findOne)
    .put(students.update)
    .delete(students.delete);

router.route('/class/:class')
    .get(students.findOfClass)

// router.route('/student')
//     .get(students.findAll)
//     .post(students.create)
// router.route('/student/class/:id')
//     .get(students.findAll)
// router.route('/auth/sign_in')
//    	.post(userHandlers.sign_in);

module.exports = router;

