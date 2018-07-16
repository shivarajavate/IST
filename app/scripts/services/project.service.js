
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

        function loadSessions() {

            var request = {
                method: 'GET',
                url: appConst.request.session.url,
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

        function loadProject(name) {

            var request = {
                method: 'GET',
                url: appConst.request.project.url,
                params: {
                    name: name
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            return $http(request).then(function (response) {
                return response.data;
            });
        }

        function addProject(project, record = true) {

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
                if (record) {
                    addSession(response.data);
                }
                return response.data;
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
                return response.data;
            });
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
               return response.data;
            });
        }

        function loadTemplate(name) {

            var request = {
                method: 'GET',
                url: appConst.request.template.url,
                params: {
                    name: name
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            return $http(request).then(function (response) {
                return response.data;
            });
        }

        function loadUisetting(name) {

            var request = {
                method: 'GET',
                url: appConst.request.uisetting.url,
                params: {
                    name: name
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            return $http(request).then(function (response) {
                return response.data;
            });
        }

        function addSession(project) {

            var newSession = {
                name: "session " + (project.session),
                project: project
            };

            var request = {
                method: 'POST',
                url: appConst.request.session.url,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: newSession
            };

            return $http(request).then(function (response) {
                return response.data;
            });
        }

        function loadProjectSession(project) {

            var params = {
                model: null,
                template: null,
                uiSettings: null
            };

            return loadProject(project.name)
                .then(function (model) {

                    params.model = model;
                    return loadTemplate(project.templateName)
                })
                .then(function (template) {

                    params.template = template;
                    return loadUisetting(project.uisettingName);
                })
                .then(function (uiSettings) {

                    params.uiSettings = uiSettings;
                    return params;
                });
        }

        function saveProjectSession(project) {

            return updateProject(project).then(function (updatedProject) {
                return addSession(updatedProject);
            });
        }

        return {
            loadProjects: loadProjects,
            loadSessions: loadSessions,
            loadTemplates: loadTemplates,
            loadProject: loadProject,
            addProject: addProject,
            updateProject: updateProject,
            deleteProject: deleteProject,
            loadProjectSession: loadProjectSession,
            saveProjectSession: saveProjectSession,
        };

    }
]);
