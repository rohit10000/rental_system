const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Users = require('../models/users');

const userRouter = express.Router();
userRouter.use(bodyParser.json());


userRouter.route('/:userId')
    .get((req, res, next) => {
        Users.findById(req.params.userId)
            .then((rent) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(rent);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = userRouter;