class Board {
    // Board is a outer Konva Rect object (konvaRect) with the inner Konva Text object (konvaText)
    // holding the 'note name' e.g. 'Chief Manager' in User Type section.

    constructor() {

        this.layer;
        this.x;
        this.y;
        this.w;
        this.h;
        this.uiSettings;

        this.konvaRect;
        this.konvaText;

        this.note = null;
        this.isVisible = false;
    }

    init(layer, x, y, w, h, gapW, gapH, uiSettings) {

        this.layer = layer;
        this.x = x + gapW;
        this.y = y + gapH;
        this.w = w - (gapW * 2);
        this.h = h - (gapH * 2);
        this.uiSettings = {
            styles: uiSettings.styles["board"],
            properties: uiSettings.properties["board"],
            getConfig: uiSettings.getConfig["board"]
        };

        // Create outer Konva Rect and store in konvaRect
        // Create inner Konva Text and store in konvaText
        var manualConfig = {
            x: this.x,
            y: this.y,
            width: this.w,
            height: this.h
        };
        var config = this.uiSettings.getConfig(manualConfig, "konvaRect");
        this.konvaRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x,
            y: this.y,
            width: this.w,
            height: this.h
        };
        var config = this.uiSettings.getConfig(manualConfig, "konvaText");
        this.konvaText = new Konva.Text(config);

        this.layer.add(this.konvaRect);
        this.layer.add(this.konvaText);
    }

    attachNote(note) {
        this.note = note;
        this.konvaText.text(this.note.name);
    }

    unattachNote() {
        this.note = null;
        this.konvaText.text("");
    }

    unhighlightNote() {
        var config = this.uiSettings.getConfig({}, "konvaRect");
        this.konvaRect.fill(config.fill);
        this.konvaRect.stroke(config.stroke);
        this.layer.batchDraw();
    }

    highlightNote() {
        var config = this.uiSettings.getConfig({}, "selectedKonvaRect");
        this.konvaRect.fill(config.fill);
        this.konvaRect.stroke(config.stroke);
        this.layer.batchDraw();
    }

    applyTheme(uiStyles) {
        this.uiSettings.styles = uiStyles["board"];
        this.konvaRect.fill(this.uiSettings.styles.konvaRect.fill);
        this.konvaRect.stroke(this.uiSettings.styles.konvaRect.stroke);
        this.layer.batchDraw();
    }

    makeVisible(isVisible) {
        this.konvaRect.visible(isVisible);
        this.konvaText.visible(isVisible);
        this.isVisible = isVisible;
        this.layer.batchDraw();       
    }
}