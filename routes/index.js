const express = require('express');
const router = express.Router();
const bankController= require('../controllers/bankController');
const userController= require('../controllers/userController');
const authController= require('../controllers/authController');
const transectionController= require('../controllers/transectionController');
const {catchErrors} = require('../handlers/errorHandlers');

//Welcomo to the website
router.get('/', bankController.homePage );

//Dashboard
router.get('/account', transectionController.dashboard);

//Deposit
router.get('/deposit', authController.isLoggedIn, transectionController.deposit);
//1. Validate the entered amount
//1. Then proceed to deposit
router.post('/deposit', transectionController.validateDeposit, catchErrors(transectionController.makeDeposit));

//Withdraw
router.get('/withdraw', authController.isLoggedIn, transectionController.withdraw);
router.post('/withdraw', transectionController.validateWithdraw, catchErrors(transectionController.makewithdraw));

//Transfer
router.get('/transfer', authController.isLoggedIn, transectionController.transfer);
router.post('/transfer', transectionController.maketransfer, catchErrors(transectionController.makePayeeUpdate));

// Cheque
router.get('/cheque', authController.isLoggedIn, bankController.cheque);
router.post('/cheque', 
    bankController.upload,
    catchErrors(bankController.resize),
    transectionController.validateDeposit,transectionController.makeDeposit,
    catchErrors(bankController.depositCheck)
);

//Registration and Login
router.get('/login',userController.loginForm);
router.post('/login',authController.login);
router.get('/register',userController.registerForm);
//1. Validate the registration data
//2. Register the user
//3. Log the user in
router.post('/register',
userController.validateRegister,
userController.register,
authController.login
);

//ATM
router.get('/atm',authController.isLoggedIn, transectionController.mapPage);
router.post('/atm',transectionController.atmValidate, catchErrors(transectionController.atmWithdraw));


//logout
router.get('/logout', authController.logout);

//Close Account
router.post('/dashboard', userController.deleteUser);

module.exports = router;
