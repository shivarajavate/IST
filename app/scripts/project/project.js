
class Project {

    constructor(params = { model: {}, template: {}, uiSettings: { views: [] } }) {

        var project = this;

        project.model = new ProjectDataModel(params.model);

        project.template = new ProjectTemplateModel(params.template);

        var viewConfigs = [];

        params.uiSettings.views.forEach(function (viewConfig) {

            switch (viewConfig.name) {
                case "mindMap":

                    viewConfig.params = {
                        data: {
                            model: project.model,
                            template: project.template
                        },
                        callbacks: {
                            add: project.addNodeAction.bind(project),
                            update: project.updateNodeAction.bind(project),
                            delete: project.deleteNodeAction.bind(project),
                            close: project.unselectNodeAction.bind(project)
                        }
                    };
                    break;

                case "reconWorkspace":

                    viewConfig.params = {
                        data: {
                            model: project.model,
                            template: project.template
                        },
                        callbacks: {
                            add: project.addNodeAction.bind(project),
                            update: project.updateNodeAction.bind(project),
                            delete: project.deleteNodeAction.bind(project),
                            close: project.unselectNodeAction.bind(project)
                        }
                    };
                    break;

                case "searchWorkspace":

                    viewConfig.params = {
                        data: {
                            model: project.model,
                            template: project.template
                        },
                        callbacks: {
                            add: project.addNodeAction.bind(project),
                            update: project.updateNodeAction.bind(project),
                            delete: project.deleteNodeAction.bind(project),
                            close: project.unselectNodeAction.bind(project)
                        }
                    };
                    break;

                case "noteForm":

                    viewConfig.params = {
                        data: {
                            model: project.model,
                            template: project.template
                        },
                        callbacks: {
                            add: project.addNoteAction.bind(project),
                            update: project.updateNoteAction.bind(project),
                            delete: project.deleteNoteAction.bind(project),
                            close: project.unselectNoteAction.bind(project)
                        }
                    };
                    break;
            }
            viewConfigs.push(viewConfig);
        });

        project.views = new ProjectViewModel(viewConfigs);
        project.viewNames = Object.keys(project.views);

        project.undoManager = new UndoManager();

        project.selectedViewName = "";

        project.sessionTimer = {
            time: "0:00",
            defaultTime: "0:00",
            start: function (duration) {
                var sessionTimer = this;
                project.sessionDuration = duration;
                sessionTimer.countdown(duration);
            },
            countdown: function (minutes) {
                var sessionTimer = this;
                var seconds = 60;
                var mins = minutes;
                function tick() {
                    var currMinutes = mins - 1;
                    seconds--;
                    if (seconds > 0) {
                        sessionTimer.time = currMinutes + ":" + seconds;
                        setTimeout(tick, 1000);
                    } else {
                        if (mins > 1) {
                            setTimeout(function () { sessionTimer.countdown(mins - 1); }, 1000);
                        }
                    }
                }
                tick();
            }
        };
        project.open = false;

        project.views.applyTheme();
    }

    startSession(duration) {

        var project = this;
        project.views["reconWorkspace"].view.set(project.model.details.levels);
        project.views["searchWorkspace"].view.set(project.model.details.levels);
        project.views["mindMap"].view.set(project.model.details.levels);

        project.undoManager.clear();

        project.model.session = (project.model.noOfSessions + 1);

        project.sessionTimer.start(duration);
        project.open = true;
    }

    endSession() {

        var project = this;

        project.undoManager.clear();

        project.model.noOfSessions = (project.model.noOfSessions + 1);

        project.open = false;
    }

    openNoteForm(data) {

        var project = this;

        data.note = (data.noteExists) ? data.note : project.model.newNote({
            name: "new",
            secName: data.secName,
            levelName: data.levelName
        }, project.template);

        data.tags = project.model.suggestTags(data.wsName);

        project.views["noteForm"].view.show(data);
    }

    addDataModel(dataModel = { note: {}, node: {} }, position = -1, record = false) {

        var project = this;

        if (project.model.addNote(dataModel.note, position)) {

            position = project.views["reconWorkspace"].view.add(dataModel.note, position);
            position = project.views["searchWorkspace"].view.add(dataModel.note, position);
            project.views["mindMap"].view.add(dataModel.node);

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

            project.views["reconWorkspace"].view.update(updatedDataModel.note);
            project.views["searchWorkspace"].view.update(updatedDataModel.note);
            project.views["mindMap"].view.update(dataModel.node, updatedDataModel.node);

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

            project.views["reconWorkspace"].view.delete(dataModel.note);
            project.views["searchWorkspace"].view.delete(dataModel.note);
            project.views["mindMap"].view.delete(dataModel.node);

            if (record) {
                project.undoManager.add({
                    undo: project.addDataModel.bind(project, dataModel, -1, false),
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

        project.views["reconWorkspace"].view.unselect();
        project.views["searchWorkspace"].view.unselect();
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

        project.views["mindMap"].view.unselect();
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
                data += project.views["reconWorkspace"].view.getData(format);
                data += project.views["searchWorkspace"].view.getData(format);

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
                project.views["workspace"].forEach(function (viewModel) {
                    data += viewModel.view.getTitle();
                });
                data += "</tr>";
                data += "</table>";
                data += "</div>";
                project.views["workspace"].forEach(function (viewModel) {
                    data += viewModel.view.getData(format);
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