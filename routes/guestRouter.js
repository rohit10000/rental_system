const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
var path = require('path');

const Rents = require('../models/rents');

const guestRouter = express.Router();

guestRouter.use(bodyParser.json());

guestRouter.route('/rents')
.get((req, res, next) => {
    Rents.find({})
        .then((rents) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(rents);
        }, (err) => next(err))
        .catch((err) => next(err));
});

guestRouter.route('/rents/:rentId')
.get((req, res, next) => {
    Rents.findById(req.params.rentId)
        .then((rent) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(rent);
        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = guestRouter;