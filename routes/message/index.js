const User = require(__dirname + './../../models/base_models/user');
const Message = require(__dirname + './../../models/base_models/message');

module.exports = (app, isLoggedIn) => {
    require('./postMessage')(app, isLoggedIn, User, Message);
    require('./getMessage')(app, isLoggedIn, User, Message);
};
