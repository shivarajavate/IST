
class MindMapViewmodel {

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

        var defaultMindMapData = viewConfig.params.data.model.defaultMindMapData(viewConfig.params.data.template);

        var mindMapParams = {
            canvasName: viewConfig.canvasName,
            data: {
                nodes: defaultMindMapData.nodes,
                edges: defaultMindMapData.edges
            },
            options: viewConfig.options,
            callbacks: viewConfig.params.callbacks
        };

        viewModel.view = new MindMap();
        viewModel.view.init(mindMapParams);

        viewModel.settings = {
            styles: {

            },
            properties: viewConfig.options
        };

        viewModel.active = false;
    }
}
