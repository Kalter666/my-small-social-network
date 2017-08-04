module.exports = (app, isLoggedIn, User, Message) => {
    app.get('/message/:username', isLoggedIn, (req, res) => { //users dialog with another user
        if (req.user.username === req.params.username) return res.send('You cant write yourself.');
        User.selectByUsername(req.params.username, (err, user) => { //find a interlocutor
            if (err) return res.send(err); //send error just in case
            if (!user) return res.send('Wrong username'); // if user doesn't have a dialog with this user
            Message.selectByUsers(req.user, user, (err, messages) => { //select all messages
                if (err) return res.send(err);
                res.render('message/message', {
                    errorMessage: req.flash('errorMessage'),
                    user: req.user,
                    companion: user.username,
                    messages: messages
                });
            });
        });
    });

    app.get('/dialogs', isLoggedIn, (req, res) => { //users dialogs
        Message.selectAllDialogs(req.user, (err, dialogs) => {
            if (err) return res.send(err);
            res.render('message/dialogs', {
                dialogs: dialogs,
                user: req.user
            });
        });
    })
};