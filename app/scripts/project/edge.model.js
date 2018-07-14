
class EdgeModel {

    constructor(options = {}) {
        var newEdge = Object.assign({
            from: 0,
            to: 0,
            label: "",
            name: "",
            hidden: false
        }, options);
        return newEdge;
    }
}
