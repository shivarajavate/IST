
class Project {

    constructor(params = { model: {}, views: {}, template: {}, uiSettings: {} }) {

        var project = this;

        project.model = new ProjectDataModel(params.model);

        project.template = new ProjectTemplateModel(params.template);

        project.uiSettings = new ProjectUisettingModel(params.uiSettings);

        project.views = new Object();

        for (var view in params.views) {
            switch (view) {
                case "workspace":
                    project.views[view] = project.newWorkspaceView(params.views[view]);
                    break;
                case "mindMap":
                    project.views[view] = project.newMindMapView(params.views[view]);
                    break;
            }
        }

        project.noteForm;

        project.selectedWorkspaceIndex = -1;

        project.undoManager = new UndoManager();

        project.open = true;

        project.applyTheme();
    }

    newWorkspaceView(viewParams) {

        var project = this;

        var workspaceView = new Array();
        var viewIndex = 0;

        for (var viewParam in viewParams) {
            workspaceView[viewIndex] = new Workspace();
            workspaceView[viewIndex].init(viewParams[viewParam], viewParam, project.template, project.uiSettings);
            workspaceView[viewIndex].set(project.model.details.levels);
            workspaceView[viewIndex].makeVisible(false);
            ++viewIndex;
        }

        return workspaceView;
    }

    newMindMapView(viewParams) {

        var project = this;

        var params = {
            data: project.model,
            callbacks: {
                add: project.addNodeAction.bind(project),
                update: project.updateNodeAction.bind(project),
                delete: project.deleteNodeAction.bind(project),
                close: project.unselectNodeAction.bind(project)
            }
        };

        var mindMapView = new MindMap();
        mindMapView.init(params);

        return mindMapView;
    }

    startSession(currSession) {

        var project = this;

        project.views["workspace"].forEach(workspace => workspace.makeVisible(false));

        project.selectedWorkspaceIndex = project.views["workspace"].findIndex(workspace => workspace.name === currSession);
        project.views["workspace"][project.selectedWorkspaceIndex].makeVisible(true);

        project.views["workspace"][project.selectedWorkspaceIndex].set(project.model.details.levels);
        project.views["mindMap"].set(project.model.details.levels);

        project.undoManager.clear();

        project.applyTheme();
    }

    abortSession() {

        var project = this;

        project.views["workspace"].forEach(workspace => workspace.makeVisible(false));
        project.selectedWorkspaceIndex = -1;
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

        if (!data.noteExists) {
            data.note = project.model.newNote({
                name: "new",
                secName: data.secName,
                levelName: data.levelName
            }, project.template);
        }

        data.template = project.template.noteTemplate(data.secName, data.levelName, data.wsName);
        data.tags = project.getSuggestTags(data.wsName);

        project.noteForm = new NoteForm();
        project.noteForm.init(data, callbacks);
    }

    addNoteAction(note, noteIndex = -1, action = true) {

        var project = this;
        var node = project.model.createNodeFromNote(note);

        noteIndex = project.views["workspace"][project.selectedWorkspaceIndex].add(note, noteIndex);
        project.views["mindMap"].add(node);

        if (action) {
            project.undoManager.add({
                undo: project.deleteNoteAction.bind(project, note, false),
                redo: project.addNoteAction.bind(project, note, noteIndex, false)
            });
        }
    }

    updateNoteAction(note, updatedNote, action = true) {

        var project = this;
        var node = project.model.createNodeFromNote(note);

        var updatedNode = project.views["mindMap"].update(node, updatedNote.name);

        project.views["workspace"][project.selectedWorkspaceIndex].update(updatedNote);

        if (action) {
            project.undoManager.add({
                undo: project.updateNoteAction.bind(project, updatedNote, note, false),
                redo: project.updateNoteAction.bind(project, note, updatedNote, false)
            });
        }
    }

    deleteNoteAction(note, action = true) {

        var project = this;
        var node = project.model.createNodeFromNote(note);

        var noteIndex = project.views["workspace"][project.selectedWorkspaceIndex].delete(note);
        project.views["mindMap"].delete(node);

        if (action) {
            project.undoManager.add({
                undo: project.addNoteAction.bind(project, note, noteIndex, false),
                redo: project.deleteNoteAction.bind(project, note, false)
            });
        }
    }

    unselectNoteAction() {

        var project = this;
        project.views["workspace"][project.selectedWorkspaceIndex].unselect();
    }

    addNodeAction(node, noteIndex = -1, action = true) {

        var project = this;
        var note = project.model.createNoteFromNode(node, project.template);

        project.views["mindMap"].add(node);
        if (node.isNote) {
            noteIndex = project.views["workspace"][project.selectedWorkspaceIndex].add(note, noteIndex);
        }

        if (action) {
            project.undoManager.add({
                undo: project.deleteNodeAction.bind(project, node, false),
                redo: project.addNodeAction.bind(project, node, noteIndex, false)
            });
        }
    }

    updateNodeAction(node, updatedName, action = true) {

        var project = this;
        var note = project.model.createNoteFromNode(node, project.template);

        var prevNode = Object.assign({}, node);

        var updatedNode = project.views["mindMap"].update(node, updatedName);
        var updatedNote = project.model.createNoteFromNode(updatedNode, project.template);

        project.views["workspace"][project.selectedWorkspaceIndex].update(updatedNote);

        if (action) {
            project.undoManager.add({
                undo: project.updateNodeAction.bind(project, updatedNode, prevNode.name, false),
                redo: project.updateNodeAction.bind(project, prevNode, updatedName, false)
            });
        }
    }

    deleteNodeAction(node, action = true) {

        var project = this;
        var note = project.model.createNoteFromNode(node, project.template);

        project.views["mindMap"].delete(node);
        if (node.isNote) {
            var noteIndex = project.views["workspace"][project.selectedWorkspaceIndex].delete(note);
        }

        if (action) {
            project.undoManager.add({
                undo: project.addNodeAction.bind(project, node, noteIndex, false),
                redo: project.deleteNodeAction.bind(project, node, false)
            });
        }
    }

    unselectNodeAction() {
        var project = this;
        project.views["mindMap"].unselect();
    }

    applyTheme() {
        var project = this;

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

        project.uiSettings.update(themeColors);

        project.views["workspace"].forEach(function (workspace) {
            workspace.applyTheme(project.uiSettings.styles);
        });
        project.views["mindMap"].applyTheme(themeColors);
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

    getSuggestTags(wsName) {

        var project = this;

        var levels = project.model.details.levels;
        var sections = [].concat(...levels.map(level => level.sections));
        var secWithNotes = sections.filter(section => section.notes.length);

        var secNoteTagCollection = secWithNotes.map(sec => sec.notes.map(note => sec.name + " : " + note.name));
        var secNoteTags = [].concat(...secNoteTagCollection);
        var tags = secNoteTags;

        return tags;
    }

}