
class LevelHeaderView {
    constructor() {

        this.layer;
        this.x;
        this.y;

        this.scrollLeftButtonRect;
        this.scrollLeftButtonText;

        this.scrollRightButtonRect;
        this.scrollRightButtonText;

        this.levelIDRect;
        this.levelIDText;

        this.levelNameRect;
        this.levelNameText;

        this.isVisible = false;
    }

    init(layer, x, y, wsName, levelNumber, levelName) {

        this.layer = layer;
        this.x = x;
        this.y = y;

        switch (wsName) {
            case "RECON":
                //  Setup scrollLeftButton display object in Konva
                var manualConfig = {
                    x: this.x,
                    y: this.y,
                    width: (LevelWidth * (LevelSettings.scrollLeftButtonRect.wPct / 100)),
                    height: (LevelHeight * (LevelSettings.scrollLeftButtonRect.hPct / 100))
                };
                var config = UISettings.getLevelConfig(manualConfig, "scrollLeftButtonRect");
                this.scrollLeftButtonRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x,
                    y: this.y,
                    width: (LevelWidth * (LevelSettings.scrollLeftButtonText.wPct / 100)),
                    height: (LevelHeight * (LevelSettings.scrollLeftButtonText.hPct / 100)),
                    text: '<'
                };
                var config = UISettings.getLevelConfig(manualConfig, "scrollLeftButtonText");
                this.scrollLeftButtonText = new Konva.Text(config);

                this.layer.add(this.scrollLeftButtonRect);
                this.layer.add(this.scrollLeftButtonText);

                //  Setup scrollRightButton display object in Konva
                var manualConfig = {
                    x: this.x,
                    y: this.y
                        + (LevelHeight * (LevelSettings.scrollLeftButtonRect.hPct / 100)),
                    width: (LevelWidth * (LevelSettings.scrollRightButtonRect.wPct / 100)),
                    height: (LevelHeight * (LevelSettings.scrollRightButtonRect.hPct / 100))
                };
                var config = UISettings.getLevelConfig(manualConfig, "scrollRightButtonRect");
                this.scrollRightButtonRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x,
                    y: this.y
                        + (LevelHeight * (LevelSettings.scrollLeftButtonRect.hPct / 100)),
                    width: (LevelWidth * (LevelSettings.scrollRightButtonText.wPct / 100)),
                    height: (LevelHeight * (LevelSettings.scrollRightButtonText.hPct / 100)),
                    text: '>'
                };
                var config = UISettings.getLevelConfig(manualConfig, "scrollRightButtonText");
                this.scrollRightButtonText = new Konva.Text(config);

                this.layer.add(this.scrollRightButtonRect);
                this.layer.add(this.scrollRightButtonText);

