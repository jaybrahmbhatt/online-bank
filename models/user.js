const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise=global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail,'Invalid Email Address'],
        required: 'Please Provide an email address'
    },
    name:{
        type: String,
        required: 'Please Provide a name',
        trim:true
    },
    amount:{
        type: Number
    }
});

userSchema.virtual('gravatar').get(function(){
    return 'https://img1.looper.com/img/gallery/michael-scott-moments-that-made-us-cringe/intro-1562178435.jpg';
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User',userSchema);
