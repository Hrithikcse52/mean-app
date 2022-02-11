const res = require('express/lib/response');
const product = require('../models/productModel');
function createProduct(doc) {
    return new Promise((resolve, reject) => {
        if (!doc) {
            return reject({ code: 400, message: 'Bad Request' });
        }
        product.create(doc, (err, data) => {
            if (err) {
                console.log('Product Create error', err);
                return reject({ code: 500, message: 'Something Went Wrong' });
            }
            resolve({ code: 200, data });
            return;
        });
    });
}
function getProducts(filter, options = {}) {
    return new Promise((resolve, reject) => {
        // if (!filter) return reject({ code: 400, message: 'Provide Filter!' });
        product.find(filter, (err, result) => {
            if (err)
                return reject({
                    code: 400,
                    message: 'Something Wrong Gathering Products !',
                });
            if (!result || result.length === 0) {
                return reject({
                    code: 400,
                    message: 'No Products Found',
                });
            }
            resolve({ code: 200, data: result });
        });
    });
}
function updateProduct(id, update) {
    return new Promise((resolve, reject) => {
        product.findByIdAndUpdate(id, update, { new: true }, (err, data) => {
            if (err) {
                reject({ code: 500, data: "Couldn't Update" });
                return;
            }
            resolve({ code: 200, data });
        });
    });
}

module.exports = { createProduct, getProducts, updateProduct };
