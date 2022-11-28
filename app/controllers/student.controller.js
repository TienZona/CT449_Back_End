const StudentService = require("../services/student.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const studentService = new StudentService(MongoDB.client);
        const document = await studentService.create(req.body);
        return res.send(document);
    } catch(err){
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
}

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const studentService = new StudentService(MongoDB.client);
        const document = await studentService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "Student was updated successfully"));
        }else{
            return res.send(document);
        }
    } catch (err){
        return next(  
            new ApiError(500, `Error updating student`)
        );
    }
}


exports.findAll = async (req, res, next) => {
    let documents = [];
    ervice = new StudentService(MongoDB.client);
        const {name} = req.query;
    try {
        const studentService = new StudentService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await studentService.findByName(name);
        }else{
            documents = await studentService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occerred while retrieving contacts")
        );
    }

    return res.send(documents);
}

exports.findOfClass = async (req, res) => {
    let documents = [];
    try {
        const studentService = new StudentService(MongoDB.client);
        const filter = req.params;
        documents = await studentService.findOfClass(filter);
    } catch (error) {
        return next(
            new ApiError(500, "An error occerred while retrieving contacts")
        );
    }

    return res.send(documents);;
}

exports.findOne = (req, res) => {
    res.send({message: "findOne handler"});
}
exports.delete = async (req, res, next) => {
    try {
        const studentService = new StudentService(MongoDB.client);
        const document = await studentService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404, "Student not found"));
        }else{
            return res.send(document);
        }
        
    } catch(err){
        return next(
            new ApiError(500, "Could not delete student")
        );
    }
}

