
var ist = angular.module('ist');
ist.directive('suggest', function () {
    return {
        restrict: "A",
        scope: {
            suggestions: '=',
            selectedSuggestion: '=',
            onSelect: '&'
        },
        link: function ($scope, $element, attrs) {

            $element.suggest('@', {
                data: $scope.suggestions,
                map: function (tags) {
                    return {
                        value: tags,
                        text: '<strong>' + tags + '</strong>'
                    }
                },
                onselect: function (event, suggestion) {
                    if (attrs.onSelect) {
                        $scope.selectedSuggestion = suggestion.value;
                        $scope.$apply($scope.onSelect);
                    }
                }
            });
        }
    };
});