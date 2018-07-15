
class Project {

    constructor(params = { model: {}, template: {}, uiSettings: { views: [] } }) {

        var project = this;

        project.model = new ProjectDataModel(params.model);

        project.template = new ProjectTemplateModel(params.template);

        project.uiSettings = new ProjectUisettingModel(params.uiSettings);

        project.views = new ProjectView();

        params.uiSettings.views.forEach(function (view, index) {
            switch (view.name) {
                case "reconWorkspace":

                    var viewParams = {
                        data: {
                            viewParams: view,
                            template: project.template,
                            uiSettings: project.uiSettings.views[index]
                        },
                        callbacks: {

                        }
                    };

                    project.views.addReconWorkspaceView(viewParams);

                    break;
                case "searchWorkspace":

                    var viewParams = {
                        data: {
                            viewParams: view,
                            template: project.template,
                            uiSettings: project.uiSettings.views[index]
                        },
                        callbacks: {

                        }
                    };

                    project.views.addSearchWorkspaceView(viewParams);

                    break;
                case "mindMap":

                    var defaultMindMapData = project.model.defaultMindMapData(project.template);

                    var viewParams = {
                        data: {
                            viewParams: view,
                            nodes: defaultMindMapData.nodes,
                            edges: defaultMindMapData.edges,
                            uiSettings: project.uiSettings.views[index]
                        },
                        callbacks: {
                            add: project.addNodeAction.bind(project),
                            update: project.updateNodeAction.bind(project),
                            delete: project.deleteNodeAction.bind(project),
                            close: project.unselectNodeAction.bind(project)
                        }
                    };

                    project.views.addMindMapView(viewParams);

                    break;
            }
        });

        project.noteForm;

        project.undoManager = new UndoManager();

        project.open = false;

        project.applyTheme();
    }

    startSession() {

        var project = this;

        project.views["workspace"].forEach(function (workspace) {
            workspace.set(project.model.details.levels);
        });
        project.views["mindMap"].set(project.model.details.levels);

        project.undoManager.clear();

        project.open = true;
    }

    abortSession() {

        var project = this;

        project.open = false;
    }

    openNoteForm(data) {

        var project = this;

        var callbacks = {
            add: project.addNoteAction.bind(project),
            delete: project.deleteNoteAction.bind(project),
            update: project.updateNoteAction.bind(project),
            submit: ((data.noteExists) ? project.updateNoteAction.bind(project) : project.addNoteAction.bind(project)),
            close: project.unselectNoteAction.bind(project)
        };

        data.note = (data.noteExists) ? data.note : project.model.newNote({
            name: "new",
            secName: data.secName,
            levelName: data.levelName
        }, project.template);

        data.template = project.template.noteTemplate(data.secName, data.levelName, data.wsName);
        data.tags = project.model.suggestTags(data.wsName);

        project.noteForm = new NoteForm();
        project.noteForm.init(data, callbacks);
    }

    addDataModel(dataModel = { note: {}, node: {} }, position = -1, record = false) {

        var project = this;

        if (project.model.addNote(dataModel.note, position)) {

            project.views["workspace"].forEach(function (workspace) {
                position = workspace.add(dataModel.note, position);
            });
            project.views["mindMap"].add(dataModel.node);

            if (record) {
                project.undoManager.add({
                    undo: project.deleteDataModel.bind(project, dataModel, false),
                    redo: project.addDataModel.bind(project, dataModel, position, false)
                });
            }
        }
    }

    updateDataModel(dataModel = { note: {}, node: {} }, updatedDataModel = { note: {}, node: {} }, record = false) {

        var project = this;

        if (project.model.updateNote(updatedDataModel.note)) {

            project.views["workspace"].forEach(function (workspace) {
                workspace.update(updatedDataModel.note);
            });
            project.views["mindMap"].update(dataModel.node, updatedDataModel.node);

            if (record) {
                project.undoManager.add({
                    undo: project.updateDataModel.bind(project, updatedDataModel, dataModel, false),
                    redo: project.updateDataModel.bind(project, dataModel, updatedDataModel, false)
                });
            }
        }
    }

    deleteDataModel(dataModel = { note: {}, node: {} }, record = false) {

        var project = this;

        if (project.model.deleteNote(dataModel.note)) {

            project.views["workspace"].forEach(function (workspace) {
                workspace.delete(dataModel.note);
            });
            project.views["mindMap"].delete(dataModel.node);

            if (record) {
                project.undoManager.add({
                    undo: project.addDataModel.bind(project, dataModel, position, false),
                    redo: project.deleteDataModel.bind(project, dataModel, false)
                });
            }
        }
    }

    addNoteAction(note, noteIndex = -1, action = true) {

        var project = this;

        var viewDataModel = project.model.viewDataModelFromNote(note, project.template);

        project.addDataModel(viewDataModel, noteIndex, action);
    }

