const getDb = require('../util/database').getDb; 

class Employee {
    constructor(props) {
        this.email = props.email,
        this.password = props.password,
        this.first_name = props.first_name,
        this.last_name = props.last_name,
        this.technical_skills = [],
        this.soft_skills = [],
        this.bookmarks = []
    }

    save() {
        const db = getDb();
        return db.collection('user').insertOne(this)
            .then(res => {
                console.log("User Created");
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = Employee;