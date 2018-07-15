
var ist = angular.module('ist');
ist.service('ProjectService', [
    '$http',
    function ($http) {

        function loadProjects() {

            var request = {
                method: 'GET',
                url: appConst.request.project.url,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            return $http(request).then(function (response) {
                return response.data;
            });
        }

        function loadTemplates() {

            var request = {
                method: 'GET',
                url: appConst.request.template.url,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            return $http(request).then(function (response) {
                return response.data;
            });
        }

        function loadProject(project) {

            var params = {
                model: project,
                views: [
                    {
                        key: "RECON",
                        name: "reconWorkspace",
                        canvasName: "reconWorkspaceCanvas"
                    },
                    {
                        key: "SEARCH",
                        name: "searchWorkspace",
                        canvasName: "searchWorkspaceCanvas"
                    },
                    {
                        key: "MINDMAP",
                        name: "mindMap",
                        canvasName: "mindMapNetworkCanvas"
                    }
                ],
                template: null,
                uiSettings: null
            };

            var request = {
                method: 'GET',
                url: appConst.request.template.url,
                params: {
                    name: params.model.templateName
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            return $http(request).then(function (response) {
                var template = response.data;

                var request = {
                    method: 'GET',
                    url: appConst.request.uisetting.url,
                    params: {
                        name: params.model.uisettingName
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                return $http(request).then(function (response) {
                    var uiSettings = response.data;

                    params.template = template;
                    params.uiSettings = uiSettings;

                    return params;
                });
            });
        }

        function addProject(project) {

            // For clone
            delete project._id;

            var request = {
                method: 'POST',
                url: appConst.request.project.url,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: project
            };

            return $http(request).then(function (response) {
                console.log('new project added successfully');
            });
        }

        function updateProject(project) {

            var request = {
                method: 'PUT',
                url: appConst.request.project.url,
                params: {
                    _id: project._id
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                data: project
            };

            return $http(request).then(function (response) {
                console.log("project updated successfully");
            });
        }

        function saveProject(project) {

            var request = {
                method: 'PUT',
                url: appConst.request.project.url,
                params: {
                    _id: project._id
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                data: project
            };

            return $http(request);
        }

        function deleteProject(project) {

            var request = {
                method: 'DELETE',
                url: appConst.request.project.url,
                params: {
                    _id: project._id
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            return $http(request).then(function (response) {
                console.log("project deleted successfully");
            });
        }

        return {
            loadProjects: loadProjects,
            loadTemplates: loadTemplates,
            loadProject: loadProject,
            addProject: addProject,
            updateProject: updateProject,
            saveProject: saveProject,
            deleteProject: deleteProject
        };

    }
]);
