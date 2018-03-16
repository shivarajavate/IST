
class LevelBoardView {
    constructor() {

        this.layer;
        this.x;
        this.y;

        this.boardViewRect;

        this.sectionCollection = [];
        this.sectionAreaCollection = [];
        this.noOfSections = 0;
        this.noOfSectionAreas = 0;

        this.isVisible = false;
    }

    init(layer, x, y, wsName, templateJSON, valueJSON) {
        // Draw the outer box for BoardView (Konva Rect)
        // Calculate #sectionAreas that can be created in a view & store in #noOfSectionAreas
        // Now create that many sectionAreas that represent 'a-section' coordinates in a loop
        // Now create all the sections based on the templateJSON and hide them
        // and store in sectionCollection object
        // then Populate the sectionCollection in the section area based on noOfSectionAreas available
        this.layer = layer;
        this.x = x;
        this.y = y;

        // Draw the outer box for BoardView (Konva Rect)
        var manualConfig = {
            x: this.x,
            y: this.y,
            width: (LevelWidth * (LevelSettings.boardViewRect.wPct / 100)),
            height: (LevelHeight * (LevelSettings.boardViewRect.hPct / 100))
        };
        var config = UISettings.getLevelConfig(manualConfig, "boardViewRect");
        this.boardViewRect = new Konva.Rect(config);

        this.layer.add(this.boardViewRect);

        // Calculate #sectionAreas that can be created in a view & store in #noOfSectionAreas
        // Now create that many sectionAreas that represent 'a-section' coordinates in a loop
        var secAreaMaxW = this.x + (LevelWidth * (LevelSettings.boardViewRect.wPct / 100));
        var newSecAreaX = this.x;
        var newSecAreaY = this.y;
        var newSectionID = -1;

        for (var i = 0; (newSecAreaX + SectionWidth) <= secAreaMaxW; ++i) {

            this.sectionAreaCollection[i] = new SectionArea();
            this.sectionAreaCollection[i].init(newSecAreaX, newSecAreaY, newSectionID);

            newSecAreaX = newSecAreaX + SectionWidth;

            ++this.noOfSectionAreas;
        }
        // Now create all the sections based on the templateJSON and hide them
        // and store in sectionCollection object
        for (var i = 0; i < templateJSON.length; ++i) {

            this.sectionCollection[i] = new Section();

            var secX = this.x + (i * SectionWidth);
            var secY = this.y;
            var isVisible = false;

            this.sectionCollection[i].init(layer, secX, secY, templateJSON[i], valueJSON[i], isVisible);
            ++this.noOfSections;
        }

        switch (wsName) {
            case "RECON":
                // Populate the sectionCollection in the section area based on noOfSectionAreas available
                if (this.noOfSectionAreas <= this.noOfSections) {

                    for (var i = 0; i < this.noOfSectionAreas; ++i) {

                        var newX = this.sectionAreaCollection[i].x;
                        var newY = this.sectionAreaCollection[i].y;

                        // NOTE: Hide the section from the view that before relocate
                        this.sectionCollection[i].view.makeVisible(false);
                        this.sectionCollection[i].view.relocateAt(newX, newY);
                        this.sectionCollection[i].view.makeVisible(true);

                        this.sectionAreaCollection[i].sectionID = i;
                    }
                } else {

                    for (var i = 0; i < this.noOfSections; ++i) {

                        var secAreaID = (this.noOfSectionAreas - this.noOfSections) + i;
                        var newX = this.sectionAreaCollection[secAreaID].x;
                        var newY = this.sectionAreaCollection[secAreaID].y;

                        // NOTE: Hide the section from the view that before relocate
                        this.sectionCollection[i].view.makeVisible(false);
                        this.sectionCollection[i].view.relocateAt(newX, newY);
                        this.sectionCollection[i].view.makeVisible(true);

                        this.sectionAreaCollection[secAreaID].sectionID = i;
                    }
                }
                break;
            case "SEARCH":
                // Populate the sectionCollection in the section area based on noOfSectionAreas available
                if (this.noOfSectionAreas <= this.noOfSections) {

                    for (var i = 0; i < this.noOfSectionAreas; ++i) {

                        var newX = this.sectionAreaCollection[i].x;
                        var newY = this.sectionAreaCollection[i].y;

                        // NOTE: Hide the section from the view that before relocate
                        this.sectionCollection[i].view.makeVisible(false);
                        this.sectionCollection[i].view.relocateAt(newX, newY);
                        this.sectionCollection[i].view.makeVisible(true);

                        this.sectionAreaCollection[i].sectionID = i;
                    }
                } else {

                    for (var i = 0; i < this.noOfSections; ++i) {

                        var newX = this.sectionAreaCollection[i].x;
                        var newY = this.sectionAreaCollection[i].y;

                        // NOTE: Hide the section from the view that before relocate
                        this.sectionCollection[i].view.makeVisible(false);
                        this.sectionCollection[i].view.relocateAt(newX, newY);
                        this.sectionCollection[i].view.makeVisible(true);

                        this.sectionAreaCollection[i].sectionID = i;
                    }
                }
                break;
        }

    }

