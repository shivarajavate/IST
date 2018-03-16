class SectionController {

    constructor() {

        this.startNoteID = -1;
        this.endNoteID = -1;

        this.model;
        this.view;

        this.noteForm;
        this.secName;
        this.noteTemplate;     
    }

    init(model, view, secName, noteTemplate) {
        this.model = model;
        this.view = view;

        this.secName = secName;
        this.noteTemplate = noteTemplate;

        // If (model.noteCollection) != EMPTY, populate the boards with 'notes', and 
        // store #loaded notes into 'noOfNotes'
        // load up the (model.noteCollection) onto the view
        var noteTextCollection = this.model.noteCollection.map(note => { return { noteText: note.noteText } });
        var noOfNotesToBeDisplayed = (noteTextCollection.length > this.view.boardView.maxNoBoards) ?
            this.view.boardView.maxNoBoards : noteTextCollection.length;
        for (var i = 0; i < noOfNotesToBeDisplayed; ++i) {

            this.view.boardView.displayNoteAtEnd(i, noteTextCollection[i].noteText);
        }

        // Set the startNoteID and endNoteID based on the model and the view in-sync
        if (this.view.boardView.noOfNotes > 0) {
            // If there are any notes in the model 
            // then initialize the startNoteID and endNoteID
            this.startNoteID = 0;
            this.endNoteID = this.startNoteID + (this.view.boardView.noOfNotes - 1);
        }
    }

    // Need to respond to (+)addNote (-)deleteNote (CLICK)selectNote
    // (DBLCLICK)showNote (DELETE)deleteNote (>)scrollRight (<)scrollLeft
    // Note (+)addNote needs to display Angular NoteForm HTML and on click 
    // of ADD button in the noteForm, the note needs to be saved into 
    // section model and them section view updated with new note. 
    // The same is to applied for (DBLCLICK)updateNote, the only difference
    // being the updated note to be saved into model and refreshed in view.

    // Handler for (+) button & (DBLCLICK)
    // NOTE: boardID is -1 for a new note
    displayNoteForm(boardID) {

        // Guess we should setup up a noteForm for this section and keep it handy.
        // i.e. Lookup the templateJSON for this section's HTML, parse it and construct
        // the note form, setup up the display coordinates of where to display,
        // keep it hidden!
        this.noteForm = new NoteForm();
        this.noteForm.init(this.secName, this.noteTemplate, this.updateHandler.bind(this));

        if (boardID !== -1) {

            var noteViewInfo = this.view.boardView.boardCollection[boardID].getNote();
            var note = this.model.noteCollection[noteViewInfo.noteID];
            // Display the NoteForm HTML for update
            this.noteForm.show(note);

        } else {
            // unselect the note selected when adding a new note
            this.view.boardView.unselectBoard();
            // Display empty NoteForm HTML for add
            this.noteForm.show();
        }
    }

    // Handler for updating the Section on close of NoteForm
    // Update the model and the view based on changes made in the NoteForm
    // 1. Check if its (a) new note to be added or (b) update the existing note based on selectedBoardID
    // (a) new note to be added
    //      1. Fetch the noteID after which the note should be inserted
    //      2. Insert the new note to the model
    //      3. Update the view with the new note added to the end of the noteCollection
    //      4. Update the startNoteID and endNoteID
    // (b) update the existing note
    //      1. Update the note in the model
    //      2. Update the note in the view
    updateHandler() {

        // 1. Check if its (a) new note to be added or (b) update the existing note based on selectedBoardID
        var selectedBoardID = this.view.boardView.selectedBoardID;
        if (selectedBoardID === -1) {

            // There are 3-scenarios of add/insert
            // 1. First note added
            // 2. Insert after the last board displayed
            // 3. Append at last

            // 1. First note added
            if (this.startNoteID === -1 && this.endNoteID === -1) {

                // 1. Fetch the noteID after which the note should be inserted
                var insertedNoteID = 0;
                // 2. Insert the new note to the model
                this.model.insertNote(this.noteForm.elementCollection, insertedNoteID);
                // 3. Update the view with the new note added to the empty board (if any) or the last board
                this.view.boardView.displayNoteAtEnd(insertedNoteID, this.model.noteCollection[insertedNoteID].noteText);
                // 4. Update the startNoteID and endNoteID
                this.startNoteID = 0;
                this.endNoteID = 0;

            } else {
                if (this.view.boardView.noOfNotes === this.view.boardView.maxNoBoards) {

                    // NOTE: Board is full condition
                    // 1. Fetch the noteID after which the note should be inserted
                    var insertedNoteID = this.endNoteID + 1;
                    // 2. Insert the new note to the model
                    this.model.insertNote(this.noteForm.elementCollection, insertedNoteID);
                    // 3. Update the view with the new note added to the empty board (if any) or the last board
                    this.view.boardView.displayNoteAtEnd(insertedNoteID, this.model.noteCollection[insertedNoteID].noteText);
                    // 4. Update the startNoteID and endNoteID
                    ++this.endNoteID;
                    ++this.startNoteID;

                } else if (this.view.boardView.noOfNotes < this.view.boardView.maxNoBoards) {

                    // Still empty boards are available to be filled
                    // 1. Fetch the noteID after which the note should be inserted
                    var insertedNoteID = this.endNoteID + 1;
                    // 2. Insert the new note to the model
                    this.model.insertNote(this.noteForm.elementCollection, insertedNoteID);
                    // 3. Update the view with the new note added to the end of the noteCollection
                    this.view.boardView.displayNoteAtEnd(insertedNoteID, this.model.noteCollection[insertedNoteID].noteText);
                    // 4. Update the startNoteID and endNoteID    
                    ++this.endNoteID;
                }
            }

        } else {

            // Update the existing note
            // 1. Update the note in the model
            var noteToBeUpdated = this.view.boardView.boardCollection[selectedBoardID].getNote();
            this.model.updateNote(noteToBeUpdated.noteID, this.noteForm.elementCollection);

            // 2. Update the note in the view
            var updatedNote = this.model.noteCollection[noteToBeUpdated.noteID];
            this.view.boardView.displayNoteAt(selectedBoardID, noteToBeUpdated.noteID, updatedNote.noteText);
        }
    }

    // Handler for (-) button
    // It deletes iff any note is selected
    // 1. Delete the note from the model
    // 2. Delete the note from the view
    // 3. Update the startNoteID and endNoteID
    //      - Fetch (if any) note available at start/end from the model to the view
    // 4. Unselect the board after delete
    deleteNote() {

        // Check if any board is selected before delete, else terminate
        var boardID = this.view.boardView.selectedBoardID;
        if (boardID !== -1) {

            // 1. Delete the note from the model
            var noteToBeDeleted = this.view.boardView.boardCollection[boardID].getNote();
            this.model.deleteNote(noteToBeDeleted.noteID);

            // 2. Delete the note from the view
            this.view.boardView.deleteNote(boardID);

            // 3. Update the startNoteID and endNoteID
            if (this.startNoteID === 0 && this.endNoteID === 0) {
                this.startNoteID = -1;
                this.endNoteID = -1;

            } else if (this.endNoteID <= this.model.noteCollection.length - 1) {
                // (a) Get the next note from the model to be displayed (if exists) from right
                var nextNote = this.model.noteCollection[this.endNoteID];
                this.view.boardView.displayNoteAtEnd(this.endNoteID, nextNote.noteText);

            } else if (this.startNoteID > 0) {
                // (a) Get the prev note from the mode to be displayed (if exists) from left
                var prevNote = this.model.noteCollection[this.startNoteID - 1];
                this.view.boardView.displayNoteAtStart(this.startNoteID - 1, prevNote.noteText);

                --this.startNoteID;
                --this.endNoteID;
            } else {
                // No note appended at start or end
                --this.endNoteID;
            }

            // 4. Unselect the board after delete
            this.view.boardView.unselectBoard();
        }
    }

    // Handler for (CLICK)
    selectNote(boardID) {
        // Unselect any selected board before selecting the current board
        this.view.boardView.unselectBoard();
        // Highlight the selected board
        this.view.boardView.selectBoard(boardID);
    }

    // Handler for (SCROLL-LEFT) button
    // It scrolls left iff any note is available on the left
    // 1. Decrement the startNoteID and fetch the note to be displayed at start from the model
    // 2. Update the view by adding the note at the start
    // 3. Update the endNoteID
    scrollLeft() {

        // It scrolls left iff any note is available on the left
        // NOTE: scroll left condition check
        if (this.startNoteID > 0) {

            // 1. Decrement the startNoteID and fetch the note to be displayed at start from the model
            --this.startNoteID;
            var prevNote = this.model.noteCollection[this.startNoteID];

            // 2. Update the view by adding the note at the start
            this.view.boardView.displayNoteAtStart(this.startNoteID, prevNote.noteText);

            // 3. Update the endNoteID
            this.endNoteID = this.startNoteID + (this.view.boardView.noOfNotes - 1);
        }
    }

    // Handler for (SCROLL-RIGHT) button
    // It scrolls right iff any note is available on the right
    // 1. Increment the endNoteID and fetch the note to be displayed at end from the model
    // 2. Update the view by adding the note at the end
    // 3. Update the startNoteID
    scrollRight() {

        // It scrolls right iff any note is available on the right
        // NOTE: scroll right condition check
        if (this.endNoteID < this.model.noteCollection.length - 1) {

            // 1. Increment the endNoteID and fetch the note to be displayed at end from the model
            ++this.endNoteID;
            var nextNote = this.model.noteCollection[this.endNoteID];

            // 2. Update the view by adding the note at the end
            this.view.boardView.displayNoteAtEnd(this.endNoteID, nextNote.noteText);

            // 3. Update the startNoteID
            this.startNoteID = this.endNoteID - (this.view.boardView.noOfNotes - 1);
        }
    }
}