const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const MemberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 0
    },
    list: [ 
        {
            type: Schema.ObjectId,
            ref: 'user'
        }     
    ]
});

module.exports = Member = mongoose.model('member', MemberSchema);