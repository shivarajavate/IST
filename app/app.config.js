
var ist = angular.module('ist', ['ngCookies', 'ngRoute', 'ui.router']);
var appConst = {
    levelWidgetMapping: {
        "User": {
            type: "",
            category: ""
        },
        "Deployment": {
            type: "Test",
            category: ""
        },
        "Attributes": {
            type: "Test",
            category: ""
        },
        "Environment": {
            type: "Test",
            category: ""
        },
        "Flow": {
            type: "Requirement",
            category: ""
        },
        "Behaviour": {
            type: "Feature",
            category: ""
        },
        "Structure": {
            type: "Component",
            category: ""
        },
        "Interface": {
            type: "Component",
            category: ""
        },
        "Input": {
            type: "Field",
            category: ""
        }
    },
    lang: "en",
    request: {
        resource: {
            url: "/ist/api/resource/"
        },
        project: {
            url: "/ist/api/project/"
        },
        template: {
            url: "/ist/api/template/"
        },
        uisetting: {
            url: "/ist/api/uisetting/"
        },
        publicRepositoryServer: {
            url: "https://platform.stagsoftware.net/wp-json/jwt-auth/v1/token/",
            params: {
                username: "username",
                password: "password"
            }
        },
        publicWidgetRepository: {
            url: "http://platform.stagsoftware.net/wp-json/wp/v2/posts/",
            params: {
                offset: 0,
                per_page: 100
            }
        }
    },
    states: {
        login: "login",
        workspace: "workspace"
    },
    dbConnected: true
};

if (!appConst.dbConnected) {
    appConst.request.resource.url = "/assets/data/resources.json";
    appConst.request.project.url = "/assets/data/projects.json";
    appConst.request.template.url = "/assets/data/templates.json";
    appConst.request.uisetting.url = "/assets/data/uisettings.json";
}