
class LevelHeaderView {
    constructor() {

        this.layer;
        this.x;
        this.y;
        this.w;
        this.h;
        this.uiSettings;

        this.scrollLeftButtonRect;
        this.scrollLeftButtonText;

        this.scrollRightButtonRect;
        this.scrollRightButtonText;

        this.levelIDRect;
        this.levelIDText;

        this.levelNameRect;
        this.levelNameText;

        this.isVisible = false;
        this.isScrollable = false;
    }

    init(layer, x, y, w, h, wsName, levelNumber, levelName, uiSettings) {

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

        switch (wsName) {
            case "RECON":
                //  Setup scrollLeftButton display object in Konva
                var manualConfig = {
                    x: this.x,
                    y: this.y,
                    width: (this.w * (this.uiSettings.properties.scrollLeftButtonRect.wPct / 100)),
                    height: (this.h * (this.uiSettings.properties.scrollLeftButtonRect.hPct / 100))
                };
                var config = this.uiSettings.getConfig(manualConfig, "scrollLeftButtonRect");
                this.scrollLeftButtonRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x,
                    y: this.y,
                    width: (this.w * (this.uiSettings.properties.scrollLeftButtonText.wPct / 100)),
                    height: (this.h * (this.uiSettings.properties.scrollLeftButtonText.hPct / 100))
                };
                var config = this.uiSettings.getConfig(manualConfig, "scrollLeftButtonText");
                this.scrollLeftButtonText = new Konva.Text(config);

                this.layer.add(this.scrollLeftButtonRect);
                this.layer.add(this.scrollLeftButtonText);

                //  Setup scrollRightButton display object in Konva
                var manualConfig = {
                    x: this.x,
                    y: this.y
                        + (this.h * (this.uiSettings.properties.scrollLeftButtonRect.hPct / 100)),
                    width: (this.w * (this.uiSettings.properties.scrollRightButtonRect.wPct / 100)),
                    height: (this.h * (this.uiSettings.properties.scrollRightButtonRect.hPct / 100))
                };
                var config = this.uiSettings.getConfig(manualConfig, "scrollRightButtonRect");
                this.scrollRightButtonRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x,
                    y: this.y
                        + (this.h * (this.uiSettings.properties.scrollLeftButtonRect.hPct / 100)),
                    width: (this.w * (this.uiSettings.properties.scrollRightButtonText.wPct / 100)),
                    height: (this.h * (this.uiSettings.properties.scrollRightButtonText.hPct / 100))
                };
                var config = this.uiSettings.getConfig(manualConfig, "scrollRightButtonText");
                this.scrollRightButtonText = new Konva.Text(config);

                this.layer.add(this.scrollRightButtonRect);
                this.layer.add(this.scrollRightButtonText);

