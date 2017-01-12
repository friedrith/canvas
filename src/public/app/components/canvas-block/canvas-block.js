app.directive("canvasBlock", function(user) {
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    scope: { editable: '=', value: '=', canvasName: '@', blockName: '@', title: '@', icon: '@'},
    templateUrl: '/app/components/canvas-block/canvas-block.html',
    link: function(scope, element, attrs, ngModel) {

        scope.show = false;


        scope.top = false;

        if (attrs.top) {
            scope.top = true;
        }

        scope.showEditor = function () {
            if (scope.editable) {
                scope.show = true;
            }
        };
    }
  };
});
