
var express = require('express');
var app = express();
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var projectRouter = require('./server/routers/project.js');
var templateRouter = require('./server/routers/template.js');
var uisettingRouter = require('./server/routers/uisetting.js');
var resourceRouter = require('./server/routers/resource.js');

app.use(bodyParser.json());

app.use(logger('dev'));
mongoose.connect('mongodb://localhost/istdb');

app.use('/', express.static(path.join(__dirname, '/app')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/app/index.html'));
});

app.use('/ist/api', projectRouter);
app.use('/ist/api', templateRouter);
app.use('/ist/api', uisettingRouter);
app.use('/ist/api', resourceRouter);

app.listen(8000, function (req, res) {
    console.log('Server is running on port 8000...');
});