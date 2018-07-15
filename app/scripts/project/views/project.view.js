
class ProjectView {

    constructor() {

        var view = this;

        view["workspace"] = [];
        view["mindMap"] = null;
    }

    addReconWorkspaceView(params) {

        var view = this;

        var wsParams = {
            data: {
                canvasName: params.data.viewParams.canvasName,
                name: params.data.viewParams.key,
                template: params.data.template,
                uiSettings: params.data.uiSettings
            },
            callbacks: {

            }
        };

        var ws = new Workspace();
        ws.init(wsParams);

        view["workspace"].push(ws);
    }

    addSearchWorkspaceView(params) {

        var view = this;

        var wsParams = {
            data: {
                canvasName: params.data.viewParams.canvasName,
                name: params.data.viewParams.key,
                template: params.data.template,
                uiSettings: params.data.uiSettings
            },
            callbacks: {

            }
        };

        var ws = new Workspace();
        ws.init(wsParams);

        view["workspace"].push(ws);
    }

    addMindMapView(params) {

        var view = this;

        var mindMapParams = {
            canvasName: params.data.viewParams.canvasName,
            data:  {
                nodes: params.data.nodes,
                edges: params.data.edges
            },
            options: params.data.options,
            callbacks: params.callbacks
        }

        var mindMapView = new MindMap();
        mindMapView.init(mindMapParams);

        view["mindMap"] = mindMapView;
    }
}