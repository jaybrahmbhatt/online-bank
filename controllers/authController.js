const passport = require('passport');

exports.login = passport.authenticate('local',{
    failureRedirect: '/login',
    failureFlash: 'Login Failed',
    successRedirect: 'account',
    successFlash: 'You are now inside the bank!'
});

exports.logout = (req,res)=>{
    req.logout();
    req.flash('sucess','You are now logged out');
    res.redirect('/');
}

exports.isLoggedIn =(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
        return;
    }
    req.flash('error','You need to login first');
    res.redirect('/login');

};