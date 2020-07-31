const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = express.Router();

router.use(bodyParser.json());

router.route('/getUserId')
    .get((req, res, next) => {

        var p = new Promise((resolve, reject) => {
                if (!req.user) {
                    var err = {
                        'status': 403,
                        'message': 'You are not authenticated.'
                    };
                    resolve(err);
                }
                else {
                    var data = {
                        'user_id': req.user._id,
                        'status': 200
                    }
                    resolve(data);
                }
            
        })
            .then((data) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            }, (err) => next(err))
            .catch((err) => next(err)); 
    });



module.exports = router;