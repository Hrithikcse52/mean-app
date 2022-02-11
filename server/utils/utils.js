const mongoose = require('mongoose');
function checkObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}
module.exports = { checkObjectId };
