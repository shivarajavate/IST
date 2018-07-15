
class Workspace {
    constructor() {

        var workspace = this;

        workspace.x;
        workspace.y;
        workspace.w;
        workspace.h;

        workspace.stage;
        workspace.defaultLayer;

        workspace.uiSettings;

        workspace.name;
        workspace.template;

        workspace.levels;

        workspace.isVisible;
    }

    init(params) {

        var workspace = this;

        workspace.x = 0;
        workspace.y = 0;
        workspace.w = (window.screen.availWidth - (window.outerWidth - window.innerWidth)) * 0.6;
        workspace.h = window.screen.availHeight - (window.outerHeight - window.innerHeight) - ($('header').outerHeight() + $('footer').outerHeight());

        workspace.stage = new Konva.Stage({
            container: params.data.canvasName,
            width: workspace.w,
            height: workspace.h
        });

        workspace.defaultLayer = new Konva.Layer();
        workspace.stage.add(workspace.defaultLayer);

        workspace.uiSettings = {
            styles: params.data.uiSettings.styles["workspace"],
            properties: params.data.uiSettings.properties["workspace"],
            getConfig: params.data.uiSettings.getConfig["workspace"]
        };

        workspace.name = params.data.name;
        workspace.template = params.data.template;

        workspace.levels = [];

        workspace.template.levels.forEach(function (template, i) {

            var levelParams = {
                data: {
                    layer: workspace.defaultLayer,
                    x: workspace.x,
                    y: workspace.y + (i * (workspace.h * (params.data.uiSettings.properties.level.skeleton.hPct / 100))),
                    w: (workspace.w * (params.data.uiSettings.properties.level.skeleton.wPct / 100)),
                    h: (workspace.h * (params.data.uiSettings.properties.level.skeleton.hPct / 100)),
                    wsName: workspace.name,
                    template: template,
                    uiSettings: params.data.uiSettings,
                    sectionAreaSettings: workspace.uiSettings.properties[workspace.name][i]
                },
                callbacks: {
                    
                }
            };
            workspace.levels[i] = new Level();
            workspace.levels[i].init(levelParams);
        });

        workspace.isVisible = true;
    }

    get() {

        var updatedLevels = this.levels.map(function (level) {
            return level.get();
        });

        return {
            name: this.name,
            levels: updatedLevels
        };
    }

    set(levels = []) {

        var workspace = this;

        workspace.levels.map(function (level, i) {
            return level.set(levels[i]);
        });
    }

    add(note, noteIndex = -1) {

        var workspace = this;

        var level = workspace.levels.find(level => note.levelName === level.levelName);
        if (level) {
            var section = level.view.boardView.sectionCollection.find(section => (note.secName === section.secName));
            if (section) {
                return section.controller.addNote(note, noteIndex);
            }
        }
    }

    update(note) {

        var workspace = this;

        var level = workspace.levels.find(level => note.levelName === level.levelName);
        if (level) {
            var section = level.view.boardView.sectionCollection.find(section => (note.secName === section.secName));
            if (section) {
                return section.controller.updateNote(note);
            }
        }
    }

    delete(note) {

        var workspace = this;

        var level = workspace.levels.find(level => note.levelName === level.levelName);
        if (level) {
            var section = level.view.boardView.sectionCollection.find(section => (note.secName === section.secName));
            if (section) {
                return section.controller.deleteNote(note);
            }
        }
    }

    unselect() {

        var workspace = this;

        workspace.levels.forEach(function (level) {
            var sections = level.view.boardView.sectionCollection;
            sections.forEach(function (section) {
                return section.controller.unselectNote();
            });
        });
    }

    getData(format) {
        var data = "";
        var levels = this.levels;
        switch (format) {

            case "text/plain":
                data += this.name + "\r\n";
                levels.forEach(function (level) {
                    data += level.getData(format) + "\r\n";
                });
                break;

            case "text/html":
                data += "<div class = 'workspace-container'>" + this.name + "</div>";
                levels.forEach(function (level) {
                    data += level.getData(format);
                });
                break;
        }
        return data;
    }

    getTitle() {
        var data = "";
        data += "<td>";
        data += "<ul>";
        data += this.name;
        var levels = this.levels;
        levels.forEach(function (level) {
            data += level.getTitle();
        });
        data += "</ul>";
        data += "</td>";
        return data;
    }

    applyTheme(uiStyles) {
        this.uiSettings.styles = uiStyles["workspace"];
        this.levels.forEach(function (level) {
            level.view.applyTheme(uiStyles);
        });
    }

    makeVisible(isVisible) {

        var workspace = this;

        workspace.levels.forEach(function (level) {
            level.view.makeVisible(isVisible);
        });

        workspace.isVisible = isVisible;
    }

}
