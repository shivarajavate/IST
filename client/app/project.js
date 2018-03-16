
class Project {
    constructor() {

        this.session;
        this.jottings;
        this.notes;
        this.questions;
    }

    init(wsName, templateJSON, projectJSON) {

        this.session = new Session();
        this.session.init(wsName, templateJSON.workspace, projectJSON.workspace);

        this.jottings = projectJSON.jottings;
        this.notes = projectJSON.notes;
        this.questions = projectJSON.questions;
    }

    save() {

    }
}