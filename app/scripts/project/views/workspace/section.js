
class Section {
    constructor() {

        this.model;
        this.view;
        this.controller;

        this.wsName;
        this.levelName;
        this.secName;
        this.sectionTemplate;
    }

    init(layer, x, y, w, h, margin, wsName, levelName, template, uiSettings, isVisible) {

        this.wsName = wsName;
        this.levelName = levelName;
        this.secName = template.name;
        this.sectionTemplate = template;

        // 1. Create section model and load it up
        this.model = new SectionModel();

        // 2. Create the view and populate this
        this.view = new SectionView();
        this.view.init(layer, x, y, w, h, margin, this.secName, uiSettings);

        // 3. Setup the controller to mediate between 'model' and 'view'
        this.controller = new SectionController();
        this.controller.init(this.model, this.view, this.wsName, this.levelName, this.secName);

        // 4. Now wire up the view events to be handled by this controller
        this.view.boardView.boardViewRect.on("click", this.controller.displayNoteForm.bind(this.controller, -1));
        this.view.boardView.scrollLeftButtonText.on("click", this.controller.scrollLeft.bind(this.controller));
        this.view.boardView.scrollRightButtonText.on("click", this.controller.scrollRight.bind(this.controller));
        for (var i = 0; i < this.view.boardView.noOfBoards; ++i) {
            this.view.boardView.boards[i].konvaText.on("click", this.controller.displayNoteForm.bind(this.controller, i));
        }

        // 5. Display the view
        this.view.makeVisible(isVisible);
    }

    get() {

        return {
            name: this.secName,
            notes: this.model.notes
        };
    }

    set(section = { notes: [] }) {

        this.controller.load(section.notes);
    }

    getData(format) {
        var data = "";
        var notes = this.model.notes;
        switch (format) {
            case "text/plain": data += this.secName + "\r\n";
                if (notes.length == 0) {
                    data += "(empty)" + "\r\n";
                }
                else {
                    notes.forEach(function (note, index) {
                        data += (index + 1) + ". " + note.name + "\r\n";
                        note.lines.forEach(function (line) {
                            line.elements.forEach(function (element) {
                                data += (element.label || "") + " " + (element.value || "") + "\r\n";
                            });
                        });
                    });
                }
                break;
            case "text/html":
                data += '<h3><a name=' + this.wsName + "" + this.levelName + "" + this.secName + '>' + this.secName + '</a></h2>';
                if (notes.length == 0) {
                    data += "(empty)"
                }
                notes.forEach(function (note, index) {
                    data += (index + 1) + ". " + (note.name || "") + "<br>";
                    note.lines.forEach(function (line) {
                        line.elements.forEach(function (element) {
                            data += (element.label || "") + " " + (element.value || "");
                        });
                        data += "<br>";
                    });
                    data += "Notes " + (note.lines.iNotes || "") + "<br>";
                    data += "Links " + (note.lines.links || "") + "<br>";
                });
                break;

        }
        return data;
    }

    getTitle() {
        var data = "";
        data += "<li>";
        data += "<a href = #" + this.wsName + "" + this.levelName + "" + this.secName + ">";
        data += this.secName;
        data += "</a>";
        data += "</li>";
        return data;
    }

}