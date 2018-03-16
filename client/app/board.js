class Board {
    // Board is a outer Konva Rect object (konvaRect) with the inner Konva Text object (konvaText)
    // holding the 'note name' e.g. 'Chief Manager' in User Type section.

    constructor() {

        this.layer;

        this.konvaRect;
        this.konvaText;

        this.noteID = -1; // There is no note attached to board yet
        this.isVisible = false;
    }

    init(layer, x, y) {

        this.layer = layer;

        // Create outer Konva Rect and store in konvaRect
        // Create inner Konva Text and store in konvaText
        var manualConfig = {
            x: x,
            y: y,
            width: SectionSettings.board.w,
            height: SectionSettings.board.h
        };
        var config = UISettings.getSectionConfig(manualConfig, "konvaRect");
        this.konvaRect = new Konva.Rect(config);

        var manualConfig = {
            x: x,
            y: y,
            width: SectionSettings.board.w,
            height: SectionSettings.board.h
        };
        var config = UISettings.getSectionConfig(manualConfig, "konvaText");
        this.konvaText = new Konva.Text(config);

        this.layer.add(this.konvaRect);
        this.layer.add(this.konvaText);
    }

    getNote() {
        return {
            noteID: this.noteID,
            noteText: this.konvaText.text()
        }
    }

    attachNote(noteID, noteText) {
        this.noteID = noteID;
        this.konvaText.setText(noteText);
    }

    unattachNote() {
        this.noteID = -1;
        this.konvaText.setText("");
    }

    makeVisible(isVisible) {
        if (isVisible) {
            this.konvaRect.show();
            this.konvaText.show();
        } else {
            this.konvaRect.hide();
            this.konvaText.hide();
        }
        this.layer.batchDraw();
        this.isVisible = isVisible;
    }
}