const getDb = require('../util/database').getDb; 

class Employee {
    constructor(props) {
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    save() {
        const db = getDb();
    }
}

module.exports = Employee;