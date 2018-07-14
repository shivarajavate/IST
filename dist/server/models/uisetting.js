
var mongoose = require('mongoose');

var uisettingSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        value: {
            type: Object,
            default: {
                styles: {
                    workspace: {},
                    level: {},
                    section: {},
                    board: {}
                },
                properties: {
                    workspace: {},
                    level: {},
                    section: {},
                    board: {}
                }
            }
        }
    },
    {
        minimize: false
    }
);

module.exports = mongoose.model('uisetting', uisettingSchema);
