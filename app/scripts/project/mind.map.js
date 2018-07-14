
class MindMap {

    constructor() {

        var mindMap = this;

        mindMap.callbacks;

        mindMap.network;
        mindMap.zoomInLimit;

        mindMap.$addToNodePopup;
        mindMap.$editNodePopup;
        mindMap.$editEdgePopup;

        mindMap.appService;
        mindMap.errorMessage;
        mindMap.hasError;
    }

    init(params) {

        var mindMap = this;

        var container = document.getElementById('mindMapNetwork');

        var data = {
            nodes: new vis.DataSet(),
            edges: new vis.DataSet()
        };

        var options = params.data.options;

        mindMap.callbacks = params.callbacks;

        mindMap.network = new vis.Network(container, data, options);

        mindMap.network.body.data.nodes.on('*', mindMap.onNodeChange.bind(mindMap));

        mindMap.network.addEventListener('click', mindMap.onClick.bind(mindMap));
        mindMap.network.addEventListener('doubleClick', mindMap.onDoubleClick.bind(mindMap));
        mindMap.network.addEventListener("oncontext", mindMap.onRightClick.bind(mindMap));
        mindMap.network.addEventListener("release", mindMap.onRelease.bind(mindMap));
        mindMap.network.addEventListener("afterDrawing", mindMap.onAfterDrawing.bind(mindMap));
        mindMap.network.addEventListener("zoom", mindMap.onZoom.bind(mindMap));

        mindMap.network.body.container.addEventListener("keydown", mindMap.onKeydown.bind(mindMap));

        mindMap.network.body.data.nodes.add(params.data.nodes);
        mindMap.network.body.data.edges.add(params.data.edges);

        mindMap.setZoomInLimit();

        mindMap.$addToNodePopup = $('#addToNodePopup');
        mindMap.$editNodePopup = $('#editNodePopup');
        mindMap.$editEdgePopup = $('#editEdgePopup');

        mindMap.$addToNodePopup.on('shown.bs.modal', function (event) {
            $('.modal-backdrop').css({ 'background-color': 'transparent' });
            mindMap.$addToNodePopup.find('input').eq(0).focus();
        });
        mindMap.$addToNodePopup.on('hidden.bs.modal', function (event) {
            mindMap.$addToNodePopup.find('input').eq(0).val("");
            mindMap.network.body.container.focus();
            mindMap.errorMessage = "";
            mindMap.hasError = false;
            mindMap.callbacks.close();
        });
        mindMap.$addToNodePopup.find('input').eq(0).on('keydown', function (event) {

            var $element = $(this);
            var code = event.keyCode || event.which;
            switch (code) {
                case 13:     // enter key
                    mindMap.errorMessage = "";
                    if ($element.val()) {
                        var selectedNode = mindMap.selectedNode();
                        if (selectedNode) {
                            switch (mindMap.descendentNodeExists(selectedNode, $element.val())) {
                                case true:
                                    mindMap.errorMessage = mindMap.appService.getResourceText("R010");
                                    mindMap.hasError = true;
                                    setTimeout(function () {
                                        mindMap.errorMessage = "";
                                        mindMap.hasError = false;
                                    }, 1000);
                                    break;
                                case false:
                                    var newDescendentNode = new NodeModel({
                                        label: $element.val(),
                                        name: $element.val(),
                                        secName: selectedNode.secName,
                                        levelName: selectedNode.levelName,
                                        isNote: true
                                    });
                                    mindMap.callbacks.add(newDescendentNode);
                                    mindMap.$addToNodePopup.modal('hide');
                                    break;
                            }
                        }
                    } else {
                        mindMap.errorMessage = mindMap.appService.getResourceText("R011");
                        mindMap.hasError = true;
                        setTimeout(function () {
                            mindMap.errorMessage = "";
                            mindMap.hasError = false;
                        }, 1000);
                    }
                    break;
                case 27:    // escape key
                    mindMap.$addToNodePopup.modal('hide');
                    break;
            }
        });
        mindMap.$editNodePopup.on('shown.bs.modal', function (event) {
            $('.modal-backdrop').css({ 'background-color': 'transparent' });
            mindMap.$editNodePopup.find('input').eq(0).focus();
        });
        mindMap.$editNodePopup.on('hidden.bs.modal', function (event) {
            mindMap.$editNodePopup.find('input').eq(0).val("");
            mindMap.network.body.container.focus();
            mindMap.errorMessage = "";
            mindMap.hasError = false;
            mindMap.callbacks.close();
        });
        mindMap.$editNodePopup.find('input').eq(0).on('keydown', function (event) {

            var $element = $(this);
            var code = event.keyCode || event.which;
            switch (code) {
                case 13:     // enter key
                    if ($element.val()) {
                        var selectedNode = mindMap.selectedNode();
                        if (selectedNode) {
                            switch (mindMap.siblingNodeExists(selectedNode, $element.val())) {
                                case true:
                                    mindMap.errorMessage = mindMap.appService.getResourceText("R010");
                                    mindMap.hasError = true;
                                    setTimeout(function () {
                                        mindMap.errorMessage = "";
                                        mindMap.hasError = false;
                                    }, 1000);
                                    break;
                                case false:
                                    mindMap.callbacks.update(selectedNode, $element.val());
                                    mindMap.$editNodePopup.modal('hide');
                                    break;
                            }
                        }
                    } else {
                        mindMap.errorMessage = mindMap.appService.getResourceText("R011");
                        mindMap.hasError = true;
                        setTimeout(function () {
                            mindMap.errorMessage = "";
                            mindMap.hasError = false;
                        }, 1000);
                    }
                    break;
                case 27:    // escape key
                    mindMap.$editNodePopup.modal('hide');
                    break;
            }
        });
        mindMap.$editEdgePopup.on('shown.bs.modal', function (event) {
            $('.modal-backdrop').css({ 'background-color': 'transparent' });
            mindMap.$editEdgePopup.find('input').eq(0).focus();
        });
        mindMap.$editEdgePopup.on('hidden.bs.modal', function (event) {
            mindMap.$editEdgePopup.find('input').eq(0).val("");
            mindMap.network.body.container.focus();
            mindMap.errorMessage = "";
            mindMap.hasError = false;
            mindMap.callbacks.close();
        });
        mindMap.$editEdgePopup.find('input').eq(0).on('keydown', function (event) {

            var $element = $(this);
            var code = event.keyCode || event.which;
            switch (code) {
                case 13:     // enter key
                    // if ($element.val()) {
                    //     var selectedNode = mindMap.selectedNode();
                    //     if (selectedNode) {
                    //         mindMap.callbacks.update(selectedNode, $element.val());
                    //     }
                    //     mindMap.$editEdgePopup.modal('hide');
                    // } else {
                    //     mindMap.errorMessage = mindMap.appService.getResourceText("R011");
                    //     mindMap.hasError = true;
                    //     setTimeout(function () {
                    //         mindMap.errorMessage = "";
                    //         mindMap.hasError = false;
                    //     }, 1000);
                    // }
                    break;
                case 27:    // escape key
                    mindMap.$editEdgePopup.modal('hide');
                    break;
            }
        });

        mindMap.appService = angular.element(document.body).injector().get("AppService");
        mindMap.errorMessage = "";
        mindMap.hasError = false;
    }

