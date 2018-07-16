
class ProjectDataModel {

    constructor(data = { _id: -1, name: "", description: "", details: { levels: [], jottings: [], notes: [], questions: [] }, sessions: [], templateName: "", uisettingName: "" }) {

        var model = this;

        model._id = data._id;
        model.name = data.name;
        model.description = data.description;
        model.session = data.session;
        model.tasks = data.tasks;
        model.details = data.details;
        model.templateName = data.templateName;
        model.uisettingName = data.uisettingName;
        model.createdBy = data.createdBy;
        model.lastModifiedBy = data.lastModifiedBy;
    }

    upgradeSession() {

        var model = this;

        ++(model.session);
    }

    uniqueId() {

        var model = this;

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    viewDataModelFromNode(node, template = new ProjectTemplateModel()) {

        var model = this;

        node.id = node.id || model.uniqueId();

        var note = new NoteModel({
            id: node.id,
            name: node.name,
            secName: node.secName,
            levelName: node.levelName
        }, template);

        var viewDataModel = {
            node: node,
            note: note
        };

        return viewDataModel;
    }

    viewDataModelFromNote(note, template = new ProjectTemplateModel()) {

        var model = this;

        note.id = note.id || model.uniqueId();

        var node = new NodeModel({
            id: note.id,
            label: note.name,
            name: note.name,
            secName: note.secName,
            levelName: note.levelName,
            isNote: true
        });

        var viewDataModel = {
            node: node,
            note: note
        };

        var model = this;

        return viewDataModel;
    }

    newNote(data = { name: "", secName: "", levelName: "" }, template = new ProjectTemplateModel()) {

        var model = this;

        var note = new NoteModel({
            id: data.id || model.uniqueId(),
            name: data.name,
            secName: data.secName,
            levelName: data.levelName
        }, template);

        return note;
    }

    defaultMindMapData(template = new ProjectTemplateModel()) {

        var model = this;

        var data = {
            nodes: [],
            edges: []
        };

        var mainNode = new NodeModel({
            id: model.uniqueId(),
            x: 0,
            y: 0,
            level: 0,
            label: model.name,
            name: model.name,
            secName: null,
            levelName: null,
            shape: "box",
            fixed: true,
            isNote: false,
            default: true
        });

        data.nodes.push(mainNode);

        template.levels.forEach(function (level) {
            level.sections.forEach(function (section) {

                var newNode = new NodeModel({
                    id: model.uniqueId(),
                    level: 1,
                    label: section.name,
                    name: section.name,
                    secName: section.name,
                    levelName: level.name,
                    isNote: false,
                    default: true
                });

                data.nodes.push(newNode);

                var newEdge = new EdgeModel({
                    id: model.uniqueId(),
                    from: mainNode.id,
                    to: newNode.id
                });

                data.edges.push(newEdge);
            });
        });

        return data;
    }

    suggestTags(wsName) {

        var model = this;

        var levels = model.details.levels;
        var sections = [].concat(...levels.map(level => level.sections));
        var secWithNotes = sections.filter(section => section.notes.length > 0);

        var secNoteTagCollection = secWithNotes.map(sec => sec.notes.map(note => sec.name + " : " + note.name));
        var secNoteTags = [].concat(...secNoteTagCollection);
        var tags = secNoteTags;

        return tags;
    }

    addNote(noteToBeAdded, noteIndex = -1) {

        var model = this;

        var status = false;

        var noteExists = false;

        model.details.levels.forEach(function (level) {

            if (level.name === noteToBeAdded.levelName) {

                level.sections.forEach(function (section) {

                    if (section.name === noteToBeAdded.secName) {

                        var duplicateNote = section.notes.find(note => note.name === noteToBeAdded.name);

                        noteExists = duplicateNote ? true : false;

                        if (!noteExists) {
                            switch (true) {
                                case (noteIndex < 0):
                                    section.notes.unshift(noteToBeAdded);
                                    break;
                                case ((noteIndex >= 0) && (noteIndex <= section.notes.length)):
                                    section.notes.splice(noteIndex, 0, noteToBeAdded);
                                    break;
                                case (noteIndex > section.notes.length):
                                    section.notes.push(noteToBeAdded);
                                    break;
                                default:
                                    section.notes.push(noteToBeAdded);
                                    break;
                            }
                            status = true;
                        }
                    }
                });
            }
        });

        return status;
    }

    updateNote(noteToBeUpdated) {

        var model = this;

        var status = false;

        model.details.levels.forEach(function (level) {

            if (level.name === noteToBeUpdated.levelName) {

                level.sections.forEach(function (section) {

                    if (section.name === noteToBeUpdated.secName) {

                        section.notes.forEach(function (note, index, notes) {

                            if (note.id === noteToBeUpdated.id) {
                                notes[index] = noteToBeUpdated;
                                status = true;
                            }
                        });
                    }
                });
            }
        });

        return status;
    }

    deleteNote(noteToBeDeleted) {

        var model = this;

        var status = false;

        model.details.levels.forEach(function (level) {

            if (level.name === noteToBeDeleted.levelName) {

                level.sections.forEach(function (section) {

                    if (section.name === noteToBeDeleted.secName) {

                        section.notes.forEach(function (note, index, notes) {

                            if (note.id === noteToBeDeleted.id) {
                                notes.splice(index, 1);
                                status = true;
                            }
                        });
                    }
                });
            }
        });

        return status;
    }

    addTask(newTaskName, position) {

        var model = this;

        var newTask = {
            name: newTaskName,
            session: model.session,
            completed: false
        }
        var newTaskIndex = (position + 1);
        model.tasks.splice(newTaskIndex, 0, newTask);
    }

    deleteTask(index) {

        var model = this;

        if (index >= 0) {
            return model.tasks.splice(index, 1);
        }
    }

    addFooterJotting(newJotting, position) {

        var model = this;

        var newJottingIndex = (position + 1);
        model.details.jottings.splice(newJottingIndex, 0, newJotting);
    }

    deleteFooterJotting(index) {

        var model = this;

        if (index >= 0) {
            return model.details.jottings.splice(index, 1);
        }
    }

    addFooterNote(newNote, position) {

        var model = this;

        var newNoteIndex = (position + 1);
        model.details.notes.splice(newNoteIndex, 0, newNote);
    }

    deleteFooterNote(index) {

        var model = this;

        if (index >= 0) {
            return model.details.notes.splice(index, 1);
        }
    }

    addFooterQuestion(newQuestion, position) {

        var model = this;

        var newQuestionIndex = (position + 1);
        model.details.questions.splice(newQuestionIndex, 0, newQuestion);
    }

    deleteFooterQuestion(index) {

        var model = this;

        if (index >= 0) {
            return model.details.questions.splice(index, 1);
        }
    }
}