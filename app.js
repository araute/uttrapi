/**
 * Created by Akshat on 9/24/2017.
 */

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = mongoose.connect("mongodb://himalayantrails:tBAePWA4ib2M0l324vwPX7XklThxtJi4GOYLt7zWrvjaZNP5A1C8CxXbixBDUF9SJz8yGUadUoEYeGpomBZvDA==@himalayantrails.documents.azure.com:10255/?ssl=true&replicaSet=globaldb");
var Trail = require('./models/trailModel');
var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({limit:'5mb', extended: true}));
app.use(bodyParser.json({limit: '5mb'}));
appRouter = require('./Routes/appRoutes')(Trail);
app.use('/api', appRouter);
app.get('/', function (req, res) {
    appRouter.redirect('/Trails');
});
app.listen(port, function () {
    console.log('Running on PORT:' + port);

});

