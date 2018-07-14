
var ist = angular.module('ist');
ist.directive('suggest', function () {
    return {
        restrict: "A",
        link: function ($scope, $element, attrs) {

            $element.suggest('@', {
                data: $scope.tags,
                map: function (tags) {
                    return {
                        value: tags,
                        text: '<strong>' + tags + '</strong>'
                    }
                }
            });
        }
    };
});