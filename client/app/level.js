class Level {
    constructor() {

        this.layer;
        this.x;
        this.y;

        this.model;
        this.view;
        this.controller;

        this.levelNumber;
        this.levelName;
        this.sectionTemplates;
        this.sectionCollection;
    }

    init(layer, x, y, wsName, templateJSON, valueJSON) {

        this.layer = layer;
        this.x = x;
        this.y = y;

        this.levelNumber = templateJSON.number;
        this.levelName = templateJSON.name;
        this.sectionTemplates = templateJSON.section[wsName];
        this.sectionCollection = valueJSON.value[wsName];

        // 1. Create level model and load it up
        this.model = new LevelModel();
        // Load up the JSON from the persistent source.
        this.model.init(this.sectionCollection); // levelJSON === emptyArray => new Workspace

        // 2. Create the view and populate sectionCollection
        this.view = new LevelView();
        this.view.init(layer, x, y, wsName, this.levelNumber, this.levelName, this.sectionTemplates, this.sectionCollection);

        // 3. Setup the controller to mediate between 'model' and 'view'
        this.controller = new LevelController();
        this.controller.init(this.model, this.view);

        // 4. Now wire up the view events to be handled by this controller
        this.view.headerView.scrollLeftButtonText.on("click", this.controller.scrollLeft.bind(this.controller));
        this.view.headerView.scrollRightButtonText.on("click", this.controller.scrollRight.bind(this.controller));

        // 5. Display the view
        this.view.makeVisible(true);

    }

}