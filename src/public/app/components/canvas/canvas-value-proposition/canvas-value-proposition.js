app.directive("canvasValueProposition", function(user) {
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    templateUrl: '/app/components/canvas/canvas-value-proposition/canvas-value-proposition.html',
    link: function(scope, element, attrs, ngModel) {

    }
  };
});
