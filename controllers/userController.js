const mongoose = require('mongoose');
const User = mongoose.model('User');
const Bank = mongoose.model('Bank');
const promisify = require('es6-promisify');

exports.loginForm=(req,res)=>{
    res.render('login',{title:'Login' });

}

exports.registerForm = (req,res) => {
    res.render('register',{title:'Register'});
}

exports.validateRegister = (req,res,next)=>{
    req.checkBody('name');
    req.checkBody('name','Please Provide a name').notEmpty();
    req.checkBody('email','That Email is not valid').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password','Password can not be Blank').notEmpty();
    req.checkBody('password-confirm','Confirmed Password can not be blank').notEmpty();
    req.checkBody('password-confirm',' Your Passwords do not match').equals(req.body.password);
    req.checkBody('amount','Please enter an amount greater than zero').notEmpty().isInt({gt:0});

    const errors= req.validationErrors();
    if(errors){
        req.flash('error',errors.map(err => err.msg));
        res.render('register',{title: 'Register', body: req.body,
        flashes: req.flash() });
        return;
    }
    next();
}

exports.register= async(req,res,next)=>{
    const user = new User({email:req.body.email, name: req.body.name,amount:req.body.amount});
    const registerWithPromise= promisify(User.register,User);   // to store password with hash and npt
    await registerWithPromise(user,req.body.password);
    next()//
}; 

exports.deleteUser= async(req,res)=>{

    const user= await User.deleteOne(
        {_id: req.user._id}
    )
    res.redirect('/register');
}
