
var express = require('express');
var router = express.Router();
var uisettingModel = require('../models/uisetting.js');

router.get('/uisetting/', function (req, res) {
    switch (true) {
        case (req.query.hasOwnProperty("_id")):
            uisettingModel
                .findById(req.query._id)
                .lean()
                .exec()
                .then(function (data) {
                    res.status(200).send(data);
                })
                .catch(function (error) {
                    res.status(500).send(error);
                });
            break;
        case (req.query.hasOwnProperty("name")):
            uisettingModel
                .findOne({ name: req.query.name })
                .lean()
                .exec()
                .then(function (data) {
                    res.status(200).send(data);
                })
                .catch(function (error) {
                    res.status(500).send(error);
                });
            break;
        default:
            uisettingModel
                .find()
                .lean()
                .exec()
                .then(function (data) {
                    res.status(200).send(data);
                })
                .catch(function (error) {
                    res.status(500).send(error);
                });
    }
});

router.post('/uisetting/', function (req, res) {
    uisettingModel(req.body)
        .save()
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
});

router.put('/uisetting/', function (req, res) {
    switch (true) {
        case (req.query.hasOwnProperty("_id")):
            uisettingModel
                .findByIdAndUpdate(req.query._id, req.body)
                .lean()
                .exec()
                .then(function (data) {
                    res.status(200).send(data);
                })
                .catch(function (error) {
                    res.status(500).send(error);
                });
            break;
        case (req.query.hasOwnProperty("name")):
            uisettingModel
                .findOneAndUpdate({ name: req.query.name }, req.body)
                .lean()
                .exec()
                .then(function (data) {
                    res.status(200).send(data);
                })
                .catch(function (error) {
                    res.status(500).send(error);
                });
            break;
        default:
            res.status(500).send({ error: "'_id' or 'name' parameter missing." })
    }
});

router.delete('/uisetting/', function (req, res) {
    switch (true) {
        case (req.query.hasOwnProperty("_id")):
            uisettingModel
                .findByIdAndRemove(req.query._id)
                .lean()
                .exec()
                .then(function (data) {
                    res.status(200).send(data);
                })
                .catch(function (error) {
                    res.status(500).send(error);
                });
            break;
        case (req.query.hasOwnProperty("name")):
            uisettingModel
                .findOneAndRemove({ name: req.query.name })
                .lean()
                .exec()
                .then(function (data) {
                    res.status(200).send(data);
                })
                .catch(function (error) {
                    res.status(500).send(error);
                });
            break;
        default:
            res.status(500).send({ error: "'_id' or 'name' parameter missing." })
    }
});

module.exports = router;
