class SectionModel {

    constructor() {
        var model = this;
        model.notes = [];
    }

    init(notes = []) {
        var model = this;
        model.notes = notes;
    }

    noteExists(noteId) {
        var model = this;
        var noteIndex = model.notes.findIndex(note => note.id === noteId);
        return (noteIndex >= 0);
    }

    validIndex(noteIndex) {

        var model = this;
        
        if (noteIndex < 0)
            return 0;
        if (noteIndex >= model.notes.length)
            return model.notes.length - 1;

        return noteIndex;
    }

    getById(noteId) {
        var model = this;
        return model.notes.find(note => note.id === noteId);
    }

    getIndexOf(noteId) {
        var model = this;
        return model.notes.findIndex(note => note.id === noteId);
    }

    getPrevOf(noteIndex, include = false, noOfNotes = 1) {

        var model = this;

        var validNoteIndex = model.validIndex(noteIndex);

        var prevNotes = model.notes.filter(function (note, index) {
            switch (include) {
                case true:
                    return ((index <= validNoteIndex) && (index > (validNoteIndex - noOfNotes)));
                    break;
                case false:
                    return ((index < validNoteIndex) && (index >= (validNoteIndex - noOfNotes)));
                    break;
            }
        });
        return prevNotes;
    }

    getNextOf(noteIndex, include = false, noOfNotes = 1) {

        var model = this;

        var validNoteIndex = model.validIndex(noteIndex);

        var nextNotes = model.notes.filter(function (note, index) {
            switch (include) {
                case true:
                    return ((index >= validNoteIndex) && (index < (validNoteIndex + noOfNotes)));
                    break;
                case false:
                    return ((index > validNoteIndex) && (index <= (validNoteIndex + noOfNotes)));
                    break;
            }
        });
        return nextNotes;
    }

    displayNotesFrom(noteIndex, noOfNotes = 0) {

        var model = this;

        var attachableNotes = [];

        var nextNotes = [];
        var prevNotes = [];

        nextNotes = model.getNextOf(noteIndex, true, noOfNotes);
        prevNotes = model.getPrevOf(noteIndex, false, (noOfNotes - nextNotes.length));

        prevNotes.forEach(function (prevNote) {
            attachableNotes.push(prevNote);
        });

        nextNotes.forEach(function (nextNote) {
            attachableNotes.push(nextNote);
        });

        return attachableNotes;
    }

    duplicateExists(noteName) {
        var model = this;
        return model.notes.find(note => note.name === noteName);
    }

    add(noteToBeAdded, position) {
        var model = this;
        switch (true) {
            case (position < 0):
                model.notes.unshift(noteToBeAdded);
                break;
            case ((position >= 0) && (position <= model.notes.length)):
                model.notes.splice(position, 0, noteToBeAdded);
                break;
            case (position > model.notes.length):
                model.notes.push(noteToBeAdded);
                break;
            default:
                model.notes.push(noteToBeAdded);
                break;
        }
    }

    update(noteToBeUpdated) {
        var model = this;
        var noteIndex = model.getIndexOf(noteToBeUpdated.id);
        if (noteIndex !== -1) {
            model.notes[noteIndex] = noteToBeUpdated;
            return model.notes[noteIndex];
        }
    }

    delete(noteToBeDeleted) {

        var model = this;

        return {
            id: noteToBeDeleted.id,
            index: model.getIndexOf(noteToBeDeleted.id),
            data: [],
            oldData: model.notes.splice(model.getIndexOf(noteToBeDeleted.id), 1)
        };
    }

    size() {
        var model = this;
        return model.notes.length;
    }

}
