const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    its: {
        type: String,
        required: true
    },
    a: {
        assigned: {
            type: Boolean,
            default: false
        },
        name: {
            type: String
        }
    },
    b: {
        assigned: {
            type: Boolean,
            default: false
        },
        name: {
            type: String
        }
    }
});

module.exports = User = mongoose.model('user', UserSchema);