    set(levels = []) {

        var mindMap = this;

        var data = {
            nodes: mindMap.network.body.data.nodes.getDataSet(),
            edges: mindMap.network.body.data.edges.getDataSet()
        };

        var nonDefaultNodes = data.nodes.get({
            filter: function (node) {
                return (node.default !== true);
            }
        });

        var nonDefaultEdges = data.edges.get({
            filter: function (edge) {
                return nonDefaultNodes.find(function (nonDefaultNode) {
                    return (nonDefaultNode.id === edge.from) || (nonDefaultNode.id === edge.to);
                });
            }
        });

        data.nodes.remove(nonDefaultNodes);
        data.edges.remove(nonDefaultEdges);

        var noteData = {
            nodes: [],
            edges: []
        };

        levels.forEach(function (level) {
            level.sections.forEach(function (section) {

                var sectionNodes = data.nodes.get({
                    filter: function (node) {
                        return (node.label === section.name) && (node.name === section.name);
                    }
                });

                section.notes.forEach(function (note) {

                    var noteNode = new NodeModel({
                        id: note.id,
                        level: 2,
                        label: note.name,
                        name: note.name,
                        secName: section.name,
                        levelName: level.name,
                        isNote: true
                    });
                    noteData.nodes.push(noteNode);

                    sectionNodes.forEach(function (sectionNode) {

                        var noteEdge = new EdgeModel({
                            from: sectionNode.id,
                            to: noteNode.id
                        });
                        noteData.edges.push(noteEdge);
                    });
                });
            });
        });

        data.nodes.add(noteData.nodes);
        data.edges.add(noteData.edges);

        mindMap.setZoomInLimit();
    }

