const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
    Favorite.find({ movieId: req.body.movieId }, (err, info) => {
        if (err) return res.json({ success: false, err });
        return res.json({ success: true, favoriteNumber: info.length });
    })
})

router.post('/favorited', (req, res) => {
    Favorite.find({ movieId: req.body.movieId, userFrom: req.body.userFrom }, (err, info) => {
        if (err) return res.json({ success: false, err });

        let result = false;
        if (info.length !== 0) result = true;

        return res.json({ success: true, favorited: result });
    })
})

router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom }, (err, doc) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, doc });
    })
})

router.post('/addFromFavorite', (req, res) => {
    const favorite = new Favorite(req.body);

    favorite.save((err, favorite) => {
        if (err) return res.json({ success: false, err });
        return res.json({ success: true });
    })
})

module.exports = router;
