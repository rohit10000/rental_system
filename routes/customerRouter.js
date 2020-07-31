const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
var path = require('path');

const Users = require('../models/users');

const customerRouter = express.Router();

customerRouter.use(bodyParser.json());

customerRouter.route('/user/:userId')
.get((req, res, next) => {
    Users.findById(req.params.userId)
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.put((req, res, next) => {
   Users.findByIdAndUpdate(req.params.userId,
       {$set: req.body}, {new: true})
       .then((user)=>{
           res.statusCode = 200;
           res.setHeader('Content-Type', 'application/json');
           res.json(user);
       }, (err) => next(err))
       .catch((err) => next(err));
});

module.exports = customerRouter;