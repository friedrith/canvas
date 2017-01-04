app
.directive('slider', function() {
    return {
        link: function (scope, element, attrs) {
            angular.element(element).range({
                min: 0,
                max: 6,
                start: 3
            });
        }
    };
});
