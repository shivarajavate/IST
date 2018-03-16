
class LevelView {
    constructor() {

        this.headerView;
        this.boardView;

        this.isVisible = false;
    }

    init(layer, x, y, wsName, levelNumber, levelName, templateJSON, valueJSON) {

        switch (wsName) {
            case "RECON":
                this.boardView = new LevelBoardView();
                this.boardView.init(layer, x, y, wsName, templateJSON, valueJSON);

                // Calculate the (x,y) for headerView
                var hvX = x
                    + (LevelWidth * (LevelSettings.boardViewRect.wPct / 100));
                var hvY = y;

                this.headerView = new LevelHeaderView();
                this.headerView.init(layer, hvX, hvY, wsName, levelNumber, levelName);
                break;

            case "SEARCH":
                this.headerView = new LevelHeaderView();
                this.headerView.init(layer, x, y, wsName, levelNumber, levelName);

                // Calculate the (x,y) for BoardView
                var bvX = x
                    + (LevelWidth * (LevelSettings.scrollLeftButtonRect.wPct / 100))
                    + (LevelWidth * (LevelSettings.levelIDRect.wPct / 100));
                var bvY = y;

                this.boardView = new LevelBoardView();
                this.boardView.init(layer, bvX, bvY, wsName, templateJSON, valueJSON);
                break;
        }


    }

    makeVisible(isVisible) {
        this.headerView.makeVisible(isVisible);
        this.boardView.makeVisible(isVisible);
        this.isVisible = isVisible;
    }
}