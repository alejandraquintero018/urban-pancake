const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction'); 
const dateFormat = require('../utils/dateFormat')

const thoughtSchema = new Schema( 
    {
       thoughtText: {
        type: String,
        required: true, 
        max_length: 280, 
        min_length: 1
        },
        createdAt: {
            type: Date,
            Default: Date.now(),
            get: timestamp => dateFormat(timestamp),
            toJSON: {
                getters: true
            },
            id: false
        }, 
        userName: {
            type: String,
            required: true, 
        },
        reactions: [reactionSchema]
    }, 
); 

thoughtSchema.virtual('getReactions').get(function() {
    return this.reactions.length; 
}); 

const Thought = model('Thought', thoughtSchema); 

module.exports = Thought; 