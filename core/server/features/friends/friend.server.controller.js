var Friend = require('./friend.server.model');

exports.postFriend = function (req, res, next) {

    var friend = new Friend(req.body);
    friend.save(function (err) {
        if (err) res.send(err);
        else res.json(friend);
    });
};


exports.getFriends = function (req, res, next) {

    Friend.find({})
        .exec(function (err, friends) {
            if (err) res.status(500).send(err);
            else res.json(friends);
        });
};


exports.getOneFriend = function (req, res, next) {

    Friend.findById(req.params.id)
        .exec(function (err, friend) {
            if (err) res.status(500).send(err);
            else res.json(friend);
        });
};


exports.putFriend = function (req, res, next) {

    Friend.findById(req.params.id)
        .exec(function (err, friend) {
            if (err) res.status(500).send(err);
            else {
                friend.name = req.body.name;
                friend.save();
                res.json(friend);
            }
        });
};


exports.deleteFriend = function (req, res, next) {

    Friend.findById(req.params.id)
        .remove(function (err) {
            if (err) res.status(500).send(err);
            else res.status(204).send('Removed');
        });
};