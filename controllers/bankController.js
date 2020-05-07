const mongoose = require('mongoose');
const Bank= mongoose.model('Bank');
const promisify = require('es6-promisify');
const multer = require('multer');
const jimp = require ('jimp');
const uuid = require('uuid');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if(isPhoto){
            next(null, true);
        } else {
            next({message: 'That File type is not allowed'}, false);
        }
    }
};

exports.upload = multer(multerOptions).single('photo');
   
// check if there is no new file to resize
exports.resize = async (req,res, next) =>{
    if(!req.file){
        next(); // skip to next middleware 
        return;
    }
    const extension = req.file.mimetype.split ('/')[1];
    req.body.photo = `${uuid.v4}.${extension}`;

    //resizing of the photo
    const photo = await jimp.read(req.file.buffer);
    await photo.write(`./public/uploads/${req.body.photo}`);
    //now we have  written on the photo to our file system
    next();
}

exports.homePage = (req, res) =>{
    res.render('index');
}

exports.cheque= (req, res)=>{
    res.render('cheque',{tittle : 'Deposit check'});
}

exports.depositCheck = async(req,res)=>{
    const bank= new Bank(req.body)
    await bank.save();
    res.redirect('/cheque');
}
