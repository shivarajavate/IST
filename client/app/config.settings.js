
// Templates: [{
//     "title": "User Type",
//     "lines": [{
//             "element": [{
//                     "type": "LABEL",
//                     "value": "My name is "
//                 },
//                 {
//                     "type": "VALUE-CHARSTRING",
//                     "value": "Enter your name"
//                 }
//             ]
//         },
//         {
//             "element": [{
//                     "type": "LABEL",
//                     "value": "Choose city"
//                 },
//                 {
//                     "type": "VALUE-LIST",
//                     "value": [
//                         "BLR",
//                         "CEN",
//                         "DEL"
//                     ]
//                 }
//             ]
//         }
//     ]

// },
// {
//     "title": "Performance",
//     "lines": [{
//             "element": {
//                 "type": "LABEL",
//                 "value": "Time not gt than:"
//             }
//         },
//         {
//             "element": {
//                 "type": "VALUE-NUMSTRING",
//                 "value": "10"
//             }
//         }
//     ]
// }
// ]

const UISettings = {
    Styles: {
        Session: {
            scrollLeftButtonRect: {
                fill: 'hsl(59, 100%, 77%)',
                stroke: 'hsl(165, 53%, 81%)',
                shadowColor: 'black',
                shadowblur: 5,
                strokeWidth: 2
            },
            scrollLeftButtonText: {
                fontSize: 10,
                fontFamily: 'Verdana',
                fill: 'black',
                align: 'center',
                fontStyle: 'bold'
            },
            wsNameRect: {
                fill: "#ccc",
                stroke: 'hsl(165, 53%, 81%)',
                shadowColor: 'black',
                shadowblur: 5,
                strokeWidth: 2
            },
            wsNameText: {
                fontSize: 14,
                fontFamily: 'Verdana',
                fill: '#555',
                align: 'center'
            },
            scrollRightButtonRect: {
                fill: 'hsl(59, 100%, 77%)',
                stroke: 'hsl(165, 53%, 81%)',
                shadowColor: 'black',
                shadowblur: 5,
                strokeWidth: 2
            },
            scrollRightButtonText: {
                fontSize: 10,
                fontStyle: 'bold',
                fontFamily: 'Verdana',
                fill: 'black',
                align: 'center'
            }
        },
        Level: {
            boardViewRect: {
                fill: "white",
                stroke: 'hsl(165, 53%, 81%)',
                shadowColor: 'black',
                shadowblur: 5,
                strokeWidth: 2
            },
            scrollLeftButtonRect: {
                fill: 'hsl(59, 100%, 77%)',
                stroke: 'hsl(165, 53%, 81%)',
                shadowColor: 'black',
                shadowblur: 5,
                strokeWidth: 2
            },
            scrollLeftButtonText: {
                fontSize: 10,
                fontFamily: 'Verdana',
                fill: 'black',
                align: 'center',
                fontStyle: 'bold'
            },
            scrollRightButtonRect: {
                fill: 'hsl(59, 100%, 77%)',
                stroke: 'hsl(165, 53%, 81%)',
                shadowColor: 'black',
                shadowblur: 5,
                strokeWidth: 2
            },
            scrollRightButtonText: {
                fontSize: 10,
                fontStyle: 'bold',
                fontFamily: 'Verdana',
                fill: 'black',
                align: 'center'
            },
            levelIDRect: {
                fill: "#ccc",
                stroke: 'hsl(165, 53%, 81%)',
                shadowColor: 'black',
                shadowblur: 5,
                strokeWidth: 2
            },
            levelIDText: {
                fontSize: 18,
                fontFamily: 'Verdana',
                fill: '#555',
                align: 'center'
            },
            levelNameRect: {
                fill: "#ccc",
                stroke: 'hsl(165, 53%, 81%)',
                shadowColor: 'black',
                shadowblur: 5,
                strokeWidth: 2
            },
            levelNameText: {
                fontSize: 14,
                fontFamily: 'Verdana',
                fill: '#555',
                align: 'center'
            }
        },
        Section: {
            secNameRect: {
                fill: "#E4F4D8",
                stroke: 'hsl(165, 53%, 81%)',
                shadowColor: 'black',
                shadowblur: 5,
                strokeWidth: 2

            },
            secNameText: {
                fontSize: 10,
                fontFamily: 'Verdana',
                fill: '#555',
                fontStyle: 'bold',
                align: 'center'
            },
            addButtonRect: {

                fill: 'hsl(59, 100%, 77%)',
                stroke: 'hsl(165, 53%, 81%)',
                shadowColor: 'black',
                shadowblur: 5,
                strokeWidth: 2
            },
            addButtonText: {
                fontSize: 12,
                fontFamily: 'Verdana',
                fill: '#555',
                align: 'center',
                fontStyle: 'bold'
            },
            deleteButtonRect: {
                fill: 'hsl(59, 100%, 77%)',
                stroke: 'hsl(165, 53%, 81%)',
                shadowColor: 'black',
                shadowblur: 5,
                strokeWidth: 2
            },
            deleteButtonText: {
                fontSize: 12,
                fontFamily: 'Verdana',
                fill: '#555',
                align: 'center',
                fontStyle: 'bold'
            },
            scrollLeftButtonRect: {
                fill: 'hsl(59, 100%, 77%)',
                stroke: 'hsl(165, 53%, 81%)',
                shadowColor: 'black',
                strokeWidth: 2
            },
            scrollLeftButtonText: {
                fontSize: 10,
                fontStyle: 'bold',
                fontFamily: 'Verdana',
                shadowblur: 5,
                fill: 'black',
                align: 'center'
            },
            scrollBar: {
                fill: 'hsl(4, 3%, 76%)',
                stroke: 'hsl(165, 53%, 81%)',
                shadowColor: 'black',
                strokeWidth: 2
            },
            scrollRightButtonRect: {
                fill: 'hsl(59, 100%, 77%)',
                stroke: 'hsl(165, 53%, 81%)',
                shadowColor: 'black',
                strokeWidth: 2
            },
            scrollRightButtonText: {
                fontSize: 10,
                fontStyle: 'bold',
                fontFamily: 'Verdana',
                shadowblur: 5,
                fill: 'black',
                align: 'center'
            },
            boardViewRect: {
                fill: 'rgb(240, 240, 240)',
                stroke: 'hsl(165, 53%, 81%)',
                shadowColor: 'black',
                shadowblur: 5,
                strokeWidth: 2
            },
            konvaRect: {
                fill: 'hsl(29, 95%, 76%)',
                shadowColor: 'black',
                shadowblur: 5,
                strokeWidth: 2
            },
            konvaText: {
                fontSize: 10,
                fontFamily: 'Verdana',
                fill: '#555',
                align: 'center'
            },
            selectedKonvaRect: {
                fill: 'hsl(9, 1%, 69%)',
                stroke: 'hsl(165, 53%, 81%)',
                shadowColor: 'black',
                shadowblur: 5,
                strokeWidth: 2
            }
        }
    },
    Properties: {
        Session: {
            skeleton: {
                wPct: 100,
                hPct: 100
            },
            scrollLeftButtonRect: {
                wPct: 10,
                hPct: 2.8
            },
            scrollLeftButtonText: {
                wPct: 10,
                hPct: 2.8
            },
            wsNameRect: {
                wPct: 80,
                hPct: 2.8
            },
            wsNameText: {
                wPct: 80,
                hPct: 2.8
            },
            scrollRightButtonRect: {
                wPct: 10,
                hPct: 2.8
            },
            scrollRightButtonText: {
                wPct: 10,
                hPct: 2.8
            }
        },
        Level: {
            skeleton: {
                wPct: 100,
                hPct: 10.8
            },
            boardViewRect: {
                wPct: 90,
                hPct: 100
            },
            scrollLeftButtonRect: {
                wPct: 2,
                hPct: 50
            },
            scrollLeftButtonText: {
                wPct: 2,
                hPct: 50
            },
            scrollRightButtonRect: {
                wPct: 2,
                hPct: 50
            },
            scrollRightButtonText: {
                wPct: 2,
                hPct: 50
            },
            levelIDRect: {
                wPct: 8,
                hPct: 20
            },
            levelIDText: {
                wPct: 8,
                hPct: 20
            },
            levelNameRect: {
                wPct: 8,
                hPct: 80
            },
            levelNameText: {
                wPct: 8,
                hPct: 80
            }
        },
        Section: {
            skeleton: {
                wPct: 18,
                hPct: 100
            },
            secNameRect: {
                wPct: 84,
                hPct: 15
            },
            secNameText: {
                wPct: 84,
                hPct: 15
            },
            addButtonRect: {
                wPct: 8,
                hPct: 15
            },
            addButtonText: {
                wPct: 8,
                hPct: 15
            },
            deleteButtonRect: {
                wPct: 8,
                hPct: 15
            },
            deleteButtonText: {
                wPct: 8,
                hPct: 15
            },
            scrollLeftButtonRect: {
                wPct: 8,
                hPct: 15
            },
            scrollLeftButtonText: {
                wPct: 8,
                hPct: 15
            },
            scrollBar: {
                wPct: 84,
                hPct: 15
            },
            scrollRightButtonRect: {
                wPct: 8,
                hPct: 15
            },
            scrollRightButtonText: {
                wPct: 8,
                hPct: 15
            },
            boardViewRect: {
                wPct: 100,
                hPct: 70
            },
            board: {
                w: 50,
                h: 15
            }
        }
    }
}

