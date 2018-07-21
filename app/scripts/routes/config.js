
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
                    templateUrl: './views/login.page.html',
                    controller: 'LoginController'
                }
            }
        }).state('workspace', {
            url: "^/workspace",
            views: {
                "": {
                    templateUrl: './views/main.page.html',
                    controller: 'WorkspaceController'
                },
                "session-view@workspace": {
                    templateUrl: "./views/partial/session.view.html"
                },
                "mind-map@workspace": {
                    templateUrl: "./views/partial/mind.map.html"
                },
                "recon-workspace@workspace": {
                    templateUrl: "./views/partial/recon.workspace.html"
                },
                "search-workspace@workspace": {
                    templateUrl: "./views/partial/search.workspace.html"
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
