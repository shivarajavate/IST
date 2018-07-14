
var express = require('express');
var router = express.Router();
var projectModel = require('../models/project.js');

router.get('/project/', function (req, res) {
    switch (true) {
        case (req.query.hasOwnProperty("_id")):
            projectModel
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
            projectModel
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
            projectModel
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

router.post('/project/', function (req, res) {
    projectModel(req.body)
        .save()
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
});

router.put('/project/', function (req, res) {
    switch (true) {
        case (req.query.hasOwnProperty("_id")):
            projectModel
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
            projectModel
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

router.delete('/project/', function (req, res) {
    switch (true) {
        case (req.query.hasOwnProperty("_id")):
            projectModel
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
            projectModel
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
