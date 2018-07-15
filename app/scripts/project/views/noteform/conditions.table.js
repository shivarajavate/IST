
class ConditionsTable {

    constructor() {
        this.accordianId;
        this.errorMessage;
        this.selectedIndex;
        this.bcList;
        this.options;
        this.bc;
    }

    init(accordianId) {

        this.accordianId = accordianId;
        this.errorMessage = "";
        this.selectedIndex = -1;
        this.bcList = [];
        this.options = {
            space: '',
            openSquareBracket: '[',
            closeSquareBracket: ']',
            openRoundBracket: '(',
            closeRoundBracket: ')',
            comma: ','
        };
        this.appService = angular.element(document.body).injector().get("AppService");

        var bcText = document.getElementById(this.accordianId).value;
        if (bcText) {
            var bcStr = bcText.replace(/(?:\r\n|\r|\n)/g, '').match(new RegExp("@start" + "(.*)" + "@end"));
            if (bcStr) {
                this.bcList = this.appService.stringToJson(bcStr, this.options);
            }
        }
        this.addCondition();
    }

    openConditionsTable() {
        $('#conditionsTableModal').modal('show');
    }

    closeConditionsTable() {
        $('#conditionsTableModal').modal('hide');
    }

    addCondition() {
        this.bc = { 'name': '', 'value': { 'positive': [], 'negative': [] } };
        this.bcList.push(this.bc);
    }

    removeCondition() {
        this.bcList.splice(this.selectedIndex, 1);
        if (this.bcList.length === 0) {
            this.addCondition();
        }
        this.selectedIndex = -1;
    }

    selectCondition(index) {
        this.selectedIndex = (this.selectedIndex === index) ? -1 : index;
    }

    saveConditions() {
        var conditionsTable = this;
        var bcText = "";
        conditionsTable.errorMessage = "";
        var valueArr = conditionsTable.bcList.map(function (bc) { return bc.name });
        var isDuplicate = valueArr.some(function (item, idx) {
            if (item != "") {
                return valueArr.indexOf(item) != idx;
            }
        });
        if (isDuplicate) {
            conditionsTable.errorMessage = this.appService.getResourceText("R009");
        }
        else {
            if ((conditionsTable.bcList.length > 0) && (conditionsTable.bcList[0].name != "")) {
                bcText = "@start\n";
                conditionsTable.bcList.forEach(function (bc) {
                    if (bc.name == "") {
                        conditionsTable.bcList.splice(conditionsTable.bcList.indexOf(bc), 1);
                    } else {
                        bcText += bc.name + "[(";
                        bcText += bc.value.positive + ")(";
                        bcText += bc.value.negative + ")];\n";
                        conditionsTable.closeConditionsTable();
                    }
                });
                bcText += "@end";
                var res = document.getElementById(conditionsTable.accordianId).value.match(new RegExp(/@start(.|\s)*@end/));
                if (res) {
                    document.getElementById(conditionsTable.accordianId).value = document.getElementById(conditionsTable.accordianId).value.replace(res[0], bcText);
                }
                else {
                    bcText = bcText ? (bcText + "\n") : bcText;
                    document.getElementById(conditionsTable.accordianId).value = bcText + document.getElementById(conditionsTable.accordianId).value;
                }
            }
        }
    }

}
