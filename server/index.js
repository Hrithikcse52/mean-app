const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { MONGO_URI, PORT } = require('./env');
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');
const cors = require('cors');
const app = express();
mongoose
    .connect(MONGO_URI)
    .then((res) => {
        console.log('DB Connected');
    })
    .catch((er) => {
        console.log("Couldn't Connect to DB");
    });
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
app.get('/', (_, res) => {
    res.send({ code: 200, message: 'server is up and running !' });
});
app.use('/user', userRouter);
app.use('/product', productRouter);

app.listen(PORT, () => {
    console.log(`server is up & running at port ${PORT}`);
});
