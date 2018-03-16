
class SessionView {
    constructor() {

        this.headerView;
        this.boardView;

        this.isVisible = false;
    }

    init(layer, x, y, wsName, templateJSON, valueJSON) {


        this.headerView = new SessionHeaderView();
        this.headerView.init(layer, x, y, wsName);

        // Calculate the (x,y) for BoardView
        var bvX = x;
        var bvY = y
            + (SessionHeight * (SessionSettings.scrollLeftButtonRect.hPct / 100));

        this.boardView = new SessionBoardView();
        this.boardView.init(layer, bvX, bvY, wsName, templateJSON, valueJSON);
    }

    makeVisible(isVisible) {
        this.headerView.makeVisible(isVisible);
        this.boardView.makeVisible(isVisible);
        this.isVisible = isVisible;
    }
}