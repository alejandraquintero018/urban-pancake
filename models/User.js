const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            requiried: [true, 'username is required'],
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
                },
                message: props => `${props.value} is not a valid email.`
            },
            requiried: [true, 'an email is required'],
            unique: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ]
    }, 
    {
        toJSON: {
            virtuals: true, 
        },
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
}); 

const User = model('User', userSchema);

module.exports = User; 