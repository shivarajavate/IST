
var ist = angular.module('ist');
ist.directive('autosize', function () {
    return {
        restrict: "A",
        link: function ($scope, $element, attrs) {
            
            autosize($element);
            $scope.$watch(attrs.ngModel, function () {
                autosize.update($element);
            });
        }
    };
});