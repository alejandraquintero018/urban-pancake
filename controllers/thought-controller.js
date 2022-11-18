const { Thought } = require('../models');

const thoughtController = {
    thoughts(req, res) {
        Thought.find(req.body)
        .select('-__v')
        .then((userDB) => {
            res.json(userDB)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    singleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .populate('friends')
            .populate('reactions')
            .then((userDB) => {
                if (!userDB) {
                    return res.status(404).json({ message: 'This thought does not exist ' });
                }
                res.json(userDB);
            })
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((userDB) => {
                res.json(userDB)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateThought(req, res) { 
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body })
        .then((userDB) => {
            res.json(userDB)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }, 
    deleteThought(req, res) {
        Thought.deleteOne({ _id: req.params.thoughtId })
        .then((userDB) => {
            res.json(userDB)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.thoughtId
        },
            {
                $addToSet: {
                    reactions: req.body
                }
            },
            {
                runValidators: true,
                new: true
            }).then((userDB) => {
                res.json(userDB)
            }).catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }, 
    removeReaction(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.thoughtId
        },
        {
            $pull: {
                reactions: { reactionId: req.params.reactionId }
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
}

module.exports = thoughtController