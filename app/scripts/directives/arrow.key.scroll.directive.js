
var ist = angular.module('ist');
ist.directive('arrowKeyScroll', function () {
    return {
        restrict: "A",
        link: function ($scope, $element, attrs) {

            var defaultSelection = parseInt(attrs.arrowKeyScroll);

            var $ul = $element.find("ul").eq(0);

            $ul.on("keydown", "li", function (event) {

                var $prev = $(this).prev();
                var $next = $(this).next();

                switch (event.keyCode) {
                    case 40: // arrow down
                        if (!($next.index() < 0)) {
                            $next.trigger("click");
                        }
                        break;
                    case 38: // arrow up
                        if (!($prev.index() < 0)) {
                            $prev.trigger("click");
                        }
                        break;
                }
                return false;
            });

            $ul.on("click", "li", function (event) {

                var $liCollection = $ul.find("li");
                var $this = $(this);
                // var liScrollHeight = $ul.outerHeight() / $liCollection.length;

                $liCollection.removeClass("active");
                $this.focus().addClass("active");
                // $element.scrollTop($this.index() * liScrollHeight);
            });

            angular.element($ul).ready(function () {
                if (defaultSelection > 0) {
                    var selectedLiIndex = (defaultSelection - 1);
                    $ul.find("li").eq(selectedLiIndex).trigger("click");
                }
            });

        }
    };
});