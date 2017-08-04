module.exports = (app) => {
    app.get('*', function (req, res, next) {
        var err = new Error();
        err.status = 404;
        next(err);
    });
    app.use(function (err, req, res, next) {
        if (err.status !== 404) {
            return next();
        }
        let user = null;
        if (req.user)
            user = req.user;
        res.render('error/error', {
            message: 'Bad Url',
            err: err.status,
            user: user
        });
    });
};