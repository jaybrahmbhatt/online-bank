const mongoose = require ('mongoose');
const Schema= mongoose.Schema;
mongoose.Promise=global.Promise;
const slug = require ('slugs');
const mongodbErrorHandler=require('mongoose-mongodb-errors');


const bankSchema = new Schema({
    amount: Number,
    description: {
        type: String,
        trim: true
    },
    photo: String
});

module.exports= mongoose.model('Bank',bankSchema);