const templateJSON = {
    version: "1.0", 
    workspace: [
        // LEVEL 9
        {
            number: "L9",
            name: "LEVEL 9",
            section: {
                "RECON": [
                    {
                        name: "User Type",
                        lines: [
                            {
                                element:
                                    [
                                        {
                                            type: "LABEL",
                                            value: "My name is "
                                        },
                                        {
                                            type: "VALUE-CHARSTRING",
                                            name: "id_name",
                                            value: "Enter your name"
                                        }
                                    ]
                            },
                            {
                                element:
                                    [
                                        {
                                            type: "LABEL",
                                            value: "Choose city"
                                        },
                                        {
                                            type: "VALUE-LIST",
                                            value: [
                                                "BLR",
                                                "CEN",
                                                "DEL"
                                            ]
                                        }
                                    ]
                            }
                        ]
                    },
                    {
                        name: "Performance",
                        lines: [
                            {
                                element:
                                    [
                                        {
                                            type: "LABEL",
                                            value: "Time not gt than:"
                                        },
                                        {
                                            type: "VALUE-NUMSTRING",
                                            value: "10"
                                        }
                                    ]
                            }
                        ]
                    },
                    {
                        name: "Environment",
                        lines: [
                            {
                                element:
                                    [
                                        {
                                            type: "LABEL",
                                            value: "My name is "
                                        },
                                        {
                                            type: "VALUE-CHARSTRING",
                                            value: "Enter your name"
                                        }
                                    ]
                            },
                            {
                                element:
                                    [
                                        {
                                            type: "LABEL",
                                            value: "Choose city"
                                        },
                                        {
                                            type: "VALUE-LIST",
                                            value: [
                                                "BLR",
                                                "CEN",
                                                "DEL"
                                            ]
                                        }
                                    ]
                            }
                        ]
                    },
                    {
                        name: "User Type 1",
                        lines: [
                            {
                                element:
                                    [
                                        {
                                            type: "LABEL",
                                            value: "Time not gt than:"
                                        },
                                        {
                                            type: "VALUE-NUMSTRING",
                                            value: "10"
                                        }
                                    ]
                            }
                        ]
                    },
                    {
                        name: "User Type 2",
                        lines: [
                            {
                                element:
                                    [
                                        {
                                            type: "LABEL",
                                            value: "Time not gt than:"
                                        },
                                        {
                                            type: "VALUE-NUMSTRING",
                                            value: "10"
                                        }
                                    ]
                            }
                        ]
                    },
                    {
                        name: "User Type 3",
                        lines: [
                            {
                                element:
                                    [
                                        {
                                            type: "LABEL",
                                            value: "Time not gt than:"
                                        },
                                        {
                                            type: "VALUE-NUMSTRING",
                                            value: "10"
                                        }
                                    ]
                            }
                        ]
                    }
                ],
                "SEARCH": [
                    {
                        name: "User Type",
                        lines: [
                            {
                                element: [
                                    {
                                        type: "LABEL",
                                        value: "My name is "
                                    },
                                    {
                                        type: "VALUE-CHARSTRING",
                                        value: "Enter your name"
                                    }
                                ]
                            },
                            {
                                element: [
                                    {
                                        type: "LABEL",
                                        value: "Choose city"
                                    },
                                    {
                                        type: "VALUE-LIST",
                                        value: [
                                            "BLR",
                                            "CEN",
                                            "DEL"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        // LEVEL 8
        {
            number: "L8",
            name: "LEVEL 8",
            section: {
                "RECON": [
                    {
                        name: "User Type",
                        lines: [
                            {
                                element: [
                                    {
                                        type: "LABEL",
                                        value: "My name is "
                                    },
                                    {
                                        type: "VALUE-CHARSTRING",
                                        value: "Enter your name"
                                    }
                                ]
                            },
                            {
                                element: [
                                    {
                                        type: "LABEL",
                                        value: "Choose city"
                                    },
                                    {
                                        type: "VALUE-LIST",
                                        value: [
                                            "BLR",
                                            "CEN",
                                            "DEL"
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: "Performance",
                        lines: [
                            {
                                element: [
                                    {
                                        type: "LABEL",
                                        value: "Time not gt than:"
                                    },
                                    {
                                        type: "VALUE-NUMSTRING",
                                        value: "10"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: "Environment",
                        lines:
                            [
                                {
                                    element: [
                                        {
                                            type: "LABEL",
                                            value: "My name is "
                                        },
                                        {
                                            type: "VALUE-CHARSTRING",
                                            value: "Enter your name"
                                        }
                                    ]
                                },
                                {
                                    element: [
                                        {
                                            type: "LABEL",
                                            value: "Choose city"
                                        },
                                        {
                                            type: "VALUE-LIST",
                                            value: [
                                                "BLR",
                                                "CEN",
                                                "DEL"
                                            ]
                                        }
                                    ]
                                }
                            ]
                    }
                ],
                "SEARCH": [

                ]
            }
        }
    ]
};

const projectJSON = {
    workspace: [
        // LEVEL 9
        {
            name: "LEVEL 9",
            value: {
                "RECON": [
                    {
                        name: "User Type",
                        value: [
                            { noteText: "Note 1" }
                        ]
                    },
                    {
                        name: "Performance",
                        value: [
                            { noteText: "Note 2" }
                        ]
                    },
                    {
                        name: "Environment",
                        value: [
                            { noteText: "Note 3" }
                        ]
                    },
                    {
                        name: "User Type 1",
                        value: [
                            { noteText: "Note 4" }
                        ]
                    },
                    {
                        name: "User Type 2",
                        value: [
                            { noteText: "Note 4" }
                        ]
                    },
                    {
                        name: "User Type 3",
                        value: [
                            { noteText: "Note 4" }
                        ]
                    }
                ],
                "SEARCH": [
                    {
                        name: "User Type",
                        value: [
                        ]
                    }
                ]
            }
        },
        // LEVEL 8
        {
            name: "LEVEL 8",
            value: {
                "RECON": [
                    {
                        name: "User Type",
                        value: [
                            { noteText: "Note 1" }
                        ]
                    },
                    {
                        name: "Performance",
                        value: [
                            { noteText: "Note 2" }
                        ]
                    },
                    {
                        name: "Environment",
                        value: [
                            { noteText: "Note 3" }
                        ]
                    }
                ],
                "SEARCH": [

                ]
            }
        }
    ],
    jottings: [
        "Text 1",
        "Text 2"
    ],
    notes: [
        "Note 1",
        "Note 2"
    ],
    questions: [
        "How does ..",
        "Why does .."
    ]
};

UISettings.getSessionConfig = function (manualConfig, styleConfigID) {
    return Object.assign({}, manualConfig, UISettings.Styles.Session[styleConfigID]);
}

UISettings.getLevelConfig = function (manualConfig, styleConfigID) {
    return Object.assign({}, manualConfig, UISettings.Styles.Level[styleConfigID]);
}

UISettings.getSectionConfig = function (manualConfig, styleConfigID) {
    return Object.assign({}, manualConfig, UISettings.Styles.Section[styleConfigID]);
}

const CanvasX = 0;
const CanvasY = 0;

const CanvasMinWidth = 1000;
const CanvasMinHeight = 800;
const CanvasWidth = (window.innerWidth > CanvasMinWidth) ? window.innerWidth : CanvasMinWidth;
const CanvasHeight = (window.innerHeight > CanvasMinHeight) ? window.innerHeight : CanvasMinHeight;

const SessionSettings = UISettings.Properties.Session;
const LevelSettings = UISettings.Properties.Level;
const SectionSettings = UISettings.Properties.Section;

const SessionWidth = (CanvasWidth)
    * (SessionSettings.skeleton.wPct / 100);
const SessionHeight = (CanvasHeight)
    * (SessionSettings.skeleton.hPct / 100);

const LevelWidth = (CanvasWidth)
    * (SessionSettings.skeleton.wPct / 100)
    * (LevelSettings.skeleton.wPct / 100);
const LevelHeight = (CanvasHeight)
    * (SessionSettings.skeleton.hPct / 100)
    * (LevelSettings.skeleton.hPct / 100);

const SectionWidth = (CanvasWidth)
    * (SessionSettings.skeleton.wPct / 100)
    * (LevelSettings.skeleton.wPct / 100)
    * (SectionSettings.skeleton.wPct / 100);
const SectionHeight = (CanvasHeight)
    * (SessionSettings.skeleton.hPct / 100)
    * (LevelSettings.skeleton.hPct / 100)
    * (SectionSettings.skeleton.hPct / 100);