                //  Setup levelID display object in Konva
                var manualConfig = {
                    x: this.x
                        + (LevelWidth * (LevelSettings.scrollLeftButtonRect.wPct / 100)),
                    y: this.y,
                    width: (LevelWidth * (LevelSettings.levelIDRect.wPct / 100)),
                    height: (LevelHeight * (LevelSettings.levelIDRect.hPct / 100))
                };
                var config = UISettings.getLevelConfig(manualConfig, "levelIDRect");
                this.levelIDRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x
                        + (LevelWidth * (LevelSettings.scrollLeftButtonRect.wPct / 100)),
                    y: this.y,
                    width: (LevelWidth * (LevelSettings.levelIDText.wPct / 100)),
                    height: (LevelHeight * (LevelSettings.levelIDText.hPct / 100)),
                    text: levelNumber
                };
                var config = UISettings.getLevelConfig(manualConfig, "levelIDText");
                this.levelIDText = new Konva.Text(config);

                this.layer.add(this.levelIDRect);
                this.layer.add(this.levelIDText);

                //  Setup levelName display object in Konva
                var manualConfig = {
                    x: this.x
                        + (LevelWidth * (LevelSettings.scrollLeftButtonRect.wPct / 100)),
                    y: this.y
                        + (LevelHeight * (LevelSettings.levelIDRect.hPct / 100)),
                    width: (LevelWidth * (LevelSettings.levelNameRect.wPct / 100)),
                    height: (LevelHeight * (LevelSettings.levelNameRect.hPct / 100))
                };
                var config = UISettings.getLevelConfig(manualConfig, "levelNameRect");
                this.levelNameRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x
                        + (LevelWidth * (LevelSettings.scrollLeftButtonRect.wPct / 100)),
                    y: this.y
                        + (LevelHeight * (LevelSettings.levelIDRect.hPct / 100)),
                    width: (LevelWidth * (LevelSettings.levelNameText.wPct / 100)),
                    height: (LevelHeight * (LevelSettings.levelNameText.hPct / 100)),
                    text: levelName
                };
                var config = UISettings.getLevelConfig(manualConfig, "levelNameText");
                this.levelNameText = new Konva.Text(config);

                this.layer.add(this.levelNameRect);
                this.layer.add(this.levelNameText);

                break;
            case "SEARCH":
                //  Setup levelID display object in Konva
                var manualConfig = {
                    x: this.x,
                    y: this.y,
                    width: (LevelWidth * (LevelSettings.levelIDRect.wPct / 100)),
                    height: (LevelHeight * (LevelSettings.levelIDRect.hPct / 100))
                };
                var config = UISettings.getLevelConfig(manualConfig, "levelIDRect");
                this.levelIDRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x,
                    y: this.y,
                    width: (LevelWidth * (LevelSettings.levelIDText.wPct / 100)),
                    height: (LevelHeight * (LevelSettings.levelIDText.hPct / 100)),
                    text: levelNumber
                };
                var config = UISettings.getLevelConfig(manualConfig, "levelIDText");
                this.levelIDText = new Konva.Text(config);

                this.layer.add(this.levelIDRect);
                this.layer.add(this.levelIDText);

                //  Setup levelName display object in Konva
                var manualConfig = {
                    x: this.x,
                    y: this.y
                        + (LevelHeight * (LevelSettings.levelIDRect.hPct / 100)),
                    width: (LevelWidth * (LevelSettings.levelNameRect.wPct / 100)),
                    height: (LevelHeight * (LevelSettings.levelNameRect.hPct / 100))
                };
                var config = UISettings.getLevelConfig(manualConfig, "levelNameRect");
                this.levelNameRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x,
                    y: this.y
                        + (LevelHeight * (LevelSettings.levelIDRect.hPct / 100)),
                    width: (LevelWidth * (LevelSettings.levelNameText.wPct / 100)),
                    height: (LevelHeight * (LevelSettings.levelNameText.hPct / 100)),
                    text: levelName
                };
                var config = UISettings.getLevelConfig(manualConfig, "levelNameText");
                this.levelNameText = new Konva.Text(config);

                this.layer.add(this.levelNameRect);
                this.layer.add(this.levelNameText);

                //  Setup scrollLeftButton display object in Konva
                var manualConfig = {
                    x: this.x
                        + (LevelWidth * (LevelSettings.levelIDRect.wPct / 100)),
                    y: this.y,
                    width: (LevelWidth * (LevelSettings.scrollLeftButtonRect.wPct / 100)),
                    height: (LevelHeight * (LevelSettings.scrollLeftButtonRect.hPct / 100))
                };
                var config = UISettings.getLevelConfig(manualConfig, "scrollLeftButtonRect");
                this.scrollLeftButtonRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x
                        + (LevelWidth * (LevelSettings.levelIDRect.wPct / 100)),
                    y: this.y,
                    width: (LevelWidth * (LevelSettings.scrollLeftButtonText.wPct / 100)),
                    height: (LevelHeight * (LevelSettings.scrollLeftButtonText.hPct / 100)),
                    text: '<'
                };
                var config = UISettings.getLevelConfig(manualConfig, "scrollLeftButtonText");
                this.scrollLeftButtonText = new Konva.Text(config);

                this.layer.add(this.scrollLeftButtonRect);
                this.layer.add(this.scrollLeftButtonText);

                //  Setup scrollRightButton display object in Konva
                var manualConfig = {
                    x: this.x
                        + (LevelWidth * (LevelSettings.levelIDRect.wPct / 100)),
                    y: this.y
                        + (LevelHeight * (LevelSettings.scrollLeftButtonRect.hPct / 100)),
                    width: (LevelWidth * (LevelSettings.scrollRightButtonRect.wPct / 100)),
                    height: (LevelHeight * (LevelSettings.scrollRightButtonRect.hPct / 100))
                };
                var config = UISettings.getLevelConfig(manualConfig, "scrollRightButtonRect");
                this.scrollRightButtonRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x
                        + (LevelWidth * (LevelSettings.levelIDRect.wPct / 100)),
                    y: this.y
                        + (LevelHeight * (LevelSettings.scrollLeftButtonRect.hPct / 100)),
                    width: (LevelWidth * (LevelSettings.scrollRightButtonText.wPct / 100)),
                    height: (LevelHeight * (LevelSettings.scrollRightButtonText.hPct / 100)),
                    text: '>'
                };
                var config = UISettings.getLevelConfig(manualConfig, "scrollRightButtonText");
                this.scrollRightButtonText = new Konva.Text(config);

                this.layer.add(this.scrollRightButtonRect);
                this.layer.add(this.scrollRightButtonText);

                break;
        }

    }

    makeVisible(isVisible) {

        // Make the headerView itself visible/not-visible
        if (isVisible) {

            this.scrollLeftButtonRect.show();
            this.scrollLeftButtonText.show();


            this.scrollRightButtonRect.show();
            this.scrollRightButtonText.show();

            this.levelIDRect.show();
            this.levelIDText.show();

            this.levelNameRect.show();
            this.levelNameText.show();

        } else {

            this.scrollLeftButtonRect.hide();
            this.scrollLeftButtonText.hide();

            this.scrollRightButtonRect.hide();
            this.scrollRightButtonText.hide();

            this.levelIDRect.hide();
            this.levelIDText.hide();

            this.levelNameRect.hide();
            this.levelNameText.hide();
        }

        this.layer.batchDraw();
        this.isVisible = isVisible;
    }
}