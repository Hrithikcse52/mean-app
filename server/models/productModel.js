const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            default: '',
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
        },
        sold: {
            type: Number,
            default: 0,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    { timestamps: true }
);
const productModel = mongoose.model('product', productSchema);
module.exports = productModel;
