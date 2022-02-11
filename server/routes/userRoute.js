const { createUser, getUser } = require('../databaseQueries/userQueries');
const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = require('../env');
const { handleJWT } = require('../middleware/handleJWT');
const router = require('express').Router();
router.post('/create', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!(name && email && password))
            return res
                .status(400)
                .send({ message: 'Bad Request provide all required data!' });
        const userCreateResponse = await createUser({ name, password, email });
        if (userCreateResponse.code !== 200)
            return res.status(500).send({
                message:
                    userCreateResponse?.message ||
                    'something went wrong while creating the user!',
            });

        return res.send(userCreateResponse.data);
    } catch (error) {
        return res
            .status(500)
            .send({ message: 'something went wrong on creating the user!' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password))
            return res.status(400).send({
                code: 400,
                message: 'Bad Request Send Complete Credentials',
            });
        const user = await getUser({ email });
        console.log('user', user);
        if (user.code !== 200 || !user?.data)
            return res.status(500).send({
                code: 400,
                message: 'Something went wrong while login',
            });
        if (user.data.password !== password)
            return res.status(401).send({
                code: 401,
                message: 'password wrong',
            });
        const token = jwt.sign(
            {
                user_id: user.data._id,
                name: user.data.name,
                email: user.data.email,
            },
            TOKEN_KEY,
            { expiresIn: '5h' }
        );
        res.cookie('token', token).send({
            code: 200,
            message: 'Login Successful!',
        });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!' });
    }
});

router.get('/', handleJWT, async (req, res) => {
    try {
        console.log(req.cookies);
        const { user_id, email, user_name } = req;
        res.status(200).send({
            code: 200,
            data: { email, user_name, user_id },
        });
    } catch (error) {
        res.status(500).send({ code: 401, message: 'Something went wrong!' });
    }
});

module.exports = router;
