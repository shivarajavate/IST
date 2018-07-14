class Level {
    constructor() {

        this.layer;
        this.x;
        this.y;
        this.w;
        this.h;

        this.model;
        this.view;
        this.controller;

        this.levelNumber;
        this.levelName;
        this.sectionTemplates;
    }

    init(layer, x, y, w, h, wsName, template, uiSettings, sectionAreaSettings) {

        this.layer = layer;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.levelNumber = template.number;
        this.levelName = template.name;
        this.sectionTemplates = template.sections;

        // 2. Create the view and populate sectionCollection
        this.view = new LevelView();
        this.view.init(layer, x, y, w, h, wsName, this.levelNumber, this.levelName, this.sectionTemplates, uiSettings, sectionAreaSettings);

        // 3. Setup the controller to mediate between 'model' and 'view'
        this.controller = new LevelController();
        this.controller.init(this.model, this.view);

        // 4. Now wire up the view events to be handled by this controller
        this.view.headerView.scrollLeftButtonText.on("click", this.controller.scrollLeft.bind(this.controller));
        this.view.headerView.scrollRightButtonText.on("click", this.controller.scrollRight.bind(this.controller));

        // 5. Display the view
        this.view.makeVisible(true);

    }

    get() {

        var sections = this.view.boardView.sectionCollection;
        var updatedSections = sections.map(function (section) {
            return section.get();
        });

        return {
            name: this.levelName,
            sections: updatedSections
        };
    }

    set(level = { sections: [] }) {

        this.view.boardView.sectionCollection.map(function (section, i) {
            return section.set(level.sections[i]);
        });
    }

    getData(format) {
        var data = "";
        var sections = this.view.boardView.sectionCollection;
        switch (format) {
            case "text/plain":
                data += this.levelName + '(' + this.levelNumber + ')' + "\r\n";
                sections.forEach(function (section) {
                    data += section.getData(format) + "\r\n";
                });
                break;
            case "text/html":
                sections.forEach(function (section) {
                    data += section.getData(format) + '<br>';
                });
                break;
        }
        return data;
    }

    getTitle() {
        var data = "";
        data += "<ul>";
        data += this.levelName + '(' + this.levelNumber + ')';
        var sections = this.view.boardView.sectionCollection;
        sections.forEach(function (section) {
            data += "<ul>";
            data += section.getTitle();
            data += "</ul>";
        });
        data += "</ul>";
        return data;
    }

}