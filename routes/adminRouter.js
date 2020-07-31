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

adminRouter.route('/rents')
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
.delete((req, res, next) => {
    Rents.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});


module.exports = adminRouter;