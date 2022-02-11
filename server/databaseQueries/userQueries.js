const userModel = require('../models/userModel');
function createUser(doc) {
    return new Promise((resolve, reject) => {
        if (!doc)
            return reject({
                code: 400,
                message: 'Bad Request on creating user',
            });
        userModel.create(doc, (err, result) => {
            if (err) {
                return reject({
                    code: 500,
                    message: 'something went wrong creating user',
                });
            }
            resolve({ code: 200, data: result });
            return;
        });
    });
}
function getUser(filter) {
    return new Promise((resolve, reject) => {
        if (!filter) {
            return reject({
                code: 400,
                message: 'Bad Request on geting user!',
            });
        }
        userModel.findOne(filter, (err, result) => {
            if (err) {
                return reject({
                    code: 500,
                    message: 'Something went wrong grabbing user!',
                });
            }
            resolve({ code: 200, data: result });
            return;
        });
    });
}

module.exports = {
    createUser,
    getUser,
};
