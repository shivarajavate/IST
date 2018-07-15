
class LevelBoardView {
    constructor() {

        this.layer;
        this.x;
        this.y;
        this.w;
        this.h;
        this.uiSettings;
        this.sectionW;
        this.sectionH;

        this.boardViewRect;

        this.sectionCollection = [];
        this.noOfSections = 0;

        this.noOfSectionAreas = 0;

        this.isVisible = false;
    }

    init(layer, x, y, w, h, wsName, levelName, template, uiSettings, sectionAreaSettings) {
        // Draw the outer box for BoardView (Konva Rect)
        // Now create all the sections based on the template and hide them
        // and store in sectionCollection object
        // then Populate the sectionCollection in the section area based on noOfSectionAreas available
        this.layer = layer;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.uiSettings = {
            styles: uiSettings.styles["level"],
            properties: uiSettings.properties["level"],
            getConfig: uiSettings.getConfig["level"]
        };

        var boardViewWidth = (this.w * (this.uiSettings.properties.boardViewRect.wPct / 100));
        var boardViewHeight = (this.h * (this.uiSettings.properties.boardViewRect.hPct / 100));

        this.sectionW = (boardViewWidth * (sectionAreaSettings.wPct / 100));
        this.sectionH = (boardViewHeight * (sectionAreaSettings.hPct / 100));

        this.noOfSections = template.length;
        this.noOfSectionAreas = sectionAreaSettings.noOfSectionAreas;

        // Draw the outer box for BoardView (Konva Rect)
        var manualConfig = {
            x: this.x,
            y: this.y,
            width: (this.w * (this.uiSettings.properties.boardViewRect.wPct / 100)),
            height: (this.h * (this.uiSettings.properties.boardViewRect.hPct / 100))
        };
        var config = this.uiSettings.getConfig(manualConfig, "boardViewRect");
        this.boardViewRect = new Konva.Rect(config);

        this.layer.add(this.boardViewRect);

        // Now create all the sections based on the template and hide them
        // and store in sectionCollection object

        // NOTE: sectionStartIndex contains the index from where the sections start
        var sectionStartIndex = 0;
        if (wsName === "RECON") {
            if (this.noOfSectionAreas > this.noOfSections) {
                sectionStartIndex = (this.noOfSectionAreas - this.noOfSections);
            }
        }

        for (var i = 0; i < this.noOfSections; ++i) {

            var x = this.x + ((sectionStartIndex + i) * this.sectionW);
            var y = this.y;
            var w = this.sectionW;
            var h = this.sectionH;
            var margin = sectionAreaSettings.margin;

            this.sectionCollection[i] = new Section();
            this.sectionCollection[i].init(layer, x, y, w, h, margin, wsName, levelName, template[i], uiSettings, false);
        }
    }

    displaySectionAtStart() {
        // Relocate all sections to right by one section slot
        var boardView = this;
        boardView.sectionCollection.forEach(function (section) {
            var newX = section.view.x + boardView.sectionW;
            var newY = section.view.y;
            section.view.relocateAt(newX, newY);
        });
    }

    displaySectionAtEnd() {
        // Relocate all sections to left by one section slot
        var boardView = this;
        boardView.sectionCollection.forEach(function (section) {
            var newX = section.view.x - boardView.sectionW;
            var newY = section.view.y;
            section.view.relocateAt(newX, newY);
        });
    }

    slideSectionsToRight() {
        // Slide all sections to right by one section slot
        var boardView = this;

        var iterationNo = 0;
        var iterationLimit = 20;

        var slideRight = new Konva.Animation(function () {
            if (iterationNo === iterationLimit) {
                this.stop();
                return;
            }

            boardView.sectionCollection.forEach(function (section) {
                var newX = section.view.x + (boardView.sectionW / iterationLimit);
                var newY = section.view.y;
                section.view.relocateAt(newX, newY);
            });

            ++iterationNo;
        });
        slideRight.start();
    }

    slideSectionsToLeft() {
        // Slide all sections to left by one section slot
        var boardView = this;

        var iterationNo = 0;
        var iterationLimit = 20;

        var slideLeft = new Konva.Animation(function () {
            if (iterationNo === iterationLimit) {
                this.stop();
                return;
            }

            boardView.sectionCollection.forEach(function (section) {
                var newX = section.view.x - (boardView.sectionW / iterationLimit);
                var newY = section.view.y;
                section.view.relocateAt(newX, newY);
            });

            ++iterationNo;
        });
        slideLeft.start();
    }

    applyTheme(uiStyles) {
        
        this.uiSettings.styles = uiStyles["level"];
        this.boardViewRect.fill(this.uiSettings.styles.boardViewRect.fill);
        this.boardViewRect.stroke(this.uiSettings.styles.boardViewRect.stroke);

        this.sectionCollection.forEach(function (section) {
            section.view.applyTheme(uiStyles);
        });

        this.layer.batchDraw();
    }

    makeVisible(isVisible) {

        // Make the boardView itself visible/not-visible
        this.boardViewRect.visible(isVisible);

        for (var i = 0; i < this.noOfSections; ++i) {
            this.sectionCollection[i].view.makeVisible(isVisible);
        }

        this.layer.batchDraw();
        this.isVisible = isVisible;
    }

}