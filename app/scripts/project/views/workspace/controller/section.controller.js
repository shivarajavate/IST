class SectionController {

    constructor() {

        this.model;
        this.view;

        this.wsName;
        this.levelName;
        this.secName;
    }

    init(model, view, wsName, levelName, secName) {
        this.model = model;
        this.view = view;

        this.wsName = wsName;
        this.levelName = levelName;
        this.secName = secName;
    }

    startNoteIndex() {

        var controller = this;

        var startNoteBoard = controller.view.boardView.leftmostBoard(true);
        return (startNoteBoard) ? controller.model.getIndexOf(startNoteBoard.note.id) : 0;
    }

    endNoteIndex() {

        var controller = this;

        var endNoteBoard = controller.view.boardView.rightmostBoard(true);
        return (endNoteBoard) ? controller.model.getIndexOf(endNoteBoard.note.id) : (controller.model.notes.length - 1);
    }

    load(notes = []) {

        var controller = this;

        controller.model.init(notes);

        var startNoteIndex = controller.startNoteIndex();

        controller.displayNotesFrom(startNoteIndex);
    }

    // Handler for (+) button & (CLICK) - showNote
    // NOTE: boardId is -1 for a new note
    displayNoteForm(boardId) {

        var controller = this;

        var scope = angular.element($('#workspace')).scope();

        switch (boardId !== -1) {

            case true:

                controller.selectNote(boardId);
                var data = {
                    wsName: controller.wsName,
                    levelName: controller.levelName,
                    secName: controller.secName,
                    noteExists: true,
                    note: controller.view.boardView.boards[boardId].note
                };
                break;

            case false:

                controller.unselectNote();
                var data = {
                    wsName: controller.wsName,
                    levelName: controller.levelName,
                    secName: controller.secName,
                    noteExists: false,
                    note: null
                };
                break;
        }

        scope.project.openNoteForm(data);
    }

    // Handler for (ADD) - addNote
    // 1. Add the note in the model
    // 2. Add the note in the view
    //      - if (noteIndex = -1) then update the view with the new note added to last board
    addNote(note, noteIndex = -1) {

        var controller = this;

        // if (controller.model.duplicateExists(note.name)) {
        var endNoteIndex = controller.endNoteIndex();
        noteIndex = (noteIndex !== -1) ? noteIndex : (endNoteIndex + 1);

        controller.model.add(note, noteIndex);

        var startNoteIndex = controller.startNoteIndex();

        controller.displayNotesFrom((startNoteIndex + 1));
        // }

        return noteIndex;
    }

    // Handler for (UPDATE) - updateNote
    // 1. Update the note in the model
    // 2. Update the note in the view
    updateNote(note) {

        var controller = this;

        controller.model.update(note);

        var noteBoardId = controller.view.boardView.boards.findIndex(board => board.note.id === note.id);
        controller.view.boardView.displayNoteAt(noteBoardId, note);

        controller.unselectNote();
        controller.alterScrollbar();
    }

    // Handler for (DELETE) - deleteNote
    // 1. Delete the note from the model
    // 2. Delete the note from the view
    //      - Fetch (if any) note available at start/end from the model to the view
    deleteNote(note) {

        var controller = this;

        var noteIndex = controller.model.getIndexOf(note.id);

        controller.model.delete(note);

        var startNoteIndex = controller.startNoteIndex();

        controller.displayNotesFrom(startNoteIndex);

        return noteIndex;
    }

    // Handler for (SCROLL-LEFT) button - scrollLeft
    // It scrolls left iff any note is available on the left 
    scrollLeft() {

        var controller = this;

        var startNoteIndex = controller.startNoteIndex();
        var endNoteIndex = controller.endNoteIndex();

        if (startNoteIndex > 0) {
            controller.displayNotesFrom((startNoteIndex - 1));
        }
    }

    // Handler for (SCROLL-RIGHT) button - scrollRight
    // It scrolls right iff any note is available on the right
    scrollRight() {

        var controller = this;

        var startNoteIndex = controller.startNoteIndex();
        var endNoteIndex = controller.endNoteIndex();

        if (endNoteIndex < (controller.model.notes.length - 1)) {
            controller.displayNotesFrom((startNoteIndex + 1));
        }
    }

    selectNote(boardId) {

        var controller = this;

        controller.view.boardView.unselectBoard();
        controller.view.boardView.selectBoard(boardId);
    }

    unselectNote() {

        var controller = this;

        controller.view.boardView.unselectBoard();
    }

    displayNotesFrom(startNoteIndex) {

        var controller = this;

        var displayNotes = controller.model.displayNotesFrom(startNoteIndex, controller.view.boardView.noOfBoards);
        controller.view.boardView.clear();
        displayNotes.forEach(function (displayNote) {
            controller.view.boardView.displayNoteAtEnd(displayNote);
        });

        controller.unselectNote();
        controller.alterScrollbar();
    }

    alterScrollbar() {

        var controller = this;

        var startNoteIndex = controller.startNoteIndex();
        var endNoteIndex = controller.endNoteIndex();

        var isLeftScrollable = (startNoteIndex > 0);
        var isRightScrollable = (endNoteIndex < controller.model.notes.length - 1);
        controller.view.boardView.makeScrollable(isLeftScrollable, isRightScrollable);
    }
}