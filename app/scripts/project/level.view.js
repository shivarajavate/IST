
class LevelView {
    constructor() {

        this.uiSettings;

        this.headerView;
        this.boardView;

        this.isVisible = false;
    }

    init(layer, x, y, w, h, wsName, levelNumber, levelName, template, uiSettings, sectionAreaSettings) {

        this.uiSettings = {
            styles: uiSettings.styles["level"],
            properties: uiSettings.properties["level"],
            getConfig: uiSettings.getConfig["level"]
        };

        switch (wsName) {
            case "RECON":
                this.boardView = new LevelBoardView();
                this.boardView.init(layer, x, y, w, h, wsName, levelName, template, uiSettings, sectionAreaSettings);

                // Calculate the (x,y) for headerView
                var hvX = x
                    + (w * (this.uiSettings.properties.boardViewRect.wPct / 100));
                var hvY = y;

                this.headerView = new LevelHeaderView();
                this.headerView.init(layer, hvX, hvY, w, h, wsName, levelNumber, levelName, uiSettings);
                break;

            case "SEARCH":
                // Calculate the (x,y) for BoardView
                var bvX = x
                    + (w * (this.uiSettings.properties.scrollLeftButtonRect.wPct / 100))
                    + (w * (this.uiSettings.properties.levelIDRect.wPct / 100));
                var bvY = y;

                this.boardView = new LevelBoardView();
                this.boardView.init(layer, bvX, bvY, w, h, wsName, levelName, template, uiSettings, sectionAreaSettings);

                this.headerView = new LevelHeaderView();
                this.headerView.init(layer, x, y, w, h, wsName, levelNumber, levelName, uiSettings);
                break;
        }


    }

    applyTheme(uiStyles) {
        this.uiSettings.styles = uiStyles["level"];
        this.headerView.applyTheme(uiStyles);
        this.boardView.applyTheme(uiStyles);
    }

    makeVisible(isVisible) {
        this.headerView.makeVisible(isVisible);
        this.boardView.makeVisible(isVisible);

        var isScrollable = isVisible && (this.boardView.noOfSections > this.boardView.noOfSectionAreas);
        this.headerView.makeScrollbarVisible(isScrollable);

        this.isVisible = isVisible;
    }
}