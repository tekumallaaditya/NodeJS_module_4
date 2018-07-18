exports.index = function(req, res){
    res.render('index', {session: req.session});
};

exports.login = function(req, res){
    res.render('login');
}
exports.register = function(req, res){
    res.render('register');
};

exports.newstory = function(req, res){
    if(req.session.loggedIn !== true){
        console.log('you are not logged in');
        res.redirect('/login');
    } else {
        res.render('new-story', {session: req.session});
    }
}