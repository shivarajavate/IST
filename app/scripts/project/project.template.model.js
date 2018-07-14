
class ProjectTemplateModel {

    constructor(template = { name: "", levels: [] }) {

        var model = this;

        model.name = template.name;
        model.levels = template.levels;
    }

    noteTemplate(secName = "", levelName = "", wsName = "") {

        var model = this;

        if (secName && levelName && wsName) {

            var levelTemplate = model.levels.find(levelTemplate => levelTemplate.name === levelName);
            var sectionTemplate = levelTemplate.sections.find(sectionTemplate => sectionTemplate.name === secName);
            var noteTemplate = sectionTemplate.notes.find(noteTemplate => noteTemplate.name === "default");

            return {
                name: noteTemplate.name,
                lines: noteTemplate.lines.filter(noteTemplateLine => noteTemplateLine.type === wsName)
            };
        }
    }

}