    onNodeChange(event, properties, senderId) {

        var mindMap = this;

        var data = {
            nodes: mindMap.network.body.data.nodes.getDataSet(),
            edges: mindMap.network.body.data.edges.getDataSet()
        };
    }

    onClick(properties) {
        var mindMap = this;
        mindMap.network.body.container.focus();
    }

    onDoubleClick(properties) {

        var mindMap = this;

        var position = {
            x: properties.event.center.x,
            y: properties.event.center.y
        };

        if (properties.nodes.length > 0) {

            var selectedNode = mindMap.selectedNode();
            if (selectedNode) {
                switch (Math.abs(selectedNode.level)) {
                    case 1:
                        mindMap.openAddToNodePopup(position, selectedNode);
                        break;
                    case 2:
                        mindMap.openEditNodePopup(position, selectedNode);
                        break;
                }
            }
        } else if (properties.edges.length > 0) {

            var selectedNode = mindMap.selectedNode();
            if (selectedNode) {
                mindMap.openEditEdgePopup(position, selectedEdge);
            }
        }
    }

    onRightClick(properties) {
        if (properties.nodes.length > 0) {

            var mindMap = this;

            var selectedNode = mindMap.selectedNode();
            if (selectedNode) {
                switch (selectedNode.collapsed) {
                    case true:
                        mindMap.expand(selectedNode);
                        break;
                    case false:
                        mindMap.collapse(selectedNode);
                        break;
                }
                mindMap.network.unselectAll();
            }
        }
    }

    onRelease(properties) {

        var mindMap = this;

        mindMap.network.layoutEngine.setupHierarchicalLayout();
    }

    onAfterDrawing(ctx) {

        var mindMap = this;

        // var dataURL = ctx.canvas.toDataURL();
        // document.getElementById('mindMapNetworkPreview').src = dataURL;
        mindMap.network.layoutEngine.setupHierarchicalLayout();
    }

    onKeydown(event) {

        var mindMap = this;

        var selectedNode = mindMap.selectedNode();
        if (selectedNode) {
            var code = event.keyCode || event.which;
            switch (code) {
                case 8:     // backspace key
                case 46:     // delete key   
                    if (Math.abs(selectedNode.level) >= 2) {
                        mindMap.callbacks.delete(selectedNode);
                    }
                    break;
                case 27:    // escape key
                    mindMap.callbacks.close();
                    break;
            }
        }
    }

    onZoom() {

        var mindMap = this;

        if (mindMap.network.getScale() <= mindMap.zoomInLimit) {

            mindMap.network.moveTo({
                scale: mindMap.zoomInLimit
            });

            mindMap.setZoomInLimit();
        }
    }

    setZoomInLimit() {

        var mindMap = this;

        mindMap.network.fit();
        mindMap.zoomInLimit = mindMap.network.getScale();
    }

    openAddToNodePopup(position, selectedNode) {

        var mindMap = this;

        mindMap.$addToNodePopup.find('input').eq(0).val("");
        mindMap.$addToNodePopup.modal('show');
        mindMap.$addToNodePopup.find('.modal-dialog').eq(0).css({ position: 'absolute', bottom: "calc(100vh - " + position.y + "px)", left: position.x + "px" });
    }

    openEditNodePopup(position, selectedNode) {

        var mindMap = this;

        mindMap.$editNodePopup.find('input').eq(0).val(selectedNode.name);
        mindMap.$editNodePopup.modal('show');
        mindMap.$editNodePopup.find('.modal-dialog').eq(0).css({ position: 'absolute', bottom: "calc(100vh - " + position.y + "px)", left: position.x + "px" });
    }

    openEditEdgePopup(position, selectedEdge) {

        var mindMap = this;

        mindMap.$editEdgePopup.find('input').eq(0).val(selectedEdge.name);
        mindMap.$editEdgePopup.modal('show');
        mindMap.$editEdgePopup.find('.modal-dialog').eq(0).css({ position: 'absolute', bottom: "calc(100vh - " + position.y + "px)", left: position.x + "px" });
    }

