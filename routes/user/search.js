const search = require(__dirname + './../../models/search/user');
module.exports = (app, isLoggedIn) => {

    app.get('/search/user/:username', isLoggedIn, (req, res) => {
        const name = req.params.username;
        search.findUsers(name, (err, users) => {
            if (err) return res.send(err);
            res.render('search/user', {
                user: req.user,
                users: users
            });
        });
    });

    app.post('/search/user', isLoggedIn, (req, res) => {
        const name = encodeURIComponent(req.body.name);
        res.redirect('/search/user/' + name);
    });
};