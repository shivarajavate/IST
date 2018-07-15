
class SectionView {
    constructor() {

        this.layer;
        this.x;
        this.y;
        this.w;
        this.h;
        this.secName;
        this.uiSettings;

        this.headerView;
        this.boardView;

        this.isVisible = false;
    }

    init(layer, x, y, w, h, margin, secName, uiSettings) {

        this.layer = layer;
        this.x = x + margin;
        this.y = y + margin;
        this.w = w - (margin * 2);
        this.h = h - (margin * 2);
        this.secName = secName;
        this.uiSettings = {
            styles: uiSettings.styles["section"],
            properties: uiSettings.properties["section"],
            getConfig: uiSettings.getConfig["section"]
        };

        // Init HeaderView part of SectionView
        this.headerView = new SectionHeaderView();
        this.headerView.init(this.layer, this.x, this.y, this.w, this.h, this.secName, uiSettings);

        // Calculate the (x,y) for BoardView
        var bvX = this.x;
        var bvY = this.y + (this.h * (this.uiSettings.properties.secNameRect.hPct / 100));
        var bvW = this.w * (this.uiSettings.properties.boardViewRect.wPct / 100);
        var bvH = this.h * (this.uiSettings.properties.boardViewRect.hPct / 100)
        // Init Boardview part of SectionView
        this.boardView = new SectionBoardView();
        this.boardView.init(this.layer, bvX, bvY, bvW, bvH, uiSettings);
    }

    relocateAt(newX, newY) {
        this.makeVisible(false);

        this.headerView.relocateAt(newX, newY);

        var newBvX = newX;
        var newBvY = newY
            + (this.h * (this.uiSettings.properties.secNameRect.hPct / 100));

        this.boardView.relocateAt(newBvX, newBvY);

        this.x = newX;
        this.y = newY;

        this.makeVisible(true);
    }

    applyTheme(uiStyles) {

        this.uiSettings.styles = uiStyles["section"];
        this.headerView.applyTheme(uiStyles);
        this.boardView.applyTheme(uiStyles);
    }

    makeVisible(isVisible, isLeftScrollable = false, isRightScrollable = false) {
        this.headerView.makeVisible(isVisible);
        this.boardView.makeVisible(isVisible);
        this.isVisible = isVisible;
    }
}