// We are using the Schema Class here
// This allows us to declare specifically what is IN the
// document and what is not
const Schema = require('mongoose').Schema;
const uniqueValidator = require('mongoose-unique-validator');
const shortId = require('shortid');


const ShortUrlSchema = new Schema({
    // mongoose automically gives this an _id attribute of ObjectId
    full: String,
    short: {
        type: String,
        required: true,
        unique: true,
        default: shortId.generate
    }
// this explicitly declares what collection we're using
}, { collection: 'shortUrls' });

ShortUrlSchema.plugin(uniqueValidator);
module.exports = ShortUrlSchema;