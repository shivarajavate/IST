
var express = require('express');
var router = express.Router();
var resourceModel = require('../models/resource.js');

router.get('/resource/', function (req, res) {
    switch (true) {
        case (req.query.hasOwnProperty("_id")):
            resourceModel
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
            resourceModel
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
            resourceModel
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

router.post('/resource/', function (req, res) {
    resourceModel(req.body)
        .save()
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
});

router.put('/resource/', function (req, res) {
    switch (true) {
        case (req.query.hasOwnProperty("_id")):
            resourceModel
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
            resourceModel
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

router.delete('/resource/', function (req, res) {
    switch (true) {
        case (req.query.hasOwnProperty("_id")):
            resourceModel
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
            resourceModel
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
