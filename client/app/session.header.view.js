
class SessionHeaderView {
    constructor() {

        this.layer;
        this.x;
        this.y;

        this.scrollLeftButtonRect;
        this.scrollLeftButtonText;

        this.wsNameRect;
        this.wsNameText;

        this.scrollRightButtonRect;
        this.scrollRightButtonText;

        this.wsNames = ["Reconnaissance Workspace", "Search Workspace"];

        this.isVisible = false;
    }

    init(layer, x, y, wsName) {

        this.layer = layer;
        this.x = x;
        this.y = y;

        //  Setup scrollLeftButton display object in Konva
        var manualConfig = {
            x: this.x,
            y: this.y,
            width: (SessionWidth * (SessionSettings.scrollLeftButtonRect.wPct / 100)),
            height: (SessionHeight * (SessionSettings.scrollLeftButtonRect.hPct / 100))
        };
        var config = UISettings.getSessionConfig(manualConfig, "scrollLeftButtonRect");
        this.scrollLeftButtonRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x,
            y: this.y,
            width: (SessionWidth * (SessionSettings.scrollLeftButtonText.wPct / 100)),
            height: (SessionHeight * (SessionSettings.scrollLeftButtonText.hPct / 100)),
            text: '<'
        };
        var config = UISettings.getSessionConfig(manualConfig, "scrollLeftButtonText");
        this.scrollLeftButtonText = new Konva.Text(config);

        this.layer.add(this.scrollLeftButtonRect);
        this.layer.add(this.scrollLeftButtonText);

        //  Setup wsName display object in Konva
        var manualConfig = {
            x: this.x
                + (SessionWidth * (SessionSettings.scrollLeftButtonRect.wPct / 100)),
            y: this.y,
            width: (SessionWidth * (SessionSettings.wsNameRect.wPct / 100)),
            height: (SessionHeight * (SessionSettings.wsNameRect.hPct / 100))
        };
        var config = UISettings.getSessionConfig(manualConfig, "wsNameRect");
        this.wsNameRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x
                + (SessionWidth * (SessionSettings.scrollLeftButtonRect.wPct / 100)),
            y: this.y,
            width: (SessionWidth * (SessionSettings.wsNameText.wPct / 100)),
            height: (SessionHeight * (SessionSettings.wsNameText.hPct / 100)),
            text: wsName
        };
        var config = UISettings.getSessionConfig(manualConfig, "wsNameText");
        this.wsNameText = new Konva.Text(config);

        this.layer.add(this.wsNameRect);
        this.layer.add(this.wsNameText);

        //  Setup scrollRightButton display object in Konva
        var manualConfig = {
            x: this.x
                + (SessionWidth * (SessionSettings.scrollLeftButtonRect.wPct / 100))
                + (SessionWidth * (SessionSettings.wsNameRect.wPct / 100)),
            y: this.y,
            width: (SessionWidth * (SessionSettings.scrollRightButtonRect.wPct / 100)),
            height: (SessionHeight * (SessionSettings.scrollRightButtonRect.hPct / 100))
        };
        var config = UISettings.getSessionConfig(manualConfig, "scrollRightButtonRect");
        this.scrollRightButtonRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x
                + (SessionWidth * (SessionSettings.scrollLeftButtonRect.wPct / 100))
                + (SessionWidth * (SessionSettings.wsNameRect.wPct / 100)),
            y: this.y,
            width: (SessionWidth * (SessionSettings.scrollRightButtonText.wPct / 100)),
            height: (SessionHeight * (SessionSettings.scrollRightButtonText.hPct / 100)),
            text: '>'
        };
        var config = UISettings.getSessionConfig(manualConfig, "scrollRightButtonText");
        this.scrollRightButtonText = new Konva.Text(config);

        this.layer.add(this.scrollRightButtonRect);
        this.layer.add(this.scrollRightButtonText);
    }

    setWorkspaceName(workspaceID) {
        this.wsNameText.setText(this.wsNames[workspaceID]);
        this.layer.batchDraw();
    }

    makeVisible(isVisible) {

        // Make the headerView itself visible/not-visible
        if (isVisible) {

            this.scrollLeftButtonRect.show();
            this.scrollLeftButtonText.show();

            this.wsNameRect.show();
            this.wsNameText.show();

            this.scrollRightButtonRect.show();
            this.scrollRightButtonText.show();
        } else {

            this.scrollLeftButtonRect.hide();
            this.scrollLeftButtonText.hide();

            this.wsNameRect.hide();
            this.wsNameText.hide();

            this.scrollRightButtonRect.hide();
            this.scrollRightButtonText.hide();
        }

        this.layer.batchDraw();
        this.isVisible = isVisible;
    }
}