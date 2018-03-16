
class LevelController {
    constructor() {

        this.startSectionID = -1;
        this.endSectionID = -1;

        this.model;
        this.view;
    }

    init(model, view) {
        this.model = model;
        this.view = view;

        // Set the startSectionID and endSectionID based on the model and the view in-sync
        if (this.view.boardView.noOfSectionAreas < this.view.boardView.noOfSections) {
            // If there are any sections in the model 
            // then initialize the startSectionID and endSectionID
            this.startSectionID = 0;
            this.endSectionID = this.startSectionID + (this.view.boardView.noOfSectionAreas - 1);
        }
    }

    // Need to respond to (>)scrollRight (<)scrollLeft

    // Handler for (SCROLL-LEFT) button
    // It scrolls left iff any section is available on the left
    // 1. Decrement the startSectionID
    // 2. Update the view by relocating the section at the start
    // 3. Update the endSectionID
    scrollLeft() {

        // It scrolls left iff any section is available on the left
        // NOTE: scroll left condition check
        if (this.view.boardView.noOfSectionAreas < this.view.boardView.noOfSections) {
            if (this.startSectionID > 0) {

                // 1. Decrement the startSectionID
                --this.startSectionID;

                // 2. Update the view by relocating the section at the start
                this.view.boardView.displaySectionAtStart(this.startSectionID);

                // 3. Update the endSectionID
                this.endSectionID = this.startSectionID + (this.view.boardView.noOfSectionAreas - 1);
            }
        }
    }

    // Handler for (SCROLL-RIGHT) button
    // It scrolls right iff any section is available on the right
    // 1. Increment the endSectionID
    // 2. Update the view by relocating the section at the end
    // 3. Update the startSectionID
    scrollRight() {

        // It scrolls right iff any section is available on the right
        // NOTE: scroll right condition check
        if (this.view.boardView.noOfSectionAreas < this.view.boardView.noOfSections) {
            if (this.endSectionID < this.model.sectionCollection.length - 1) {

                // 1. Increment the endNoteID
                ++this.endSectionID;

                // 2. Update the view by relocating the section at the end
                this.view.boardView.displaySectionAtEnd(this.endSectionID);

                // 3. Update the startSectionID
                this.startSectionID = this.endSectionID - (this.view.boardView.noOfSectionAreas - 1);
            }
        }
    }
}