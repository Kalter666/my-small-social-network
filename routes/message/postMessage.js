module.exports = (app, isLoggedIn, User, Message) => {
    //catch user's message
    app.post('/send/message/:username', isLoggedIn, (req, res) => {
        if (req.params.username === req.user.username) return res.send('You can\'t write yourself!'); //check if user write himself
        if (!req.body.text) {//check message body
            req.flash('errorMessage', 'You have no text in your message!');
            return res.redirect('/message/' + req.params.username); //if it empty tell him about that
        }
        const sender = req.user;
        User.selectByUsername(req.params.username, (err, user) => {
            if (err) return res.send(err);
            if (!user) return res.redirect('/error');
            Message.add(sender.id, user.id, req.body.text, (err) => {
                if (err) {
                    return res.send(err);
                }
                return res.redirect('/message/' + req.params.username);
            });
        });
    });
};