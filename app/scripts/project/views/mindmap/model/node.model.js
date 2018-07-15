
class NodeModel {

    constructor(options = {}) {
        var newNode = Object.assign({
            label: "undefined",
            name: null,
            secName: null,
            levelName: null,
            isNote: false,
            shape: "box",
            fixed: false,
            default: false,
            collapsed: false,
            borderWidth: 0,
            borderWidthSelected: 0
        }, options);
        return newNode;
    }
}