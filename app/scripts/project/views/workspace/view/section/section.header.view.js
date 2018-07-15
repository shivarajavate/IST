
class SectionHeaderView {
    constructor() {

        this.layer;
        this.x;
        this.y;
        this.w;
        this.h;

        this.secNameRect;
        this.secNameText;

        this.isVisible = false;
    }

    init(layer, x, y, w, h, secName, uiSettings) {

        this.layer = layer;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.uiSettings = {
            styles: uiSettings.styles["section"],
            properties: uiSettings.properties["section"],
            getConfig: uiSettings.getConfig["section"]
        };

        //  Set secName text inside the Konva Rect that represents the title of the section
        //  Setup secName display object in Konva
        var manualConfig = {
            x: this.x,
            y: this.y,
            width: (this.w * (this.uiSettings.properties.secNameRect.wPct / 100)),
            height: (this.h * (this.uiSettings.properties.secNameRect.hPct / 100))
        };
        var config = this.uiSettings.getConfig(manualConfig, "secNameRect");
        this.secNameRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x,
            y: this.y,
            width: (this.w * (this.uiSettings.properties.secNameText.wPct / 100)),
            height: (this.h * (this.uiSettings.properties.secNameText.hPct / 100)),
            text: secName
        };
        var config = this.uiSettings.getConfig(manualConfig, "secNameText");
        this.secNameText = new Konva.Text(config);

        this.layer.add(this.secNameRect);
        this.layer.add(this.secNameText);
    }

    relocateAt(newX, newY) {

        this.secNameRect.setX(newX + (this.secNameRect.x() - this.x));
        this.secNameRect.setY(newY + (this.secNameRect.y() - this.y));
        this.secNameText.setX(newX + (this.secNameText.x() - this.x));
        this.secNameText.setY(newY + (this.secNameText.y() - this.y));

        this.x = newX;
        this.y = newY;
    }

    // redrawAt(newX, newY, newW, newH) {

    //     this.secNameRect.setX(newX);
    //     this.secNameRect.setY(newY);
    //     this.secNameRect.setWidth(newW * (this.uiSettings.properties.secNameRect.wPct / 100));
    //     this.secNameRect.setHeight(newH * (this.uiSettings.properties.secNameRect.hPct / 100));
    //     this.secNameText.setX(newX);
    //     this.secNameText.setY(newY);
    //     this.secNameText.setWidth(newW * (this.uiSettings.properties.secNameText.wPct / 100));
    //     this.secNameText.setHeight(newH * (this.uiSettings.properties.secNameText.hPct / 100));

    //     this.x = newX;
    //     this.y = newY;
    //     this.w = newW;
    //     this.h = newH;
    // }

    applyTheme(uiStyles) {

        this.uiSettings.styles = uiStyles["section"];
        this.secNameRect.fill(this.uiSettings.styles.secNameRect.fill);
        this.secNameRect.stroke(this.uiSettings.styles.secNameRect.stroke);

        this.secNameText.fill(this.uiSettings.styles.secNameText.fill);
        this.secNameText.stroke(this.uiSettings.styles.secNameText.stroke);

        this.layer.batchDraw();
    }

    makeVisible(isVisible) {

        // Make the headerView itself visible/not-visible
        this.secNameRect.visible(isVisible);
        this.secNameText.visible(isVisible);
        this.layer.batchDraw();
        this.isVisible = isVisible;
    }
}