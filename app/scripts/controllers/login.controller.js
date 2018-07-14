
var ist = angular.module('ist');
ist.controller('LoginController', [
    '$scope',
    '$http',
    '$window',
    '$state',
    '$cookies',
    'AppService',
    function ($scope, $http, $window, $state, $cookies, AppService) {

        function init() {
            AppService.loadResources();
        }

        function login(user) {

            AppService.loginUser(user.name, user.password)
                .then(
                    function onSuccess(response) {
                        if (response.status === 200) {
                            $scope.publicToken = response.data.token
                        }

                        $window.localStorage.setItem('publicToken', response.data.token);
                        $window.localStorage.setItem('userName', response.data.user_display_name);

                        $cookies.putObject('UserName', response.data.user_display_name);
                        $state.go(appConst.states.workspace);
                    },
                    function onError(response) {
                        $scope.error = AppService.getResourceText("R004");
                    });
        }

        $scope.loginFormSubmit = function (user) {

            if (user) {
                $scope.error = '';
                login(user);
            }
            else {
                $scope.error = AppService.getResourceText("R004");
            }
        }

        init();
    }
]);
