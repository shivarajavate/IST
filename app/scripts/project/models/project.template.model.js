
class ProjectTemplateModel {

    constructor(template = { name: "", levels: [] }) {

        var model = this;

        model.name = template.name;
        model.levels = template.levels;
    }

    noteTemplate(secName = "", levelName = "") {

        var model = this;

        if (secName && levelName) {

            var levelTemplate = model.levels.find(levelTemplate => levelTemplate.name === levelName);
            var sectionTemplate = levelTemplate.sections.find(sectionTemplate => sectionTemplate.name === secName);
            var noteTemplate = sectionTemplate.notes.find(noteTemplate => noteTemplate.name === "default");

            return noteTemplate;
        }
    }

}