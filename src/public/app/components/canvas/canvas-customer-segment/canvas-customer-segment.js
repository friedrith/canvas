app.directive("canvasCustomerSegment", function(user) {
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    templateUrl: '/app/components/canvas/canvas-customer-segment/canvas-customer-segment.html',
    link: function(scope, element, attrs, ngModel) {

        scope.showPainsEditor = false;
        scope.showGainsEditor = false;
        scope.showJobEditor = false;
    }
  };
});
