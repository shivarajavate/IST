
class ProjectUisettingModel {

    constructor(data = { _id: -1, name: "", value: {} }) {

        var model = this;

        model._id = data._id;
        model.name = data.name;
        model.value = data.value;
        model.styles = data.value.styles;
        model.properties = data.value.properties;
        model.getConfig = {
            workspace: model.uiSettingsConfig("workspace"),
            level: model.uiSettingsConfig("level"),
            section: model.uiSettingsConfig("section"),
            board: model.uiSettingsConfig("board")
        };

        model.mindMapProperties = {
            locale: appConst.lang,
            layout: {
                randomSeed: 1,
                hierarchical: {
                    enabled: true,
                    levelSeparation: 250,
                    nodeSpacing: 50,
                    blockShifting: false,
                    edgeMinimization: false,
                    direction: 'LR',
                    sortMethod: 'directed'
                }
            },
            nodes: {
                font: {
                    // align: "left",
                    multi: 'html'
                },
                borderWidth: 0,
                borderWidthSelected: 0,
                widthConstraint: {
                    minimum: 75,
                    maximum: 75
                }
            },
            edges: {
                smooth: {
                    enabled: true,
                    type: "cubicBezier",
                    forceDirection: 'horizontal',
                    roundness: 0.5
                }
            },
            physics: {
                enabled: false
            }
        };
    }

    uiSettingsConfig(name) {

        var model = this;

        var currentUISettings = {
            styles: model.value.styles[name],
            properties: model.value.properties[name]
        };

        return function (manualConfig, styleConfigId) {
            var config = Object.assign({}, manualConfig, currentUISettings.styles[styleConfigId]);

            config.x = config.x + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
            config.y = config.y + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
            config.width = config.width - ((config.strokeWidth) || 0);
            config.height = config.height - ((config.strokeWidth) || 0);

            switch (config.verticalAlign) {
                case "top":
                    config.y = config.y;
                    break;
                case "center":
                    config.y = config.y + (config.height / 2) - (config.fontSize / 2);
                    break;
                case "bottom":
                    config.y = config.y + config.height - config.fontSize;
                    break;
            }
            return config;
        };
    }

    update() {

        var model = this;

        var style = getComputedStyle(document.getElementById('ist'));
        var themeColors = {
            color: style.getPropertyValue('--theme-color').trim(),
            backgroundColor: style.getPropertyValue('--theme-background-color').trim(),
            borderColor: style.getPropertyValue('--theme-border-color').trim(),
            activeColor: style.getPropertyValue('--theme-active-color').trim(),
            activeBackgroundColor: style.getPropertyValue('--theme-active-background-color').trim(),
            activeBorderColor: style.getPropertyValue('--theme-active-border-color').trim(),
            disabledColor: style.getPropertyValue('--theme-disabled-color').trim(),
            disabledBackgroundColor: style.getPropertyValue('--theme-disabled-background-color').trim(),
            borderLineColor: style.getPropertyValue('--theme-border-line-color').trim(),
            footerColor: style.getPropertyValue('--theme-footer-color').trim(),
            footerBackgroundColor: style.getPropertyValue('--theme-footer-background-color').trim(),
            footerMenuBackgroundColor: style.getPropertyValue('--theme-footer-menu-background-color').trim(),
            scrollbarColor: style.getPropertyValue('--theme-scrollbar-color').trim(),
            scrollbarBackgroundColor: style.getPropertyValue('--theme-scrollbar-background-color').trim(),
            activeScrollbarColor: style.getPropertyValue('--theme-active-scrollbar-color').trim()
        };

        var newStyles = {
            "workspace": {},
            "level": {
                "boardViewRect": {
                    "fill": themeColors.disabledBackgroundColor,
                    "stroke": "lightgrey",
                    "shadowColor": "black"
                },
                "scrollLeftButtonRect": {
                    "fill": "hsl(4, 3%, 76%)",
                    "stroke": "hsl(165, 53%, 81%)",
                    "shadowColor": "black"
                },
                "scrollLeftButtonText": {
                    "fontFamily": "FontAwesome",
                    "fill": "#555"
                },
                "scrollRightButtonRect": {
                    "fill": "hsl(4, 3%, 76%)",
                    "stroke": "hsl(165, 53%, 81%)",
                    "shadowColor": "black"
                },
                "scrollRightButtonText": {
                    "fontFamily": "FontAwesome",
                    "fill": "#555"
                },
                "levelIDRect": {
                    "fill": "black",
                    "stroke": "lightgrey",
                    "shadowColor": "black"
                },
                "levelIDText": {
                    "fontFamily": "Roboto",
                    "fill": "white"
                },
                "levelNameRect": {
                    "fill": "black",
                    "stroke": "lightgrey",
                    "shadowColor": "black"
                },
                "levelNameText": {
                    "fontFamily": "Roboto",
                    "fill": "white"
                }
            },
            "section": {
                "secNameRect": {
                    "fill": themeColors.backgroundColor,
                    "stroke": themeColors.borderColor,
                    "shadowColor": "black"
                },
                "secNameText": {
                    "fontFamily": "Roboto",
                    "fill": themeColors.color
                },
                "scrollLeftButtonRect": {
                    "fill": "hsl(4, 3%, 76%)",
                    "stroke": "hsl(165, 53%, 81%)",
                    "shadowColor": "black"
                },
                "scrollLeftButtonText": {
                    "fontFamily": "FontAwesome",
                    "fill": "#555"
                },
                "scrollRightButtonRect": {
                    "fill": "hsl(4, 3%, 76%)",
                    "stroke": "hsl(165, 53%, 81%)",
                    "shadowColor": "black"
                },
                "scrollRightButtonText": {
                    "fontFamily": "FontAwesome",
                    "fill": "#555"
                },
                "boardViewRect": {
                    "fill": "antiquewhite",
                    "stroke": "lightgrey",
                    "shadowColor": "black"
                }

            },
            "board": {
                "konvaRect": {
                    "fill": "hsl(29, 95%, 76%)",
                    "stroke": "hsl(29, 95%, 76%)",
                    "shadowColor": "black"
                },
                "konvaText": {
                    "fontFamily": "Roboto",
                    "fill": "#555"
                },
                "selectedKonvaRect": {
                    "fill": "hsl(9, 1%, 69%)",
                    "stroke": "hsl(165, 53%, 81%)",
                    "shadowColor": "black"
                }
            }
        };

        var newMindMapStyles = {
            nodes: {
                font: {
                    color: themeColors.color,
                    bold: {
                        color: themeColors.activeColor
                    }
                },
                color: {
                    border: themeColors.borderColor,
                    background: themeColors.backgroundColor,
                    highlight: {
                        border: themeColors.activeBorderColor,
                        background: themeColors.activeBackgroundColor
                    },
                    hover: {
                        border: themeColors.activeBorderColor,
                        background: themeColors.activeBackgroundColor
                    }
                }
            }
        };
        
        model.styles = $.extend(true, {}, model.styles, newStyles);
        model.mindMapStyles = $.extend(true, {}, model.mindMapStyles, newMindMapStyles);
    }
}