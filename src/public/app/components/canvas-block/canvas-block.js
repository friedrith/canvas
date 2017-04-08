app.directive("canvasBlock", function(user) {
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    require: "ngModel",
    scope: { editable: '=', canvasName: '@', blockName: '@', title: '@', icon: '@'},
    templateUrl: '/app/components/canvas-block/canvas-block.html',
    link: function(scope, element, attrs, ngModel) {

        scope.show = false;

        scope.value = '';


        scope.top = false;

        if (attrs.top) {
            scope.top = true;
        }

        scope.showEditor = function () {
            if (scope.editable) {
                scope.show = true;
            }
        };

        scope.onChange = function () {
          if (ngModel) {
            ngModel.$setViewValue(scope.value);
          }
        };

        if (ngModel) {
            ngModel.$render = function() {
                scope.value = ngModel.$viewValue;

            };
        }
    }
  };
});
