const User = require(__dirname + './../models/base_models/user');
const Message = require(__dirname + './../models/base_models/message');

module.exports = (app, passport) => {
    require('./user/index')(app, passport, isLoggedIn);
    require('./message/index')(app, isLoggedIn);
    require('./error/errors')(app);
};
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}