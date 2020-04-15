const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');

const Rents = require('../models/rents');

const rentRouter = express.Router();

rentRouter.use(bodyParser.json());

rentRouter.route('/')
.get((req, res, next) => {
    Rents.find({})
        .then((rents) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(rents);
        }, (err) => next(err))
        .catch((err) => next(err));
});

rentRouter.route('/:rentId')
    .get((req, res, next) => {
        Rents.findById(req.params.rentId)
            .then((rent) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(rent);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        Rents.findByIdAndUpdate(req.params.rentId, {
            $set: req.body
        }, { new: true })
            .then((rent) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(rent);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

rentRouter.route('/:rentId/images')
    .get((req, res, next) => {

        var p = new Promise((resolve, reject) => {

            var imageFolder = __dirname + '/../public/images/' + req.params.rentId+'/';
            fs.readdir(imageFolder, (err, files) => {
                if (err) {
                    var error = new Error('Failed to fetch image files.');
                    reject({ err: error });
                }
                else {
                    var data = {
                        "images": files
                    };

                    resolve(data);
                }
            });
        })
            .then((data) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            }, (err) => next(err))
            .catch((err) => next(err)); 
    });

module.exports = rentRouter;