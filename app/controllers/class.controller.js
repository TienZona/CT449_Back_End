const ClassService = require("../services/class.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


exports.findAll = async (req, res, next) => {
    let documents = [];
    ervice = new ClassService(MongoDB.client);
        const {name} = req.query;
    try {
        const classService = new ClassService(MongoDB.client);
        documents = await classService.find({});
    } catch (error) {
        return next(
            new ApiError(500, "An error occerred while retrieving class")
        );
    }

    return res.send(documents);
}


