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
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
var appRouter = express.Router();

appRouter.route('/Trails')
    .post(function (req, res) {
        var trail = new Trail(req.body);
        console.log(trail);
        trail.save(function (err) {
            if(err){
                console.log(err);
            }
        });
        res.status(201).send(trail);

    })
    .get(function (req, res) {
        var query = req.query;
        Trail.find({name:{$regex: query.name}}, function (err, trails) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json((trails));
            }
        });
    });

appRouter.route('/Trails/:trailId')
.get(function(req,res){
       Trail.findById(req.params.trailId, function(err, trail){
          if(err){
              res.status(500).send(err);
          } else {
              res.json(trail);
          }
       });
    });

app.use('/api', appRouter);

app.get('/', function (req, res) {
    appRouter.redirect('/Trails');
});

app.listen(port, function () {
    console.log('Running on PORT:' + port);
});

