
class ProjectDataModel {

    constructor(data = { _id: -1, name: "", description: "", details: { levels: [], jottings: [], notes: [], questions: [] }, templateName: "" }) {

        var model = this;

        model._id = data._id;
        model.name = data.name;
        model.description = data.description;
        model.details = data.details;
        model.templateName = data.templateName;
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

    createNoteFromNode(node, template = new ProjectTemplateModel()) {

        var model = this;

        node.id = node.id || model.uniqueId();

        var note = new NoteModel({
            id: node.id,
            name: node.name,
            secName: node.secName,
            levelName: node.levelName
        }, template);

        return note;
    }

    createNodeFromNote(note) {

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

        return node;
    }

    addJotting(newJotting, position) {

        var model = this;

        var newJottingIndex = (position + 1);
        model.details.jottings.splice(newJottingIndex, 0, newJotting);
    }

    deleteJotting(index) {

        var model = this;

        if (index >= 0) {
            return model.details.jottings.splice(index, 1);
        }
    }

    addNote(newNote, position) {

        var model = this;

        var newNoteIndex = (position + 1);
        model.details.notes.splice(newNoteIndex, 0, newNote);
    }

    deleteNote(index) {

        var model = this;

        if (index >= 0) {
            return model.details.notes.splice(index, 1);
        }
    }

    addQuestion(newQuestion, position) {

        var model = this;

        var newQuestionIndex = (position + 1);
        model.details.questions.splice(newQuestionIndex, 0, newQuestion);
    }

    deleteQuestion(index) {

        var model = this;

        if (index >= 0) {
            return model.details.questions.splice(index, 1);
        }
    }
}