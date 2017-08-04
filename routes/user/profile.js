const User = require(__dirname + './../../models/base_models/user');
const Article = require(__dirname + './../../models/base_models/article/article');
const Friend = require(__dirname + './../../models/base_models/friend');
//const cloudinary = require('cloudinary');

//cloudinary.config(require(__dirname + './../../config/cloudinary'));

module.exports = (app, passport, isLoggedIn) => {
    const menu = {
        setting: '/settings',
        mainpage: '/',
        logout: '/logout'
    };

    app.get('/profile/:username', isLoggedIn, function (req, res) {
        const you = req.params.username === req.user.username;
        User.selectByUsername(req.params.username, (err, user) => {
            if (err) {
                return res.send(err);
            } else if (!user) {
               return res.status(404).send('Something broke');
            } else {
                Friend.isFriend(req.user, user, (err, friend) => {
                    if (err) return res.send(err);
                    Article.selectByUser(user, (err, articles) => {
                        if (err) return res.send(err);
                        else
                        if (!articles[0]) articles = false;
                        Friend.countFriends(user, (err, friends) => {
                            if (err) return res.send(err);
                            Friend.countAddings(user, (err, friendAddings) => {
                                if (err) return res.send(err);
                                res.render('user/profile', {
                                    user: req.user,
                                    menu: menu,
                                    im: user,
                                    you: you,
                                    articles: articles,
                                    friend: friend,
                                    friends: friends,
                                    friendAddings: friendAddings
                                });
                            });
                        });
                    })
                });
            }

        });
    });

    app.get('/settings', isLoggedIn, (req, res) => {
        const im = req.user;
        User.selectByUsername(req.user.username, (err, user) => {
            if (err) return res.send(err);
            else if (!user) return res.status(404).send('Something broke');
            else
                res.render('user/settings', {
                    user: user,
                    im: im,
                    menu: menu,
                    successMessage: req.flash('successMessage'),
                    errorMessage: req.flash('errorMessage')
                });
        });
    });

    app.post('/settings', isLoggedIn, (req, res) => {
        const info = {
            id: req.user.id,
            pass: req.body.pass,
            name: req.body.firstname,
            last_name: req.body.lastname,
            e_mail: req.body.email,
            website: req.body.website
        };
        /*        if (req.file.pic) {
         cloudinary.uploader.upload(req.file.pic, function(result) {
         console.log(result);
         info.pic = result.url;
         update(info);
         });
         } else update(info);*/
        update(info);
        function update(user) {
            if (!user.id) {
                return res.redirect('/index');
            }
            if (!user.pass && !user.name && !user.last_name && !user.e_mail && !user.website && !user.pic) {
                req.flash('error-message', 'just fill the fields');
                return res.redirect('/settings');
            }
            User.update(user, (err) => {
                if (err)
                    req.flash('errorMessage', 'try again \r\n' + err);
                else
                    req.flash('successMessage', 'Successfully updated!');
                res.redirect('/settings');
            });
        }
    });

    app.post('/deleteuser', isLoggedIn, (req, res) => {
        User.remove(req.user, (err) => {
            if (err) {
                req.flash('errorMessage', 'Sorry, try again later. Error:' + err);
                res.redirect('/settings');
            }
            res.redirect('/logout');
        });
    });
};