    descendentDataOf(node, withCollapsedStatus = false) {

        var mindMap = this;

        var data = {
            nodes: mindMap.network.body.data.nodes.getDataSet(),
            edges: mindMap.network.body.data.edges.getDataSet()
        };

        var allDescendents = {
            nodes: [],
            edges: []
        };

        var childNodes = data.nodes.get(mindMap.network.getConnectedNodes(node.id, "to"));
        childNodes.forEach(function (childNode) {

            if (!(withCollapsedStatus && childNode.collapsed)) {

                var childDescendentData = mindMap.descendentDataOf(childNode, withCollapsedStatus);
                childDescendentData.nodes.forEach(function (childDescendentNode) {

                    var childToChildDescendentEdges = data.edges.get({
                        filter: function (edge) {
                            return (edge.from === childNode.id) && (edge.to === childDescendentNode.id);
                        }
                    });

                    childToChildDescendentEdges.forEach(function (childToChildDescendentEdge) {
                        allDescendents.edges.push(childToChildDescendentEdge);
                    });

                    allDescendents.nodes.push(childDescendentNode);
                });
            }

            var nodeToChildEdges = data.edges.get({
                filter: function (edge) {
                    return (edge.from === node.id) && (edge.to === childNode.id);
                }
            });

            nodeToChildEdges.forEach(function (nodeToChildEdge) {
                allDescendents.edges.push(nodeToChildEdge);
            });

            allDescendents.nodes.push(childNode);
        });

        return allDescendents;
    }

    descendentNodeExists(node, newDescendentNodeName) {

        var mindMap = this;

        var data = {
            nodes: mindMap.network.body.data.nodes.getDataSet(),
            edges: mindMap.network.body.data.edges.getDataSet()
        };

        var descendentData = mindMap.descendentDataOf(node);
        var descendentNodeNames = descendentData.nodes.map(descendentNode => descendentNode.name);

        var duplicateDescendentNode = descendentNodeNames.find(descendentNodeName => newDescendentNodeName === descendentNodeName);

        return duplicateDescendentNode ? true : false;
    }

    siblingDataOf(node) {

        var mindMap = this;

        var data = {
            nodes: mindMap.network.body.data.nodes.getDataSet(),
            edges: mindMap.network.body.data.edges.getDataSet()
        };

        var allSiblings = {
            nodes: [],
            edges: []
        };

        var parentNodes = data.nodes.get(mindMap.network.getConnectedNodes(node.id, "from"));
        parentNodes.forEach(function (parentNode) {

            var childNodes = data.nodes.get(mindMap.network.getConnectedNodes(parentNode.id, "to"));
            childNodes.forEach(function (childNode) {

                var parentToChildEdges = data.edges.get({
                    filter: function (edge) {
                        return (edge.from === parentNode.id) && (edge.to === childNode.id);
                    }
                });

                parentToChildEdges.forEach(function (parentToChildEdge) {
                    allSiblings.edges.push(parentToChildEdge);
                });

                allSiblings.nodes.push(childNode);
            });
        });

        return allSiblings;
    }

    siblingNodeExists(node, newSiblingNodeName) {

        var mindMap = this;

        var data = {
            nodes: mindMap.network.body.data.nodes.getDataSet(),
            edges: mindMap.network.body.data.edges.getDataSet()
        };

        var siblingData = mindMap.siblingDataOf(node);
        var siblingNodeNames = siblingData.nodes.map(siblingNode => siblingNode.name);

        var duplicateSiblingNode = siblingNodeNames.find(siblingNodeName => newSiblingNodeName === siblingNodeName);

        return duplicateSiblingNode ? true : false;
    }

    selectedNode(index = 0) {

        var mindMap = this;

        var data = {
            nodes: mindMap.network.body.data.nodes.getDataSet(),
            edges: mindMap.network.body.data.edges.getDataSet()
        };

        var selectedData = {
            nodes: data.nodes.get(mindMap.network.getSelectedNodes()),
            edges: data.edges.get(mindMap.network.getSelectedEdges())
        };

        return selectedData.nodes[index];
    }

    unselect() {
        var mindMap = this;
        mindMap.network.unselectAll();
    }

    add(newNode) {
        var mindMap = this;

        var data = {
            nodes: mindMap.network.body.data.nodes.getDataSet(),
            edges: mindMap.network.body.data.edges.getDataSet()
        };

        var sectionNodes = data.nodes.get({
            filter: function (node) {
                return ((node.label === newNode.secName) &&
                    (node.name === newNode.secName) &&
                    (node.secName === newNode.secName) &&
                    (node.levelName === newNode.levelName));
            }
        });
        sectionNodes.forEach(function (sectionNode) {
            mindMap.addTo(sectionNode, newNode);
        });
    }

