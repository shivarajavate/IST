
var mongoose = require('mongoose');

var sessionSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        project: {
            type: Object,
            required: true
        }
    }
);

module.exports = mongoose.model('session', sessionSchema);
