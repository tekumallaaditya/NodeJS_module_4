
var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );

exports.Ucreate = function(req, res){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    var newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    newUser.save(function(err, savedUser){
        if (err){
            console.log('user name or email already exists');
            var message = 'user name or email already exists';
            res.render('register', {errorMessage: message});
            return;
        } else {
            req.session.newUser = savedUser.username;
            res.render('new-user', {session: req.session});
        }
    });

}

exports.login = function(req, res){
    console.log('inside login function in user.js');
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email}, function(err, user){
        console.log('user'+ user);
        if (user == null){
            console.log('user is null so invalid');
            var message = 'user does not exist, please enter valid email';
            res.render('login', {errorMessage: message});
            return;
        }

        user.comparePassword(password, function(err, isMatch){
            if(isMatch && isMatch== true){
                console.log('login successfull')
                req.session.username = user.username;
                req.session.loggedIn = true;
                res.render('new-story', {session: req.session});
            } else {
                var message = 'invalid email or password';
                res.render('login', {errorMessage: message});
                return;
            }
        });
    });
}

exports.logout = function(req, res){
    console.log('inside the logout function in user.js');
    var loggedoutUser = req.session.username;
    req.session.destroy();
    console.log('Logged out'+ loggedoutUser);
    res.render('login');
}