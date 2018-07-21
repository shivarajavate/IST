
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

        function getProject(name) {

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

                var addedProject = response.data;

                switch (record) {
                    case true:
                        return addSession(addedProject).then(function (session) {
                            return session.project;
                        });
                        break;
                    case false:
                        return addedProject;
                        break;
                }
            });
        }

        function updateProject(project, record = false) {

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

                var updatedProject = response.data;

                switch (record) {
                    case true:
                        return addSession(updatedProject).then(function (session) {
                            return session.project;
                        });
                        break;
                    case false:
                        return updatedProject;
                        break;
                }
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

        function loadProject(project) {

            var params = {
                model: null,
                template: null,
                uiSettings: null
            };

            return getProject(project.name)
                .then(function (model) {

                    params.model = model;
                    return getTemplate(project.templateName)
                })
                .then(function (template) {

                    params.template = template;
                    return getUisetting(project.uisettingName);
                })
                .then(function (uiSettings) {

                    params.uiSettings = uiSettings;
                    return params;
                });
        }

        function getTemplate(name) {

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

        function getUisetting(name) {

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
                name: project.session.toString(),
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

        return {
            loadProjects: loadProjects,
            loadSessions: loadSessions,
            loadTemplates: loadTemplates,
            getProject: getProject,
            addProject: addProject,
            updateProject: updateProject,
            deleteProject: deleteProject,
            loadProject: loadProject
        };

    }
]);