    updateNoteAction(note, updatedNote, action = true) {

        var project = this;

        var viewDataModel = project.model.viewDataModelFromNote(note, project.template);
        var updatedViewDataModel = project.model.viewDataModelFromNote(updatedNote, project.template);

        project.updateDataModel(viewDataModel, updatedViewDataModel, action);
    }

    deleteNoteAction(note, action = true) {

        var project = this;

        var viewDataModel = project.model.viewDataModelFromNote(note, project.template);

        project.deleteDataModel(viewDataModel, action);
    }

    unselectNoteAction() {

        var project = this;

        project.views["workspace"].forEach(function (workspace) {
            workspace.unselect();
        });
    }

    addNodeAction(node, noteIndex = -1, action = true) {

        var project = this;

        var viewDataModel = project.model.viewDataModelFromNode(node, project.template);

        project.addDataModel(viewDataModel, noteIndex, action);
    }

    updateNodeAction(node, updatedNode, action = true) {

        var project = this;

        var viewDataModel = project.model.viewDataModelFromNode(node, project.template);
        var updatedViewDataModel = project.model.viewDataModelFromNode(updatedNode, project.template);

        project.updateDataModel(viewDataModel, updatedViewDataModel, action);
    }

    deleteNodeAction(node, action = true) {

        var project = this;

        var viewDataModel = project.model.viewDataModelFromNode(node, project.template);

        project.deleteDataModel(viewDataModel, action);
    }

    unselectNodeAction() {

        var project = this;

        project.views["mindMap"].unselect();
    }

    applyTheme() {
        var project = this;

        project.uiSettings.update();

        project.views["workspace"].forEach(function (workspace, index) {
            workspace.applyTheme(project.uiSettings.views[index].styles);
        });
        project.views["mindMap"].applyTheme(project.uiSettings.views[2].options);
    }

    download() {

        var project = this;
        var format = "text/html";
        var fileName = project.name + (new Date()).toLocaleString();
        var url = 'data:' + format + ';charset=utf-8,' + encodeURIComponent(project.getData(format));

        var downloadLink = document.createElement("a");

        downloadLink.download = fileName;
        downloadLink.href = url;

        downloadLink.onclick = function (event) {
            document.body.removeChild(event.target);
        };
        downloadLink.style.display = "none";

        document.body.appendChild(downloadLink);

        downloadLink.click();
    }

    getData(format) {

        var project = this;

        var data = "";
        switch (format) {
            case "text/plain":
                data += project.name + "\r\n";
                data += "Created on: ";
                data += (new Date()).toLocaleString() + "\r\n";
                project.views["workspace"].forEach(function (workspace) {
                    data += workspace.getData(format);
                });

                data += "NOTES:\r\n";
                project.model.details.notes.forEach(function (note, i) {
                    data += (i + 1) + '. ' + note + "\r\n";
                });

                data += "QUESTIONS:\r\n";
                project.model.details.questions.forEach(function (question, i) {
                    data += (i + 1) + '. ' + question + "\r\n";
                });
                break;
            case "text/html":
                data += "<head>";
                data += "<style>";

                data += ".contents {";
                data += "display: inline-block;";
                data += "padding: 7px;";
                data += "line-height: 1.6;";
                data += "border: 1px solid #a2a9b1;";
                data += "background-color: #f8f9fa;";
                data += "font-size: 95%;";
                data += "margin-bottom: 5px;";
                data += "padding: 5px;";
                data += "}";

                data += "a {";
                data += "text-decoration:none;";
                data += "}";

                data += ".content-heading ,.workspace-container {";
                data += "background-color : #f8f9fa;";
                data += "text-align: center;";
                data += "}";

                data += "li {";
                data += "list-style-type: none;";
                data += "}";

                data += "</style>";

                data += "</head>";
                data += "<h3>";
                data += project.name;
                data += "</h3>";
                data += "<h4>";
                data += "Downloaded on: ";
                data += (new Date()).toLocaleString();
                data += "</h4>";
                data += '<div class = "contents">';
                data += '<div class = "content-heading">Contents</div>';
                data += "<table>";
                data += "<tr>";
                project.views["workspace"].forEach(function (workspace) {
                    data += workspace.getTitle();
                });
                data += "</tr>";
                data += "</table>";
                data += "</div>";
                project.views["workspace"].forEach(function (workspace) {
                    data += workspace.getData(format);
                });
                data += "<hr>";
                data += "NOTES:" + "<br>";
                if (project.model.details.notes.length == 0) {
                    data += "(empty)";
                    data += "<br>";
                }
                project.model.details.notes.forEach(function (note, i) {
                    data += (i + 1) + '. ' + note + "<br>";
                });

                data += "<br>" + "QUESTIONS:" + "<br>";
                if (project.model.details.questions.length == 0) {
                    data += "(empty)";
                    data += "<br>";
                }
                project.model.details.questions.forEach(function (question, i) {
                    data += (i + 1) + '. ' + question + "<br>";
                });
                break;
        }

        return data;
    }

}