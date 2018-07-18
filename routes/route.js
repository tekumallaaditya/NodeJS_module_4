exports.index = function(req, res){
    res.render('index', {session: req.session});
};

exports.login = function(req, res){
    res.render('login');
}
exports.register = function(req, res){
    res.render('register');
};