const {
    createProduct,
    getProducts,
    updateProduct,
} = require('../databaseQueries/productQueries');
const { handleJWT } = require('../middleware/handleJWT');
const { checkObjectId } = require('../utils/utils');

const router = require('express').Router();

router.get('/list', handleJWT, async (req, res) => {
    try {
        const { user_id } = req;
        const product = await getProducts({ user_id });
        if (product.code !== 200)
            return res
                .status(400)
                .send({ message: product.message || 'something went wrong ' });
        res.send(product.data);
    } catch (error) {
        res.status(500).send({
            message: 'Something with getting product went wrong !',
            error,
        });
    }
});
router.get('/dash', handleJWT, async (req, res) => {
    try {
        const { user_id } = req;
        const product = await getProducts({ user_id });
        if (product.code !== 200)
            return res
                .status(400)
                .send({ message: product.message || 'something went wrong ' });

        const dataToSend = product.data.map((pro) => ({
            name: pro.name,
            stock: pro.stock - pro.sold,
            price: pro.price,
        }));
        res.send(dataToSend);
    } catch (error) {
        res.status(500).send({
            message: 'Something with getting product went wrong !',
            error,
        });
    }
});

router.post('/create', handleJWT, async (req, res) => {
    try {
        const { user_id } = req;
        const { name, price, image, stock = 0 } = req.body;
        if (!(name && price && image && user_id)) {
            return res.status(400).send({ message: 'Bad Request' });
        }
        const productCreateRes = await createProduct({
            name,
            image,
            stock,
            price,
            user_id,
        });
        console.log('created', productCreateRes);
        if (productCreateRes.code !== 200)
            return res.status(400).send({
                message: 'Bad Request happened',
                err: productCreateRes.message,
            });
        return res.send({ code: 200, data: productCreateRes.data });
    } catch (error) {
        return res.status(400).send({ message: 'Bad Request' });
    }
});

router.put('/update/:id', handleJWT, async (req, res) => {
    try {
        const { id } = req.params;
        if (!checkObjectId(id))
            return res.status(400).send({ message: 'send proper id' });
        const data = req.body;
        const product = await getProducts({_id: id});
        console.log("produc",product)
        if(product.code !== 200) return res.send({code :400, message:"not post found to update!"})
        const updateData = {};
        if (data.name) updateData.name = data.name;
        if (data.desc) updateData.desc = data.desc;
        if (data.price) updateData.price = data.price;
        if (data.image) updateData.image = data.image;
        if (data.stock && data.stock !== "") {
            console.log("data stock",data.stock);
            updateData.stock = product.data[0].stock + data.stock;
        }
        if (data.sold && data.sold !== "") {
            console.log("data sold",data.sold);
            updateData.sold= product.data[0].sold + data.sold;
        }
        console.log('upda', updateData);
        const productAfterUpdate = await updateProduct(id, updateData);
        if (productAfterUpdate.code !== 200)
            return res
                .status(500)
                .send({ message: productAfterUpdate.message || 'something went Wrong ' });
        res.send(productAfterUpdate.data);
    } catch (error) {}
});
module.exports = router;
