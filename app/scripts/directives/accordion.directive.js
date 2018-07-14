
var ist = angular.module('ist');
ist.directive('accordion', function () {
    return {
        restrict: "A",
        link: function ($scope, $element, attrs) {

            var $button = $element.find("button").eq(0);
            var $textarea = $button.siblings("textarea").eq(0);

            $textarea.css({ "display": "none" });
            $button.on("click", function () {
                $button.toggleClass("active");
                $textarea.slideToggle("slow");
            });
        }
    };
});