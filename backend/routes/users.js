/**
 * User Route
 *
 * Methods:
 * GET /users
 * GET /users/:id
 * POST /users
 * PUT /users/:id
 * DELETE /users
 * DELETE /users/:id
 */

var express = require('express');
var router = express.Router();

var User = require('../model/user');

/**
 * GET /users
 */
router.get('/', (req, res) => {
    User.find({}, (err, users) => {

        if (err) {
            res.end(err);
        }

        res.contentType('application/json');
        res.json(users);
    });
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
});

/**
 * POST /users
 */
router.post('/', (req, res) => {

    var newUser = new User(req.body);

    newUser.save((err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.json({message: 'user created', user});
        }
    });

});

/**
 * DELETE /users
 */
router.delete('/', (req, res) => {

    User.remove({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json({message: 'deleted all users', user: result});
        }
    });
});

/**
 * DELETE /users/:id
 */
router.delete('/:id', (req, res) => {
    let id = req.params.id;

    User.findByIdAndRemove({'_id': id}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json({message: 'deleted user with id' + id, result});
        }

    });
});

module.exports = router;
