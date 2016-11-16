app
.directive('modal', function($rootScope) {
    return {
        scope: {
            modal: '='
        },
        link: function (scope, element, attrs) {
            angular.element(element).modal({
                onHidden: function () {
                    $rootScope.$apply(function  () {
                        scope.modal = false;
                    });
                }
            });
            scope.$watch('modal', function(newValue, oldValue) {
                if (newValue) {
                    angular.element(element).modal('show');
                } else {
                    angular.element(element).modal('hide');
                }
            }, true);
        }
    };
});
