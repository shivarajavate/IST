
var express = require('express');
var router = express.Router();
var templateModel = require('../models/template.js');

router.get('/template/', function (req, res) {
    switch (true) {
        case (req.query.hasOwnProperty("_id")):
            templateModel
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
            templateModel
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
            templateModel
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

router.post('/template/', function (req, res) {
    templateModel(req.body)
        .save()
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
});

router.put('/template/', function (req, res) {
    switch (true) {
        case (req.query.hasOwnProperty("_id")):
            templateModel
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
            templateModel
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

router.delete('/template/', function (req, res) {
    switch (true) {
        case (req.query.hasOwnProperty("_id")):
            templateModel
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
            templateModel
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
