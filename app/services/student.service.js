const { ObjectId, ReturnDocument } = require("mongodb");
class StudentService {
    constructor(client) {
        this.student = client.db().collection("students");
    }

    extractConactData(payload) {
        const student = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            birthdate: payload.birthdate,
            phone: payload.phone,
            sex: payload.sex,
            class: payload.class,
        };
        // Remove undefined fields
        Object.keys(student).forEach(
            (key) => student[key] === undefined && delete student[key]
        );
        return student;
    }
    async create(payload) {
        const student = this.extractConactData(payload);
        const result = await this.student.findOneAndUpdate(
            student,
            { $set: {} },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.student.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }


    async delete(id) {
        const result = await this.student.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
   
    async find(filter) {
        const cursor = await this.student.find(filter);
        return await cursor.toArray();
    }

    async findOfClass(filter) {
        const cursor = await this.student.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
}
module.exports = StudentService;