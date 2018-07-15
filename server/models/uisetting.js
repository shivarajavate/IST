
var mongoose = require('mongoose');

var uisettingSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        views: {
            type: Array,
            default: [
                {
                    key: "RECON",
                    name: "reconWorkspace",
                    canvasName: "reconWorkspaceCanvas",
                    styles: {
                        workspace: {

                        },
                        level: {

                        },
                        section: {

                        },
                        board: {

                        }
                    },
                    properties: {
                        workspace: {

                        },
                        level: {

                        },
                        section: {

                        },
                        board: {

                        }
                    }
                },
                {
                    key: "SEARCH",
                    name: "searchWorkspace",
                    canvasName: "searchWorkspaceCanvas",
                    styles: {
                        workspace: {

                        },
                        level: {

                        },
                        section: {

                        },
                        board: {

                        }
                    },
                    properties: {
                        workspace: {

                        },
                        level: {

                        },
                        section: {

                        },
                        board: {

                        }
                    }
                },
                {
                    key: "MINDMAP",
                    name: "mindMap",
                    canvasName: "mindMapNetworkCanvas",
                    options: {

                    }
                }
            ]
        }
    },
    {
        minimize: false
    }
);

module.exports = mongoose.model('uisetting', uisettingSchema);
