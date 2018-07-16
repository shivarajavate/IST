
var express = require('express');
var router = express.Router();
var sessionModel = require('../models/session.js');

router.get('/session/', function (req, res) {
    switch (true) {
        case (req.query.hasOwnProperty("_id")):
            sessionModel
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
            sessionModel
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
            sessionModel
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

router.post('/session/', function (req, res) {
    sessionModel(req.body)
        .save()
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
});

router.put('/session/', function (req, res) {
    switch (true) {
        case (req.query.hasOwnProperty("_id")):
            sessionModel
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
            sessionModel
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

router.delete('/session/', function (req, res) {
    switch (true) {
        case (req.query.hasOwnProperty("_id")):
            sessionModel
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
            sessionModel
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
