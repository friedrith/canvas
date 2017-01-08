app.directive("modalEditor", function($rootScope) {
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    templateUrl: '/app/components/modal-editor/modal-editor.html',
    scope: { icon: '@', title: '@', model: '=', show: '=' },
    link: function(scope, element, attrs, ngModel) {
        angular.element(element).modal({
            closable: true,
            onHidden: function () {
                $rootScope.$apply(function  () {
                    scope.show = false;
                });
            }
        });
        scope.$watch('show', function(newValue, oldValue) {
            if (newValue) {
                angular.element(element).modal('show');
            } else {
                angular.element(element).modal('hide');
            }
        }, true);
    }
  };
});
