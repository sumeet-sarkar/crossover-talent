const faker = require('faker');
const fs = require('fs');
const path = require('path');
const getDb = require('../util/database').getDb;

const mockData = require('../MOCK_DATA.json');

class Jobs {
    constructor(props) {
        this.company = props.company,
        this.title = props.title,
        this.description = props.description,
        this.skills = props.skills,
        this.location = props.location,
        this.category = props.category,
        this.logo = props.logo,
        this.salary = props.salary,
        this.currency = props.currency,
        this.currencySymbol = props.currencySymbol
    };

    save() {
        const db = getDb();
        return db.collection('jobs').insertOne(this)
            .then(res => {
                console.log("Added job successfully");
            })
            .catch(err => {
                throw err;
            })
    }

    static add_bulk_data(req, res, next) {
        const db = getDb();
        return db.collection('jobs').insertMany(mockData)
            .then(res => {
                console.log("Added jobs data in bulk");
            })
            .catch(err => {
                throw err;
            })
    }

    static refactorMockData() {
        const newMockData = mockData.map(data => {
            const temp = {};
            temp['company'] = faker.company.companyName().toLowerCase();
            temp['title'] = faker.name.jobTitle().toLowerCase();
            temp['description'] = faker.lorem.paragraph().toLowerCase();
            temp['city'] = faker.address.city().toLowerCase();
            temp['category'] = faker.commerce.department().toLowerCase();
            temp['salary'] = faker.finance.amount();
            temp['currency'] = faker.finance.currencyName().toLowerCase();
            temp['currencySymbol'] = faker.finance.currencySymbol();
            temp['skills'] = data.skills;
            temp['bookmarks'] = [];
            return temp;
        });
        fs.writeFile(path.join(path.dirname(process.mainModule.filename), 'MOCK_DATA.json'), JSON.stringify(newMockData, null, 2), err => {
            console.log(err);
        })
    };
};

module.exports = Jobs;