const { User } = require('../models');

const userController = {
    users(req, res) {
        User.find(req.body)
            .select('-__v')
            .then((userDB) => {
                res.json(userDB);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    singleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((userDB) => {
                if (!userDB) {
                    return res.status(404).json({ message: 'This user does not exist ' });
                }
                res.json(userDB);
            })
    },
    createUser(req, res) {
        User.create(req.body)
            .then((userDB) => {
                res.json(userDB)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, { $set: req.body })
            .then((userDB) => {
                res.json(userDB)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteUser(req, res) {
        User.deleteOne({ _id: req.params.userId })
            .then((userDB) => {
                res.json(userDB)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    addFriend(req, res) {
        User.findOneAndUpdate({
            _id: req.params.userId
        },
            {
                $addToSet: {
                    friends: req.params.friendId
                }
            },
            {
                new: true
            }).then((userDB) => {
                res.json(userDB)
            }).catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    removeFriend(req, res) { 
        User.findOneAndUpdate({
            _id: req.params.userId
        },
        {
            $pull: {
                friends: req.params.friendId
            }
        },
        {
            new: true
        }).then((userDB) => {
            res.json(userDB)
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = userController;

