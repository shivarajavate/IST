
var mongoose = require('mongoose');

var resourceModel = require('./server/models/resource.js');
var projectModel = require('./server/models/project.js');
var templateModel = require('./server/models/template.js');
var uisettingModel = require('./server/models/uisetting.js');

var resources = require('./app/assets/data/resources.json');
var projects = require('./app/assets/data/projects.json');
var templates = require('./app/assets/data/templates.json');
var uisettings = require('./app/assets/data/uisettings.json');

mongoose.connect('mongodb://localhost/istdb');
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function (callback) {
    console.log("connection to istdb open");

    db.createCollection("resources")
        .then(function () {
            return db.dropCollection("resources");
        })
        .then(function () {
            return db.createCollection("resources");
        })
        .then(function () {

            resources.forEach(function (resource) {

                resourceModel(resource).save()
                    .then(function () {
                        console.log('Success: resource added successfully');
                    })
                    .catch(function (error) {
                        console.log("Error: occured while adding new resource");
                        console.log(error);
                    });
            });
        });

    db.createCollection("projects")
        .then(function () {
            return db.dropCollection("projects");
        })
        .then(function () {
            return db.createCollection("projects");
        })
        .then(function () {

            // projects.forEach(function (project) {

            //     delete project._id;
            //     projectModel(project).save()
            //         .then(function () {
            //             console.log('Success: project added successfully');
            //         })
            //         .catch(function (error) {
            //             console.log("Error: occured while adding new project");
            //             console.log(error);
            //         });
            // });
        });

    db.createCollection("templates")
        .then(function () {
            return db.dropCollection("templates");
        })
        .then(function () {
            return db.createCollection("templates");
        })
        .then(function () {

            templates.forEach(function (template) {

                templateModel(template).save()
                    .then(function () {
                        console.log('Success: template added successfully');
                    })
                    .catch(function (error) {
                        console.log("Error: occured while adding new template");
                        console.log(error);
                    });
            });
        });

    db.createCollection("uisettings")
        .then(function () {
            return db.dropCollection("uisettings");
        })
        .then(function () {
            return db.createCollection("uisettings");
        })
        .then(function () {

            uisettings.forEach(function (uisetting) {

                uisettingModel(uisetting).save()
                    .then(function () {
                        console.log('Success: uisetting added successfully');
                    })
                    .catch(function (error) {
                        console.log("Error: occured while adding new uisetting");
                        console.log(error);
                    });
            });
        });

});
