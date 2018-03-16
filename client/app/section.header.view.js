
class SectionHeaderView {
    constructor() {

        this.layer;
        this.x;
        this.y;

        this.secNameRect;
        this.secNameText;

        this.addButtonRect;
        this.addButtonText;

        this.deleteButtonRect;
        this.deleteButtonText;

        this.scrollLeftButtonRect;
        this.scrollLeftButtonText;

        this.scrollBar;

        this.scrollRightButtonRect;
        this.scrollRightButtonText;

        this.isVisible = false;
    }

    init(layer, x, y, secName) {

        this.layer = layer;
        this.x = x;
        this.y = y;

        //  Set secName text inside the Konva Rect that represents the title of the section
        //  Setup secName display object in Konva
        var manualConfig = {
            x: this.x,
            y: this.y,
            width: (SectionWidth * (SectionSettings.secNameRect.wPct / 100)),
            height: (SectionHeight * (SectionSettings.secNameRect.hPct / 100))
        };
        var config = UISettings.getSectionConfig(manualConfig, "secNameRect");
        this.secNameRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x,
            y: this.y,
            width: (SectionWidth * (SectionSettings.secNameText.wPct / 100)),
            height: (SectionHeight * (SectionSettings.secNameText.hPct / 100)),
            text: secName
        };
        var config = UISettings.getSectionConfig(manualConfig, "secNameText");
        this.secNameText = new Konva.Text(config);

        this.layer.add(this.secNameRect);
        this.layer.add(this.secNameText);

