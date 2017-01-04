app
.directive('dropdown', function() {
    return {
        link: function (scope, element, attrs) {
            angular.element(element).dropdown();
        }
    };
});
