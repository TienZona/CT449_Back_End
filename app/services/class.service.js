const { ObjectId, ReturnDocument } = require("mongodb");
class ClassService {
    constructor(client) {
        this.classYear = client.db().collection("class");
    }
    
    async find(filter) {
        const cursor = await this.classYear.find(filter);
        return await cursor.toArray();
    }

}
module.exports = ClassService;