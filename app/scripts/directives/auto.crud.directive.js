
var ist = angular.module('ist');
ist.directive('autoCrud', function () {
    return {
        restrict: 'A',
        link: function ($scope, $element, attrs) {

            // // used to get path for controllerAs syntax
            // var path = function (obj, path, def) {
            //     var i, len;

            //     for (i = 0, path = path.split('.'), len = path.length; i < len; i++) {
            //         if (!obj || typeof obj !== 'object') return def;
            //         obj = obj[path[i]];
            //     }

            //     if (obj === undefined) return def;
            //     return obj;
            // }

            // // Determine $scope model
            // var ngModel = path($scope, attrs.ngModel);

            $element.on("keydown", function (event) {

                // Detecting shift/ctrl/alt key press
                if (!event.shiftKey && !event.ctrlKey && !event.altKey) {

                    var $next = $element.parent().next().find("textarea").eq(0);
                    var $prev = $element.parent().prev().find("textarea").eq(0);

                    var code = event.keyCode || event.which;
                    switch (code) {
                        case 13:    // enter key

                            event.preventDefault();
                            $scope.$apply(attrs.onCreate);
                            $next = $element.parent().next().find("textarea").eq(0);
                            $next.focus();
                            break;

                        case 8:     // backspace key

                            if (!$element.val()) {
                                event.preventDefault();
                                $scope.$apply(attrs.onDelete);
                                $prev.focus();
                            }
                            break;

                        case 46:     // delete key

                            event.preventDefault();
                            $scope.$apply(attrs.onDelete);
                            $prev.focus();
                            break;

                        case 40:    // arrow down key

                            event.preventDefault();
                            $next.focus();
                            break;

                        case 38:    // arrow up key

                            event.preventDefault();
                            $prev.focus();
                            break;
                    }
                }
            });

            // NOTE: Focus on the first element when ready by default
            if ($scope.$index === 0) {
                angular.element($element).ready(function () {
                    $element.focus();
                });
            }
        }
    }
});
