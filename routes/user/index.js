module.exports = (app, passport, isLoggedIn) => {
    require('./friend')(app, isLoggedIn);
    require('./registration/login')(app, passport, isLoggedIn);
    require('./profile')(app, passport, isLoggedIn);
    require('./search')(app, isLoggedIn)
};