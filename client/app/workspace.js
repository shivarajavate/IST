
class Workspace {
    constructor() {

        this.layer;
        this.x;
        this.y;

        this.wsName;

        this.levelCollection = [];
        this.noOfLevels = 0;

        this.isVisible = false;
    }

    init(layer, x, y, wsName, templateJSON, valueJSON) {

        this.layer = layer;
        this.x = x;
        this.y = y;

        this.wsName = wsName;

        this.noOfLevels = templateJSON.length;

        for (var i = 0; i < this.noOfLevels; ++i) {

            this.levelCollection[i] = new Level();

            var levelX = this.x;
            var levelY = this.y + (i * LevelHeight);

            this.levelCollection[i].init(layer, levelX, levelY, wsName, templateJSON[i], valueJSON[i]);
        }
    }

    makeVisible(isVisible) {

        for (var i = 0; i < this.noOfLevels; ++i) {
            this.levelCollection[i].view.makeVisible(isVisible);
        }
        this.isVisible = isVisible;
    }

}