                //  Setup levelID display object in Konva
                var manualConfig = {
                    x: this.x
                        + (this.w * (this.uiSettings.properties.scrollLeftButtonRect.wPct / 100)),
                    y: this.y,
                    width: (this.w * (this.uiSettings.properties.levelIDRect.wPct / 100)),
                    height: (this.h * (this.uiSettings.properties.levelIDRect.hPct / 100))
                };
                var config = this.uiSettings.getConfig(manualConfig, "levelIDRect");
                this.levelIDRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x
                        + (this.w * (this.uiSettings.properties.scrollLeftButtonRect.wPct / 100)),
                    y: this.y,
                    width: (this.w * (this.uiSettings.properties.levelIDText.wPct / 100)),
                    height: (this.h * (this.uiSettings.properties.levelIDText.hPct / 100)),
                    text: levelNumber
                };
                var config = this.uiSettings.getConfig(manualConfig, "levelIDText");
                this.levelIDText = new Konva.Text(config);

                this.layer.add(this.levelIDRect);
                this.layer.add(this.levelIDText);

                //  Setup levelName display object in Konva
                var manualConfig = {
                    x: this.x
                        + (this.w * (this.uiSettings.properties.scrollLeftButtonRect.wPct / 100)),
                    y: this.y
                        + (this.h * (this.uiSettings.properties.levelIDRect.hPct / 100)),
                    width: (this.w * (this.uiSettings.properties.levelNameRect.wPct / 100)),
                    height: (this.h * (this.uiSettings.properties.levelNameRect.hPct / 100))
                };
                var config = this.uiSettings.getConfig(manualConfig, "levelNameRect");
                this.levelNameRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x
                        + (this.w * (this.uiSettings.properties.scrollLeftButtonRect.wPct / 100)),
                    y: this.y
                        + (this.h * (this.uiSettings.properties.levelIDRect.hPct / 100)),
                    width: (this.w * (this.uiSettings.properties.levelNameText.wPct / 100)),
                    height: (this.h * (this.uiSettings.properties.levelNameText.hPct / 100)),
                    text: levelName
                };
                var config = this.uiSettings.getConfig(manualConfig, "levelNameText");
                this.levelNameText = new Konva.Text(config);

                this.layer.add(this.levelNameRect);
                this.layer.add(this.levelNameText);

                break;
            case "SEARCH":
                //  Setup levelID display object in Konva
                var manualConfig = {
                    x: this.x,
                    y: this.y,
                    width: (this.w * (this.uiSettings.properties.levelIDRect.wPct / 100)),
                    height: (this.h * (this.uiSettings.properties.levelIDRect.hPct / 100))
                };
                var config = this.uiSettings.getConfig(manualConfig, "levelIDRect");
                this.levelIDRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x,
                    y: this.y,
                    width: (this.w * (this.uiSettings.properties.levelIDText.wPct / 100)),
                    height: (this.h * (this.uiSettings.properties.levelIDText.hPct / 100)),
                    text: levelNumber
                };
                var config = this.uiSettings.getConfig(manualConfig, "levelIDText");
                this.levelIDText = new Konva.Text(config);

                this.layer.add(this.levelIDRect);
                this.layer.add(this.levelIDText);

                //  Setup levelName display object in Konva
                var manualConfig = {
                    x: this.x,
                    y: this.y
                        + (this.h * (this.uiSettings.properties.levelIDRect.hPct / 100)),
                    width: (this.w * (this.uiSettings.properties.levelNameRect.wPct / 100)),
                    height: (this.h * (this.uiSettings.properties.levelNameRect.hPct / 100))
                };
                var config = this.uiSettings.getConfig(manualConfig, "levelNameRect");
                this.levelNameRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x,
                    y: this.y
                        + (this.h * (this.uiSettings.properties.levelIDRect.hPct / 100)),
                    width: (this.w * (this.uiSettings.properties.levelNameText.wPct / 100)),
                    height: (this.h * (this.uiSettings.properties.levelNameText.hPct / 100)),
                    text: levelName
                };
                var config = this.uiSettings.getConfig(manualConfig, "levelNameText");
                this.levelNameText = new Konva.Text(config);

                this.layer.add(this.levelNameRect);
                this.layer.add(this.levelNameText);

                //  Setup scrollLeftButton display object in Konva
                var manualConfig = {
                    x: this.x
                        + (this.w * (this.uiSettings.properties.levelIDRect.wPct / 100)),
                    y: this.y,
                    width: (this.w * (this.uiSettings.properties.scrollLeftButtonRect.wPct / 100)),
                    height: (this.h * (this.uiSettings.properties.scrollLeftButtonRect.hPct / 100))
                };
                var config = this.uiSettings.getConfig(manualConfig, "scrollLeftButtonRect");
                this.scrollLeftButtonRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x
                        + (this.w * (this.uiSettings.properties.levelIDRect.wPct / 100)),
                    y: this.y,
                    width: (this.w * (this.uiSettings.properties.scrollLeftButtonText.wPct / 100)),
                    height: (this.h * (this.uiSettings.properties.scrollLeftButtonText.hPct / 100))
                };
                var config = this.uiSettings.getConfig(manualConfig, "scrollLeftButtonText");
                this.scrollLeftButtonText = new Konva.Text(config);

                this.layer.add(this.scrollLeftButtonRect);
                this.layer.add(this.scrollLeftButtonText);

                //  Setup scrollRightButton display object in Konva
                var manualConfig = {
                    x: this.x
                        + (this.w * (this.uiSettings.properties.levelIDRect.wPct / 100)),
                    y: this.y
                        + (this.h * (this.uiSettings.properties.scrollLeftButtonRect.hPct / 100)),
                    width: (this.w * (this.uiSettings.properties.scrollRightButtonRect.wPct / 100)),
                    height: (this.h * (this.uiSettings.properties.scrollRightButtonRect.hPct / 100))
                };
                var config = this.uiSettings.getConfig(manualConfig, "scrollRightButtonRect");
                this.scrollRightButtonRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x
                        + (this.w * (this.uiSettings.properties.levelIDRect.wPct / 100)),
                    y: this.y
                        + (this.h * (this.uiSettings.properties.scrollLeftButtonRect.hPct / 100)),
                    width: (this.w * (this.uiSettings.properties.scrollRightButtonText.wPct / 100)),
                    height: (this.h * (this.uiSettings.properties.scrollRightButtonText.hPct / 100))
                };
                var config = this.uiSettings.getConfig(manualConfig, "scrollRightButtonText");
                this.scrollRightButtonText = new Konva.Text(config);

                this.layer.add(this.scrollRightButtonRect);
                this.layer.add(this.scrollRightButtonText);

                break;
        }

    }

    applyTheme(uiStyles) {

        this.uiSettings.styles = uiStyles["level"];
        this.scrollLeftButtonRect.fill(this.uiSettings.styles.scrollLeftButtonRect.fill);
        this.scrollLeftButtonRect.stroke(this.uiSettings.styles.scrollLeftButtonRect.stroke);

        this.scrollLeftButtonText.fill(this.uiSettings.styles.scrollLeftButtonText.fill);
        this.scrollLeftButtonText.stroke(this.uiSettings.styles.scrollLeftButtonText.stroke);

        this.scrollRightButtonRect.fill(this.uiSettings.styles.scrollRightButtonRect.fill);
        this.scrollRightButtonRect.stroke(this.uiSettings.styles.scrollRightButtonRect.stroke);

        this.levelIDRect.fill(this.uiSettings.styles.levelIDRect.fill);
        this.levelIDRect.stroke(this.uiSettings.styles.levelIDRect.stroke);

        this.levelIDText.fill(this.uiSettings.styles.levelIDText.fill);
        this.levelIDText.stroke(this.uiSettings.styles.levelIDText.stroke);

        this.levelNameRect.fill(this.uiSettings.styles.levelNameRect.fill);
        this.levelNameRect.stroke(this.uiSettings.styles.levelNameRect.stroke);

        this.levelNameText.fill(this.uiSettings.styles.levelNameText.fill);
        this.levelNameText.stroke(this.uiSettings.styles.levelNameText.stroke);

        this.layer.batchDraw();
    }

    makeScrollbarVisible(isScrollable) {
        this.scrollLeftButtonText.visible(isScrollable);
        this.scrollRightButtonText.visible(isScrollable);
        this.layer.batchDraw();
        this.isScrollable = isScrollable;
    }

    makeVisible(isVisible) {

        // Make the headerView itself visible/not-visible
        this.scrollLeftButtonRect.visible(isVisible);
        this.scrollLeftButtonText.visible(isVisible);
        this.scrollRightButtonRect.visible(isVisible);
        this.scrollRightButtonText.visible(isVisible);
        this.levelIDRect.visible(isVisible);
        this.levelIDText.visible(isVisible);
        this.levelNameRect.visible(isVisible);
        this.levelNameText.visible(isVisible);

        this.layer.batchDraw();
        this.isVisible = isVisible;
        this.isScrollable = isVisible;
    }
}