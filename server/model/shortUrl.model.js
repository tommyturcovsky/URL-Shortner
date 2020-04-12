const mongoose = require("mongoose")
// Recall how exports work in Node.js?
const ShortUrlSchema = require('./shortUrl.schema').ShortUrlSchema

// Here we are mapping our ShortUrSchema to the model ShortUrlModel.
// If we are interested in referencing the ShortUrlModel model elsewhere,
// we can simply do mongoose.model("ShortUrl") elsewhere
const ShortUrlSchemas = require('./shortUrl.schema')
const ShortUrlModel = mongoose.model("ShortUrl", ShortUrlSchemas);

function insertShortUrl(urlRequest) {
    return ShortUrlModel.create(urlRequest);
}

function getAllShortUrl() {
    return ShortUrlModel.find().exec();
}

// Mongo provides a findById to query for the _id field (and you don't have
// to use the ObjectId class here!
function findShortUrlById(id) {
    return ShortUrlModel.findById(id).exec();
}

function redirectToFullUrl(shortUrl) {
    return ShortUrlModel.findOne({ short: shortUrl })
}

async function updateShortUrl(shortUrlToUpdate, newShortUrl) {
    await ShortUrlModel.findOneAndUpdate({ short: shortUrlToUpdate }, { short: newShortUrl }).exec();
    return ShortUrlModel.findOne({ short: newShortUrl }).exec();
}

function deleteShortUrl(shortUrlToDelete) {
    return ShortUrlModel.deleteOne({ shortUrl: shortUrlToDelete }).exec();
}

// function updateShortUrl(idToUpdate, newValues) {
//     ShortUrlModel.updateOne({ _id: idToUpdate }, newValues).exec();
//     return ShortUrlModel.findById(idToUpdate).exec();
// }

// Make sure to export a function after you create it!
module.exports = {
    insertShortUrl,
    getAllShortUrl,
    findShortUrlById,
    redirectToFullUrl,
    deleteShortUrl,
    updateShortUrl
    // deleteShortUrlById,
    // updateShortUrl
};