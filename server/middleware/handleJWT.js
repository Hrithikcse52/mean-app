const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = require('../env');

const handleJWT = async (req, res, next) => {
    try {
        // const token = req.get('authorization');
        const { token } = req.cookies;
        if (!token) {
            return res
                .status(401)
                .send({ code: 401, message: 'auth required!!' });
        }
        const data = jwt.verify(token, TOKEN_KEY);
        if (!data) {
            return res
                .status(401)
                .send({ code: 401, message: 'auth required!!' });
        }
        req.user_id = data.user_id;
        req.user_name = data.name;
        req.email = data.email;
        return next();
    } catch (error) {
        console.log('Err Token Expired', error);
        res.clearCookie('token')
            .status(401)
            .send({ code: 401, message: 'auth not auth' });
    }
};

module.exports = { handleJWT };
