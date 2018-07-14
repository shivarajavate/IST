
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

    update(themeColors) {

        var model = this;

        var newStlyes = {
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

        model.styles = $.extend(true, {}, model.styles, newStlyes);
    }
}