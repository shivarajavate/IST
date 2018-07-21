
class ProjectViewModel {

    constructor(viewConfigs = []) {

        var model = this;

        model["reconWorkspace"] = {};
        model["searchWorkspace"] = {};
        model["mindMap"] = {};
        model["noteForm"] = {};

        viewConfigs.forEach(function (viewConfig) {

            switch (viewConfig.name) {
                case "mindMap":

                    var viewmodel = new MindMapViewmodel();
                    viewmodel.init(viewConfig);
                    model["mindMap"] = viewmodel;
                    break;

                case "reconWorkspace":

                    var viewmodel = new WorkspaceViewmodel();
                    viewmodel.init(viewConfig);
                    model["reconWorkspace"] = viewmodel;
                    break;

                case "searchWorkspace":

                    var viewmodel = new WorkspaceViewmodel();
                    viewmodel.init(viewConfig);
                    model["searchWorkspace"] = viewmodel;
                    break;

                case "noteForm":

                    var viewmodel = new NoteFormViewmodel();
                    viewmodel.init(viewConfig);
                    model["noteForm"] = viewmodel;
                    break;
            }
        });
    }

    toggleView(viewModelName) {

        var model = this;

        if (Object.keys(model).find(modelKey => modelKey === viewModelName)) {

            model[viewModelName].open = (model[viewModelName].open) ? false : true;
        }
    }

    applyTheme() {

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

        model["reconWorkspace"].settings.styles = $.extend(true, {}, model["reconWorkspace"].settings.styles, newStyles);
        model["reconWorkspace"].view.applyTheme(model["reconWorkspace"].settings.styles);

        model["searchWorkspace"].settings.styles = $.extend(true, {}, model["searchWorkspace"].settings.styles, newStyles);
        model["searchWorkspace"].view.applyTheme(model["searchWorkspace"].settings.styles);

        model["mindMap"].settings.styles = $.extend(true, {}, model["mindMap"].settings.styles, newMindMapStyles);
        model["mindMap"].view.applyTheme(model["mindMap"].settings.styles);
    }
}