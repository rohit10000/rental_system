const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
var path = require('path');

var dir = __dirname + '/../public/images/';
console.log(dir);

const Rents = require('../models/rents');

const adminRouter = express.Router();

adminRouter.use(bodyParser.json());

adminRouter.route('/')
.get((req, res, next) => {
    Rents.find({})
        .then((rents) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(rents);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post((req, res, next) => {
    Rents.create(req.body)
        .then((rent) => {
            console.log('Rent Created ', rent);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(rent);

            if (!fs.existsSync(dir + rent._id)) {
                fs.mkdirSync(dir + rent._id);
            }

        }, (err) => next(err))
        .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /admin/rents');
})
.delete((req, res, next) => {
    Rents.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});

adminRouter.route('/:rentId')
.get((req, res, next) => {
    Rents.findById(req.params.rentId)
        .then((rent) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(rent);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /rents/' + req.params.rentId);
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
})
.delete((req, res, next) => {
    Rents.findByIdAndRemove(req.params.rentId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            if (fs.existsSync(dir + req.params.rentId)) {
                fs.rmdirSync(dir + req.params.rentId);
            }
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = adminRouter;