const express = require('express');
const router = express.Router();

const ShortUrlAccessor = require('../model/shortUrl.model');

router.get('/', async (req, res) => {
    return await ShortUrlAccessor.getAllShortUrl()
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding ShortUrl:${error}`));
});

router.post('/', async (req, res) => {
    // NOTE: because we're using Mongoose, it will
    // filter out any data that we DON'T want
    // So we can safely pass it the entire body
    return await ShortUrlAccessor.insertShortUrl(req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error finding ShortUrl:${error}`))
});

router.get('/:id', async function (req, res) {
    return await ShortUrlAccessor.findShortUrlById(req.params.id)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding ShortUrl:${error}`));
});

router.get('/url/:shortUrl', async (req, res) => {
    return await ShortUrlAccessor.redirectToFullUrl(req.params.shortUrl)
    .then((response) => res.redirect(response.full, 302),
        (error) =>  response.status(404).send(`Error finding ShortUrl:${error}`));
})

// router.delete('/:id', function (req, res) {
//     return ShortUrlAccessor.deleteShortUrlById(req.params.id)
//         .then((response) => res.status(200).send(response),
//         (error) =>  res.status(404).send(`Error deleting ShortUrl:${error}`));
// })

// router.put('/:id', function (req, res) {
//     return ShortUrlAccessor.updateShortUrl(req.params.id, req.body)
//         .then((response) => res.status(200).send(response),
//         (error) =>  res.status(404).send(`Error deleting ShortUrl:${error}`));
// })

module.exports = router;