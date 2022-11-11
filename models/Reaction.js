const { ObjectId } = require('bson');
const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId()
        }, 
        reactionBody: {
            type: String,
            required: true, 
            max_length: 280,
        }, 
        username: {
            type: String, 
            required: true, 
        },
        createdAt: {
            type: Date, 
            default: Date.now, 
            get: timestamp => dateFormat(timestamp)
        }
    }, 
    {
        toJSON: {
            getters: true,  
        },
        _id: false
    }
); 

module.exports = reactionSchema; 