    displaySectionAt(secAreaID, newSectionID) {
        // Basically we are overwriting the section on this sectionArea
        var newX = this.sectionAreaCollection[secAreaID].x;
        var newY = this.sectionAreaCollection[secAreaID].y;

        // NOTE: Hide the section from the view that before relocate
        this.sectionCollection[newSectionID].view.makeVisible(false);

        this.sectionCollection[newSectionID].view.relocateAt(newX, newY);
        this.sectionCollection[newSectionID].view.makeVisible(true);

        this.sectionAreaCollection[secAreaID].sectionID = newSectionID;
    }

    displaySectionAtStart(newSectionID) {
        // Well, we are inserting a new Section at the beginning
        // Move the SectionArea contents (if any) from the first area to second area and so on
        // Now attach this Section to the first SectionArea

        // There are 3-scenarios
        // 1. No areas are filled
        // 2. Some areas are filled
        // 3. All areas are filled

        if (this.noOfSectionAreas < this.noOfSections) {
            // 3. All areas are filled
            for (var i = this.noOfSectionAreas - 1; i >= 0; --i) {
                var currX = this.sectionAreaCollection[i].x;
                var currY = this.sectionAreaCollection[i].y;
                var currSecID = this.sectionAreaCollection[i].sectionID;

                // NOTE: Hide the section from the view that before relocate
                this.sectionCollection[currSecID].view.makeVisible(false);

                // Attach the section only if there is an adjacent area available 
                if (this.sectionAreaCollection[i + 1]) {
                    var nextX = this.sectionAreaCollection[i + 1].x;
                    var nextY = this.sectionAreaCollection[i + 1].y;

                    this.sectionCollection[currSecID].view.relocateAt(nextX, nextY);
                    this.sectionCollection[currSecID].view.makeVisible(true);

                    this.sectionAreaCollection[i + 1].sectionID = currSecID;
                }
            }
            this.displaySectionAt(0, newSectionID);
        }
    }

    displaySectionAtEnd(newSectionID) {
        // Well, we are appending a new section to the end
        // Move the SectionArea contents (if any) from the last area to last but one and so on
        // Now attach this section to the last SectionArea

        // There are 3-scenarios
        // 1. No areas are filled
        // 2. Some areas are filled
        // 3. All areas are filled

        if (this.noOfSectionAreas < this.noOfSections) {
            // 3. All areas are filled 
            for (var i = 0; i < this.noOfSectionAreas - 1; ++i) {
                var nextX = this.sectionAreaCollection[i + 1].x;
                var nextY = this.sectionAreaCollection[i + 1].y;
                var nextSecID = this.sectionAreaCollection[i + 1].sectionID;

                var currX = this.sectionAreaCollection[i].x;
                var currY = this.sectionAreaCollection[i].y;

                // NOTE: Hide the section from the view that before relocate
                this.sectionCollection[nextSecID].view.makeVisible(false);

                this.sectionCollection[nextSecID].view.relocateAt(currX, currY);
                this.sectionCollection[nextSecID].view.makeVisible(true);

                this.sectionAreaCollection[i].sectionID = nextSecID;
            }
            this.displaySectionAt(this.noOfSectionAreas - 1, newSectionID);
        }
    }

    makeVisible(isVisible) {

        // Make the boardView itself visible/not-visible
        if (isVisible) {
            this.boardViewRect.show();
        } else {
            this.boardViewRect.hide();
        }

        // Make all the associated 'sections' visible/not-visible
        if (this.noOfSectionAreas <= this.noOfSections) {

            for (var i = 0; i < this.noOfSections; ++i) {
                this.sectionCollection[i].view.makeVisible(false);
            }

            for (var i = 0; i < this.noOfSectionAreas; ++i) {
                var sectionID = this.sectionAreaCollection[i].sectionID;
                this.sectionCollection[sectionID].view.makeVisible(isVisible);
            }
        } else {

            for (var i = 0; i < this.noOfSections; ++i) {
                this.sectionCollection[i].view.makeVisible(isVisible);
            }
        }

        this.layer.batchDraw();
        this.isVisible = isVisible;
    }

}