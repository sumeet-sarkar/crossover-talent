const getDb = require('../util/database').getDb; 

class Employee {
    constructor(props) {
        email = props.email,
        password = props.password,
        first_name = props.first_name,
        last_name = props.last_name,
        technical_skills = props.soft_skills,
        soft_skills = props.soft_skills,
        bookmarks = props.bookmarks
    }

    save() {
        const db = getDb();
    }
}

module.exports = Employee;