var chalk = require('chalk');
var mongoose = require('mongoose');
var bcrypt=require('bcrypt');
var SALT_WORK_FACTOR = 10;

//var dbURL = 'mongodb://localhost/testhome';
var dbURL = 'mongodb://userID:password@ds243931.mlab.com:43931/leaveyourmarks'

mongoose.connect(dbURL);

mongoose.connection.on('connected', function(){
    console.log(chalk.green('mongoose connected to %s',dbURL ));
});

mongoose.connection.on('error', function(err){
    console.log(chalk.red('not able to connect to the database' + err));
});

mongoose.connection.on('disconnected', function(){
    console.log(chalk.yellow('mongoose disconnected'));
});

//defining a schema for users

var userSchema = new mongoose.Schema({
    username: {type: String, unique:true},
    email: {type: String, unique: true},
    password: String
});

//below pre method is used to hash the text password
userSchema.pre('save', function(next){
    var user = this;
    console.log('before registering the user');
    //only the hash the password if it has been modified or is new
    if(!user.isModified('password')) return next();

    //generate the salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if (err) return next(err);

        //has the password using the salt generated 
        console.log('salt');
        bcrypt.hash(user.password, salt, function(err, hash){
            if (err) return next(err);
            //overwrite the text password with the hashed one
            user.password = hash;
            console.log('hash:' + hash);
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatepassword, cb){
    bcrypt.compare(candidatepassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//building user model
mongoose.model('User', userSchema);


//building a new schema for addstory

var storySchema = new mongoose.Schema({
    author: String,
    title: {type: String, unique: true},
    imageLink: String,
    created_at: {type: Date, default: Date.now},
    summary: String,
    content: String,
    comments: [{body: String, commented_by: String, date: Date}],
    slug: String
});

mongoose.model('Story', storySchema);
