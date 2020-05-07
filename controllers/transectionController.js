const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.deposit= (req,res)=>{
    res.render('deposit', {title:'Deposit' });
}

exports.validateDeposit= (req,res,next)=>{
    req.checkBody('amount','Please enter an amount greater than zero').notEmpty().isInt({gt:0});
    const errors= req.validationErrors();
    if (errors) {
        req.flash('error',errors.map(err=>err.msg));
        res.redirect('back');
        return;
    }
    next();
}
exports.makeDeposit= async (req,res,next) =>{
    const userData = await User.findOne({email: req.body.email});
    const updates = {
        amount: (parseInt (req.body.amount) + parseInt (userData.amount))
    };
    const user=  await User.findOneAndUpdate(
        { _id: req.user._id},
        { $set: updates},
        { new: true, context: 'query'}
        )
    await req.flash('success','Successfully deposited money');
    res.redirect('/account');
}

exports.withdraw= (req,res)=>{
    res.render('withdraw',{title: 'Withdraw'});
}
exports.validateWithdraw= async (req,res,next)=>{
     req.checkBody('amount','Please enter an amount greater than zero and less the available money').notEmpty().isInt({gt:0}).isInt({lt:req.body.currentAmount});
     //req.checkBody('amount','Please enter an amount less than Currently available money').isInt({lt:req.body.currentAmount});
     const errors= req.validationErrors();
    if (errors) {
        req.flash('error',errors.map(err=>err.msg));
        res.redirect('back');
        return;
    }
    next();
}

exports.makewithdraw = async (req,res,next) =>{
    const userData = await User.findOne({email: req.body.email});
    const updates = {
        amount: (parseInt (userData.amount)-parseInt  (req.body.amount) )
    };
    const user=  await User.findOneAndUpdate(
        { _id: req.user._id},
        { $set: updates},
        { new: true, context: 'query'}
        )
    await req.flash('success','Successfully Withdrawn money');
    res.redirect('/account');
}

exports.transfer= (req,res)=>{
    res.render('transfer',{title:'Transfer'});
}

exports.validateTransfer= async( req,res,next) =>{
    req.checkBody('amount','Please enter an amount less than Currently available money').isInt({lt:req.body.currentAmount});
    const errors= req.validationErrors();
    if (errors) {
        req.flash('error',errors.map(err=>err.msg));
        res.redirect('back');
        return;
    }
    next();
}

exports.maketransfer = async (req,res,next) =>{
    const payeeData= await User.findOne({email:req.body.email});
    if (payeeData) {
        const payerData= await User.findOne({email:req.body.emailOfPayer});
    const payerUpdates = {
        amount: (parseInt (payerData.amount)- parseInt (req.body.amount))
    };

    const payer= await User.findOneAndUpdate(
        { _id: req.user._id},
        {$set: payerUpdates},
        {new: true, multi:true, context: 'query'}
    )
    next();
    }
    else{
        req.flash('error','Please enter valid payee details');
    res.redirect('back');
    }
    
}

exports.makePayeeUpdate = async(req,res,next)=>{
    const payeeData= await User.findOne({email:req.body.email});
    payeeData.amount= parseInt (payeeData.amount) + parseInt (req.body.amount);
    const payee= await User.replaceOne(
        {_id: payeeData._id},
        {$set:payeeData}
    )
    req.flash('success','Successfully Transfered money');
    res.redirect('back');
    
}

exports.dashboard= async(req,res)=>{
    res.render('dashboard', {title: 'Dashboard'});
   
}

exports.mapPage= (req,res)=>{
    res.render('atm',{title: 'ATM'});
}

exports.atmValidate= async (req,res,next)=>{
    req.checkBody('amount','Please enter an amount greater than zero and less the available money').notEmpty().isInt({gt:0}).isInt({lt:req.body.currentAmount});
    const errors= req.validationErrors();
   if (errors) {
       req.flash('error',errors.map(err=>err.msg));
       res.redirect('back');
       return;
   }
   next();
}
exports.atmWithdraw= async (req,res,next) =>{
    const userData = await User.findOne({email: req.body.email});
    const updates = {
        amount: (parseInt (userData.amount)-parseInt  (req.body.amount) )
    };
    const user=  await User.findOneAndUpdate(
        { _id: req.user._id},
        { $set: updates},
        { new: true, context: 'query'}
        )
    await req.flash('success','Successfully Withdrawn money');
    res.redirect('/account');
}