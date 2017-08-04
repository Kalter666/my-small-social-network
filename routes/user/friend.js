const Friend = require(__dirname + './../../models/base_models/friend');
const User = require(__dirname + './../../models/base_models/user');

module.exports = (app, isLoggedIn) => {
    app.post('/addfriend/:username', isLoggedIn, (req, res) => {
        User.selectByUsername(req.params.username, (err, user) => {
            if (err) {
                req.flash('errorMessage', err);
                return res.redirect('/profile/' + req.params.username);
            }
            if (!user) {
                req.flash('errorMessage', 'Wrong user.');
                return res.redirect('/profile/' + req.params.username);
            }
            Friend.isFriend(req.user, user, (err, friend) => {
                if (err) {
                    req.flash('errorMessage', err);
                    return res.redirect('/profile/' + req.params.username);
                }
                if (friend) {
                    req.flash('errorMessage', 'You already add this user to your favorite list');
                    return res.redirect('/profile/' + req.params.username);
                }
                Friend.add(req.user, user, (err) => {
                    if (err) {
                        req.flash('errorMessage', err);
                        return res.redirect('/profile/' + req.params.username);
                    }
                    return res.redirect('/profile/' + req.params.username);
                });
            });
        })
    });

    app.post('/deletefriend/:username', isLoggedIn, (req, res) => {
        User.selectByUsername(req.params.username, (err, user) => {
            if (err) {
                req.flash('errorMessage', err);
                return res.redirect('/profile/' + req.params.username);
            }
            if (!user) {
                req.flash('errorMessage', 'Wrong username');
                return res.redirect('/profile/' + req.params.username);
            }
            Friend.isFriend(req.user, user, (err, friend) => {
                if (err) {
                    req.flash('errorMessage', err);
                    return res.redirect('/profile/' + req.params.username);
                }
                if (!friend) {
                    req.flash('errorMessage', 'You have to add this user first.');
                    return res.redirect('/profile/' + req.params.username);
                }
                Friend.remove(req.user, user, (err) => {
                    if (err) {
                        req.flash('errorMessage', err);
                        return res.redirect('/profile/' + req.params.username);
                    }
                    return res.redirect('/profile/' + req.params.username);
                });
            });
        })
    });

    app.get('/favorite/users/:username', isLoggedIn, (req, res) => {
        const you = req.params.username === req.user.username;
        User.selectByUsername(req.params.username, (err, user) => {
            if (err) return res.send(err);
            Friend.myFriends(user, (err, friends) => {
                if (err) return res.send(err);
                res.render('user/favorite-users', {
                    menu: menu,
                    you: you,
                    friends: friends,
                    im: req.user,
                    user: user
                });
            });
        });
    });

    app.get('/favorite/addings/users/:username', isLoggedIn, (req, res) => {
        const you = req.params.username === req.user.username;
        User.selectByUsername(req.params.username, (err, user) => {
            if (err) return res.send(err);
            Friend.myAddings(user, (err, friends) => {
                if (err) return res.send(err);
                res.render('user/addings-favorite', {
                    menu: menu,
                    you: you,
                    friends: friends,
                    im: req.user,
                    user: user
                });
            });
        });
    });
};
const menu = {
    setting: '/settings',
    mainpage: '/',
    logout: '/logout'
};