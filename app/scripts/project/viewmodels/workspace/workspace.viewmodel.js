
class WorkspaceViewmodel {

    constructor() {

        var viewModel = this;

        viewModel.name = "";
        viewModel.model = {};
        viewModel.view = {};
        viewModel.settings = {};
        viewModel.active = false;
    }

    init(viewConfig) {

        var viewModel = this;

        function uiSettingsConfig(name) {

            var currentUISettings = {
                styles: viewConfig.styles[name],
                properties: viewConfig.properties[name]
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

        var wsParams = {
            data: {
                canvasName: viewConfig.canvasName,
                name: viewConfig.key,
                template: viewConfig.params.data.template,
                uiSettings: {
                    styles: viewConfig.styles,
                    properties: viewConfig.properties,
                    getConfig: {
                        workspace: uiSettingsConfig("workspace"),
                        level: uiSettingsConfig("level"),
                        section: uiSettingsConfig("section"),
                        board: uiSettingsConfig("board")
                    }
                }
            },
            callbacks: {

            }
        };

        viewModel.view = new Workspace();
        viewModel.view.init(wsParams);

        viewModel.settings = viewConfig;
    }
}
