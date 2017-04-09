app.directive("canvasStartupFounder", function(user) {
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    templateUrl: '/app/components/canvas/canvas-startup-founder/canvas-startup-founder.html',
    link: function(scope, element, attrs, ngModel) {


    }
  };
});
