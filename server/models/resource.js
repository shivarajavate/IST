
var mongoose = require('mongoose');

var resourceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        value: {
            type: Object,
            default: {
                "en": {},
                "fr": {}
            }
        }
    },
    {
        minimize: false
    }
);

module.exports = mongoose.model('resource', resourceSchema);
