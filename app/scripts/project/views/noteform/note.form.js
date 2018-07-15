
class NoteForm {

    constructor() {

        this.wsName;
        this.secName;
        this.levelName;
        this.noteExists;
        this.template;
        this.oldNote;
        this.note;
        this.tags;
        this.widgets;
        this.selectedWidget;
        this.options;
        this.bcList;
        this.scenariosText;
        this.conditionsTable;
    }

    init(data, callbacks) {

        var noteForm = this;

        noteForm.wsName = data.wsName || null;
        noteForm.levelName = data.levelName || null;
        noteForm.secName = data.secName || null;
        noteForm.noteExists = data.noteExists || false;
        noteForm.template = data.template || [];
        noteForm.oldNote = $.extend(true, {}, data.note);
        noteForm.note = $.extend(true, {}, data.note);
        noteForm.tags = data.tags || [];
        noteForm.widgets = [];
        noteForm.selectedWidget = null;
        noteForm.options = {
            space: '',
            openSquareBracket: '[',
            closeSquareBracket: ']',
            openRoundBracket: '(',
            closeRoundBracket: ')',
            comma: ','
        };
        noteForm.scenariosText = "";

        noteForm.deleteNote = noteForm.deleteNoteForm.bind(noteForm, callbacks.delete);
        noteForm.submitNote = noteForm.submitNoteForm.bind(noteForm, callbacks.submit);

        $("#note").on("hidden.bs.modal", noteForm.closeNoteForm.bind(noteForm, callbacks.close));
        $('#note').modal('show');
    }

    generateTestScenarios() {
        var noteForm = this;
        noteForm.scenariosText = "";

        if (noteForm.bcList.length > 0) {
            noteForm.scenariosText += "@startsection\n";
            noteForm.generatePostiveScenarios(noteForm.scenariosText);
            noteForm.generateNegativeScenarios(noteForm.scenariosText);
            noteForm.scenariosText += "@endsection";
        }

        var res = document.getElementById("widgetScenarios").value.match(new RegExp(/@startsection(.|\s)*@endsection/));
        if (res) {
            document.getElementById("widgetScenarios").value = document.getElementById("widgetScenarios").value.replace(res[0], noteForm.scenariosText);
        }
        else {
            noteForm.scenariosText = noteForm.scenariosText ? (noteForm.scenariosText + "\n") : noteForm.scenariosText;
            document.getElementById("widgetScenarios").value = noteForm.scenariosText + document.getElementById("widgetScenarios").value;
        }
    }
    generatePostiveScenarios(scenariosText) {
        var noteForm = this;
        noteForm.scenariosText += "positive scenarios:\n";
        var resultPostiveScenario = [];
        var maxLengthOfTestConditons = 0;
        noteForm.bcList.forEach(function (bc) {
            maxLengthOfTestConditons = Math.max(maxLengthOfTestConditons, bc.value["positive"].length);
        });
        for (var j = 0; j < maxLengthOfTestConditons; j++) {
            var testScenario = [];
            noteForm.bcList.forEach(function (bc) {
                if (bc.value["positive"] && bc.value["positive"].length > 0) {
                    testScenario.push(bc.value["positive"][Math.min(j, bc.value["positive"].length - 1)]);
                }
            });
            resultPostiveScenario.push(testScenario);
            noteForm.scenariosText += (resultPostiveScenario.indexOf(testScenario) + 1 + ".") + testScenario + "\n";
        }
    }

    generateNegativeScenarios(scenariosText) {
        var noteForm = this;
        noteForm.scenariosText += "negative scenarios:\n";
        var resultNegativeScenario = [];
        noteForm.bcList.forEach(function (bc, i) {
            bc.value["negative"].forEach(function (negativeTestCondition) {
                var testScenario = [];
                testScenario.push(negativeTestCondition);
                noteForm.bcList.forEach(function (positiveRandomTestCondition, k) {
                    if (positiveRandomTestCondition.value["positive"] && positiveRandomTestCondition.value["positive"].length > 0) {
                        if (i == k) return;
                        else {
                            testScenario.push(positiveRandomTestCondition.value["positive"][Math.floor(Math.random() * positiveRandomTestCondition.value["positive"].length)]);
                        }
                    }
                });

                resultNegativeScenario.push(testScenario);
                noteForm.scenariosText += (resultNegativeScenario.indexOf(testScenario) + 1 + ".") + testScenario + "\n";
            });
        });
    }


    openAccordion(id) {
        var noteForm = this;
        switch (id) {
            case 'widgetScenarios':
                var bcText = document.getElementById("widgetConditions").value;
                if (bcText) {
                    var bcStr = bcText.replace(/(?:\r\n|\r|\n)/g, '').match(new RegExp("@start" + "(.*)" + "@end"));
                    if (bcStr) {
                        var service = angular.element(document.body).injector().get("AppService");
                        noteForm.bcList = service.stringToJson(bcStr, this.options);
                    } else {
                        noteForm.bcList = [];
                    }
                } else {
                    noteForm.bcList = [];
                }
                noteForm.generateTestScenarios();
                break;
        }
    };

    openConditionsTable(accordionID) {
        this.conditionsTable = new ConditionsTable();
        this.conditionsTable.init(accordionID);
        this.conditionsTable.openConditionsTable();
    }

    loadWidgets() {
        var noteForm = this;
        var widgetType = appConst.levelWidgetMapping[noteForm.levelName].type;
        var widgetCategory = appConst.levelWidgetMapping[noteForm.levelName].category;

        noteForm.widgets = [];
        noteForm.selectedWidget = null;
        var publicToken = localStorage.getItem('publicToken');

        var service = angular.element(document.body).injector().get("WidgetService");

        service.getPublicWidgets(publicToken).then(function (widgets) {
            if (widgets && widgets.length > 0) {
                noteForm.widgets = widgets.filter(widget => widget.info.type === widgetType);
            }
        });
    };

    setSelectedWidget(id) {
        var noteForm = this;
        if (id) {
            var publicToken = localStorage.getItem('publicToken');
            var service = angular.element(document.body).injector().get("WidgetService");

            service.getPublicWidgetById(id, publicToken).then(function (widget) {
                noteForm.selectedWidget = widget;
            });
        } else {
            noteForm.selectedWidget = null;
        }
    };

    bindSelectedWidget(widget) {

        this.note.lines.forEach(function (line) {
            line.elements.forEach(function (element) {
                switch (element.id) {
                    case "widgetConditions":
                        element.value = widget.data.conditions || "";
                        break;
                    case "widgetCriteria":
                        element.value = widget.data.criteria || "";
                        break;
                    case "widgetIssues":
                        element.value = widget.data.issues || "";
                        break;
                    case "widgetActions":
                        element.value = widget.data.actions || "";
                        break;
                    case "widgetHeuristics":
                        element.value = widget.data.heuristics || "";
                        break;
                    case "widgetData":
                        element.value = widget.data.data || "";
                        break;
                }
            });
        });

        var infoTab = document.getElementById('infoTab');
        infoTab.click();
    };


    submitNoteForm(submitCallback) {
        this.noteExists ? submitCallback(this.oldNote, this.note) : submitCallback(this.note);
    }

    deleteNoteForm(deleteCallback) {
        deleteCallback(this.note);
    }

    closeNoteForm(cancelCallback) {
        cancelCallback();
        $('#note').modal('hide');
    }


}