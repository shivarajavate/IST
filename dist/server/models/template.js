
var mongoose = require('mongoose');

var templateSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        levels: {
            type: Array,
            default: []
        }
    },
    {
        minimize: false
    }
);

module.exports = mongoose.model('Template', templateSchema);
