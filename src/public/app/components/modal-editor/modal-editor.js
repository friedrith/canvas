app.directive("modalEditor", function($rootScope, user) {
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    require: "ngModel",
    templateUrl: '/app/components/modal-editor/modal-editor.html',
    scope: { icon: '@', title: '@', show: '=' },
    link: function(scope, element, attrs, ngModel) {
        scope.value = '';
        scope.user = user;
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

        // scope.save = function () {
        //   console.log(scope.model);
        //   user.saveCanvas();
        // };

        scope.onChange = function () {
          ngModel.$setViewValue(scope.value);
        };

        ngModel.$render = function() {
          scope.value = ngModel.$viewValue;
        };


     }
  };
});