    addTo(node, newDescendentNode) {

        var mindMap = this;

        var data = {
            nodes: mindMap.network.body.data.nodes.getDataSet(),
            edges: mindMap.network.body.data.edges.getDataSet()
        };

        data.nodes.add(Object.assign(newDescendentNode, {
            level: (Math.sign(node.level) || 1) * (Math.abs(node.level) + 1)
        }));

        var edge = new EdgeModel({
            from: node.id,
            to: newDescendentNode.id
        });

        data.edges.add(edge);

        mindMap.expand(node);

        return newDescendentNode;
    }

    deleteFrom(node, descendentNode) {

        var mindMap = this;

        var data = {
            nodes: mindMap.network.body.data.nodes.getDataSet(),
            edges: mindMap.network.body.data.edges.getDataSet()
        };

        data.nodes.remove(descendentNode);

        var edgesToBeRemoved = data.edges.get({
            filter: function (edge) {
                return (edge.from === node.id) && (edge.to === descendentNode.id);
            }
        });

        data.edges.remove(edgesToBeRemoved);

        return descendentNode;
    }

    update(node, name) {

        var mindMap = this;

        var data = {
            nodes: mindMap.network.body.data.nodes.getDataSet(),
            edges: mindMap.network.body.data.edges.getDataSet()
        };

        var updatedNode = Object.assign(node, {
            name: name,
            label: name
        });

        data.nodes.update(updatedNode);
        return updatedNode;
    }

    delete(node) {

        var mindMap = this;

        var data = {
            nodes: mindMap.network.body.data.nodes.getDataSet(),
            edges: mindMap.network.body.data.edges.getDataSet()
        };

        var oldData = Object.assign({
            nodes: [],
            edges: []
        }, mindMap.descendentDataOf(node, false));


        oldData.nodes.push(node);

        var edgesToNode = data.edges.get({
            filter: function (edge) {
                return (edge.to === node.id);
            }
        });

        edgesToNode.forEach(function (edgeToNode) {
            oldData.edges.push(edgeToNode);
        });

        data.edges.remove(oldData.edges);
        data.nodes.remove(oldData.nodes);
    }

    expand(node) {

        var mindMap = this;

        var data = {
            nodes: mindMap.network.body.data.nodes.getDataSet(),
            edges: mindMap.network.body.data.edges.getDataSet()
        };

        var descendentData = mindMap.descendentDataOf(node, true);

        if (descendentData.nodes.length > 0) {

            var updatedData = {
                nodes: [],
                edges: []
            };

            descendentData.nodes.forEach(function (descendentNode) {
                Object.assign(descendentNode, {
                    hidden: false
                });
                updatedData.nodes.push(descendentNode);
            });

            descendentData.edges.forEach(function (descendentEdge) {
                Object.assign(descendentEdge, {
                    hidden: false
                });
                updatedData.edges.push(descendentEdge);
            });

            Object.assign(node, {
                collapsed: false,
                borderWidth: 0,
                borderWidthSelected: 0
            });
            updatedData.nodes.push(node);

            data.nodes.update(updatedData.nodes);
            data.edges.update(updatedData.edges);
        }
    }

    collapse(node) {

        var mindMap = this;

        var data = {
            nodes: mindMap.network.body.data.nodes.getDataSet(),
            edges: mindMap.network.body.data.edges.getDataSet()
        };

        var descendentData = mindMap.descendentDataOf(node, true);

        if (descendentData.nodes.length > 0) {

            var updatedData = {
                nodes: [],
                edges: []
            };

            descendentData.nodes.forEach(function (descendentNode) {
                Object.assign(descendentNode, {
                    hidden: true
                });
                updatedData.nodes.push(descendentNode);
            });

            descendentData.edges.forEach(function (descendentEdge) {
                Object.assign(descendentEdge, {
                    hidden: true
                });
                updatedData.edges.push(descendentEdge);
            });

            Object.assign(node, {
                collapsed: true,
                borderWidth: 1,
                borderWidthSelected: 2
            });
            updatedData.nodes.push(node);

            data.nodes.update(updatedData.nodes);
            data.edges.update(updatedData.edges);
        }
    }

    applyTheme(uiStyles) {

        var mindMap = this;
        mindMap.network.setOptions(uiStyles);
    }
}