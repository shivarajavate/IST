
var mongoose = require('mongoose');

var projectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        session: {
            type: Number,
            default: 0
        },
        tasks: {
            type: Array,
            default: []
        },
        details: {
            type: Object,
            default: {
                "levels": [
                    {
                        "name": "User",
                        "sections": []
                    },
                    {
                        "name": "Deployment",
                        "sections": [
                            {
                                "name": "User Type",
                                "notes": []
                            },
                            {
                                "name": "Other Systems",
                                "notes": []
                            },
                            {
                                "name": "Migration",
                                "notes": []
                            },
                            {
                                "name": "Installation",
                                "notes": []
                            },
                            {
                                "name": "Setup",
                                "notes": []
                            }
                        ]
                    },
                    {
                        "name": "Attributes",
                        "sections": [
                            {
                                "name": "Performance",
                                "notes": []
                            },
                            {
                                "name": "Volume",
                                "notes": []
                            },
                            {
                                "name": "Security",
                                "notes": []
                            },
                            {
                                "name": "Load/Stress",
                                "notes": []
                            },
                            {
                                "name": "Reliability",
                                "notes": []
                            },
                            {
                                "name": "Usability",
                                "notes": []
                            }
                        ]
                    },
                    {
                        "name": "Environment",
                        "sections": [
                            {
                                "name": "HW/Devices",
                                "notes": []
                            },
                            {
                                "name": "OS Browsers",
                                "notes": []
                            },
                            {
                                "name": "Comm Interface",
                                "notes": []
                            }
                        ]
                    },
                    {
                        "name": "Flow",
                        "sections": [
                            {
                                "name": "Requirements",
                                "notes": []
                            },
                            {
                                "name": "Behaviour Settings",
                                "notes": []
                            }
                        ]
                    },
                    {
                        "name": "Behaviour",
                        "sections": [
                            {
                                "name": "Features",
                                "notes": []
                            },
                            {
                                "name": "Access Control",
                                "notes": []
                            }
                        ]
                    },
                    {
                        "name": "Structure",
                        "sections": [
                            {
                                "name": "Architecture",
                                "notes": []
                            },
                            {
                                "name": "Interface",
                                "notes": []
                            }
                        ]
                    },
                    {
                        "name": "Interface",
                        "sections": [
                            {
                                "name": "Architecture",
                                "notes": []
                            },
                            {
                                "name": "Interface",
                                "notes": []
                            }
                        ]
                    },
                    {
                        "name": "Input",
                        "sections": [
                            {
                                "name": "Architecture",
                                "notes": []
                            },
                            {
                                "name": "Interface",
                                "notes": []
                            }
                        ]
                    }
                ],
                "jottings": [
                    "jottings"
                ],
                "notes": [
                    "note 1",
                    "note 2"
                ],
                "questions": [
                    "any questions ?"
                ]
            }
        },
        templateName: {
            type: String,
            required: true
        },
        uisettingName: {
            type: String,
            default: "default"
        },
        createdBy: {
            type: String,
            required: true
        },
        createdOn: {
            type: Date,
            default: Date.now
        },
        lastModifiedBy: {
            type: String,
            required: true
        },
        lastModifiedOn: {
            type: Date,
            default: Date.now
        }
    },
    {
        minimize: false
    }
);

module.exports = mongoose.model('project', projectSchema);
