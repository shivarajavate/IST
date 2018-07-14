
var ist = angular.module('ist');
ist.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider.state('login', {
            url: "^/login",
            views: {
                "": {
                    templateUrl: './views/login.html',
                    controller: 'LoginController'
                }
            }
        }).state('workspace', {
            url: "^/workspace",
            views: {
                "": {
                    templateUrl: './views/workspace.html',
                    controller: 'WorkspaceController'
                },
                "project-view@workspace": {
                    templateUrl: "./views/partial/project.view.html"
                },
                "mind-map@workspace": {
                    templateUrl: "./views/partial/mind.map.html"
                },
                "workspace-view@workspace": {
                    templateUrl: "./views/partial/workspace.view.html"
                },
                "note-form@workspace": {
                    templateUrl: "./views/partial/note.form.html"
                },
                "conditions-table@workspace": {
                    templateUrl: "./views/partial/conditions.table.html"
                }
            }
        });
    }
]);
