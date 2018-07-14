
class NoteModel {

    constructor(note = { id: -1, name: "", secName: "", levelName: "" }, template = new ProjectTemplateModel()) {

        var model = this;

        model.id = note.id;
        model.name = note.name;
        model.secName = note.secName;
        model.levelName = note.levelName;

        var levelTemplate = template.levels.find(levelTemplate => levelTemplate.name === note.levelName);
        var sectionTemplate = levelTemplate.sections.find(sectionTemplate => sectionTemplate.name === note.secName);
        var noteTemplate = sectionTemplate.notes.find(noteTemplate => noteTemplate.name === "default");

        model.lines = noteTemplate.lines.map(function (line, lineIndex) {
            return {
                elements: line.elements.map(function (element, elementIndex) {
                    var id = element.id || "line_" + lineIndex + "_element_" + elementIndex;
                    var label = element.label || "";
                    var value = element.value || "";
                    switch (element.type) {
                        case "VALUE-NUMSTRING":
                            value = parseInt(element.value) || 0;
                            break;
                        case "VALUE-LIST":
                            value = element.value[0];
                            break;
                    }
                    return {
                        id: id,
                        label: label,
                        value: value
                    }
                })
            };
        });
        
        model.iNotes = "";
        model.links = "";
    }
}