        //  Setup addButton display object in Konva
        var manualConfig = {
            x: this.x
                + (SectionWidth * (SectionSettings.secNameRect.wPct / 100)),
            y: this.y,
            width: (SectionWidth * (SectionSettings.addButtonRect.wPct / 100)),
            height: (SectionHeight * (SectionSettings.addButtonRect.hPct / 100))
        };
        var config = UISettings.getSectionConfig(manualConfig, "addButtonRect");
        this.addButtonRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x
                + (SectionWidth * (SectionSettings.secNameRect.wPct / 100)),
            y: this.y,
            width: (SectionWidth * (SectionSettings.addButtonText.wPct / 100)),
            height: (SectionHeight * (SectionSettings.addButtonText.hPct / 100)),
            text: '+'
        };
        var config = UISettings.getSectionConfig(manualConfig, "addButtonText");
        this.addButtonText = new Konva.Text(config);

        this.layer.add(this.addButtonRect);
        this.layer.add(this.addButtonText);

        //  Setup deleteButton display object in Konva
        var manualConfig = {
            x: this.x
                + (SectionWidth * (SectionSettings.secNameRect.wPct / 100))
                + (SectionWidth * (SectionSettings.addButtonRect.wPct / 100)),
            y: this.y,
            width: (SectionWidth * (SectionSettings.deleteButtonRect.wPct / 100)),
            height: (SectionHeight * (SectionSettings.deleteButtonRect.hPct / 100))
        };
        var config = UISettings.getSectionConfig(manualConfig, "deleteButtonRect");
        this.deleteButtonRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x
                + (SectionWidth * (SectionSettings.secNameRect.wPct / 100))
                + (SectionWidth * (SectionSettings.addButtonRect.wPct / 100)),
            y: this.y,
            width: (SectionWidth * (SectionSettings.deleteButtonText.wPct / 100)),
            height: (SectionHeight * (SectionSettings.deleteButtonText.hPct / 100)),
            text: '-'
        };
        var config = UISettings.getSectionConfig(manualConfig, "deleteButtonText");
        this.deleteButtonText = new Konva.Text(config);

        this.layer.add(this.deleteButtonRect);
        this.layer.add(this.deleteButtonText);

        //  Setup scrollLeftButton display object in Konva
        var manualConfig = {
            x: this.x,
            y: this.y
                + (SectionHeight * (SectionSettings.secNameRect.hPct / 100)),
            width: (SectionWidth * (SectionSettings.scrollLeftButtonRect.wPct / 100)),
            height: (SectionHeight * (SectionSettings.scrollLeftButtonRect.hPct / 100))
        };
        var config = UISettings.getSectionConfig(manualConfig, "scrollLeftButtonRect");
        this.scrollLeftButtonRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x,
            y: this.y
                + (SectionHeight * (SectionSettings.secNameRect.hPct / 100)),
            width: (SectionWidth * (SectionSettings.scrollLeftButtonText.wPct / 100)),
            height: (SectionHeight * (SectionSettings.scrollLeftButtonText.hPct / 100)),
            text: '<'
        };
        var config = UISettings.getSectionConfig(manualConfig, "scrollLeftButtonText");
        this.scrollLeftButtonText = new Konva.Text(config);

        this.layer.add(this.scrollLeftButtonRect);
        this.layer.add(this.scrollLeftButtonText);

        //  Setup scrollBar display object in Konva
        var manualConfig = {
            x: this.x
                + (SectionWidth * (SectionSettings.scrollLeftButtonRect.wPct / 100)),
            y: this.y
                + (SectionHeight * (SectionSettings.secNameRect.hPct / 100)),
            width: (SectionWidth * (SectionSettings.scrollBar.wPct / 100)),
            height: (SectionHeight * (SectionSettings.scrollBar.hPct / 100))
        };
        var config = UISettings.getSectionConfig(manualConfig, "scrollBar");
        this.scrollBar = new Konva.Rect(config);

        this.layer.add(this.scrollBar);

        //  Setup scrollRightButton display object in Konva
        var manualConfig = {
            x: this.x
                + (SectionWidth * (SectionSettings.scrollLeftButtonRect.wPct / 100))
                + (SectionWidth * (SectionSettings.scrollBar.wPct / 100)),
            y: this.y
                + (SectionHeight * (SectionSettings.secNameRect.hPct / 100)),
            width: (SectionWidth * (SectionSettings.scrollRightButtonRect.wPct / 100)),
            height: (SectionHeight * (SectionSettings.scrollRightButtonRect.hPct / 100))
        };
        var config = UISettings.getSectionConfig(manualConfig, "scrollRightButtonRect");
        this.scrollRightButtonRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x
                + (SectionWidth * (SectionSettings.scrollLeftButtonRect.wPct / 100))
                + (SectionWidth * (SectionSettings.scrollBar.wPct / 100)),
            y: this.y
                + (SectionHeight * (SectionSettings.secNameRect.hPct / 100)),
            width: (SectionWidth * (SectionSettings.scrollRightButtonText.wPct / 100)),
            height: (SectionHeight * (SectionSettings.scrollRightButtonText.hPct / 100)),
            text: '>'
        };
        var config = UISettings.getSectionConfig(manualConfig, "scrollRightButtonText");
        this.scrollRightButtonText = new Konva.Text(config);

        this.layer.add(this.scrollRightButtonRect);
        this.layer.add(this.scrollRightButtonText);
    }

    relocateAt(newX, newY) {
        
        this.secNameRect.setX(newX + (this.secNameRect.x() - this.x));
        this.secNameRect.setY(newY + (this.secNameRect.y() - this.y));
        this.secNameText.setX(newX + (this.secNameText.x() - this.x));
        this.secNameText.setY(newY + (this.secNameText.y() - this.y));

        this.addButtonRect.setX(newX + (this.addButtonRect.x() - this.x));
        this.addButtonRect.setY(newY + (this.addButtonRect.y() - this.y));
        this.addButtonText.setX(newX + (this.addButtonText.x() - this.x));
        this.addButtonText.setY(newY + (this.addButtonText.y() - this.y));
        
        this.deleteButtonRect.setX(newX + (this.deleteButtonRect.x() - this.x));
        this.deleteButtonRect.setY(newY + (this.deleteButtonRect.y() - this.y));
        this.deleteButtonText.setX(newX + (this.deleteButtonText.x() - this.x));
        this.deleteButtonText.setY(newY + (this.deleteButtonText.y() - this.y));
        
        this.scrollLeftButtonRect.setX(newX + (this.scrollLeftButtonRect.x() - this.x));
        this.scrollLeftButtonRect.setY(newY + (this.scrollLeftButtonRect.y() - this.y));
        this.scrollLeftButtonText.setX(newX + (this.scrollLeftButtonText.x() - this.x));
        this.scrollLeftButtonText.setY(newY + (this.scrollLeftButtonText.y() - this.y));

        this.scrollBar.setX(newX + (this.scrollBar.x() - this.x));
        this.scrollBar.setY(newY + (this.scrollBar.y() - this.y));

        this.scrollRightButtonRect.setX(newX + (this.scrollRightButtonRect.x() - this.x));
        this.scrollRightButtonRect.setY(newY + (this.scrollRightButtonRect.y() - this.y));
        this.scrollRightButtonText.setX(newX + (this.scrollRightButtonText.x() - this.x));
        this.scrollRightButtonText.setY(newY + (this.scrollRightButtonText.y() - this.y));

        this.x = newX;
        this.y = newY;
    }

    makeVisible(isVisible) {

        // Make the headerView itself visible/not-visible
        if (isVisible) {

            this.secNameRect.show();
            this.secNameText.show();

            this.addButtonRect.show();
            this.addButtonText.show();

            this.deleteButtonRect.show();
            this.deleteButtonText.show();

            this.scrollLeftButtonRect.show();
            this.scrollLeftButtonText.show();

            this.scrollBar.show();

            this.scrollRightButtonRect.show();
            this.scrollRightButtonText.show();
        } else {

            this.secNameRect.hide();
            this.secNameText.hide();

            this.addButtonRect.hide();
            this.addButtonText.hide();

            this.deleteButtonRect.hide();
            this.deleteButtonText.hide();

            this.scrollLeftButtonRect.hide();
            this.scrollLeftButtonText.hide();

            this.scrollBar.hide();

            this.scrollRightButtonRect.hide();
            this.scrollRightButtonText.hide();
        }
        this.layer.batchDraw();
        this.isVisible = isVisible;
    }
}