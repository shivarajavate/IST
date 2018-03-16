
class Section {
    constructor() {

        this.layer;
        this.x;
        this.y;

        this.model;
        this.view;
        this.controller;

        this.secName;
        this.noteTemplate;
        this.noteCollection;
    }

    init(layer, x, y, templateJSON, valueJSON, isVisible) {

        this.layer = layer;
        this.x = x;
        this.y = y;

        this.secName = templateJSON.name;
        this.noteTemplate = templateJSON.lines;
        this.noteCollection = valueJSON.value;

        // 1. Create section model and load it up
        this.model = new SectionModel();
        // Load up the JSON from the persistent source
        this.model.init(this.noteCollection); // valueJSON === emptyArray => new Workspace

        // 2. Create the view and populate this
        this.view = new SectionView();
        this.view.init(layer, x, y, this.secName);

        // 3. Setup the controller to mediate between 'model' and 'view'
        this.controller = new SectionController();
        this.controller.init(this.model, this.view, this.secName, this.noteTemplate);

        // 4. Now wire up the view events to be handled by this controller
        this.view.headerView.addButtonText.on("click", this.controller.displayNoteForm.bind(this.controller, -1));
        this.view.headerView.deleteButtonText.on("click", this.controller.deleteNote.bind(this.controller));
        this.view.headerView.scrollLeftButtonText.on("click", this.controller.scrollLeft.bind(this.controller));
        this.view.headerView.scrollRightButtonText.on("click", this.controller.scrollRight.bind(this.controller));
        for (var i = 0; i < this.view.boardView.maxNoBoards; ++i) {
            this.view.boardView.boardCollection[i].konvaText.on("click", this.controller.selectNote.bind(this.controller, i));
            this.view.boardView.boardCollection[i].konvaText.on("dblclick", this.controller.displayNoteForm.bind(this.controller, i));
        }

        // 5. Display the view
        this.view.makeVisible(isVisible);
    }
}