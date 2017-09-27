var express = require('express');

var routes;
routes = function (Asset) {
    var appRouter = express.Router();
    appRouter.route('/Assets')
        .post(function (req, res) {
            var asset = new Asset(req.body);
            console.log(asset);
            asset.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            res.status(201).send(asset);
        })
        .get(function (req, res) {
            var query = req.query;
            if (query.name) {
                var exps = {name: {'$regex': query.name, '$options':'i'}}
            } else {
                var exps = query;
            }

            Asset.find(exps, function (err, assets) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json((assets));
                }
            });
        });

    appRouter.use('/Asset/:assetId', function (req, res, next) {
        Asset.findById(req.params.assetId, function (err, asset) {
            if (err) {
                res.status(500).send(err);
            } else if (asset) {
                req.asset = asset;
                next();
            } else {
                res.status(404).send('No Asset Found');
            }
        });
    });

    appRouter.route('/Assets/:assetId')
        .get(function (req, res) {
            res.json(req.asset);
        })
        /*.put(function (req, res) {
         req.trail.name = req.body.name;
         req.trail.description = req.body.description;
         req.trail.distance = req.body.distance;
         req.trail.difficulty = req.body.difficulty;
         req.trail.tags = req.body.tags;
         req.trail.photos = req.body.photos;
         req.trail.save();
         res.json(req.trail);

         })*/
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }

            if(req.body.photos){
                console.log("I am here.");
                console.log(req.body.photos);
            }

            for (var p in req.body) {
                req.asset[p] = req.body[p];
            }

            console.log(req.asset);

            req.asset.save(function (err) {
                if (err)
                    res.statusCode(500).send(err);

                res.send(req.asset);
            });

        });
    return appRouter;
};

module.exports = routes;
