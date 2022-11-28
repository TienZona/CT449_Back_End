const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./user");
db.role = require("./role");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;