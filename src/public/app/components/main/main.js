app.directive("main", function(user) {
  return {
    restrict: "EA",
    replace: true,
    transclude: true,
    templateUrl: '/app/components/main/main.html',
    link: function(scope, element, attrs, ngModel) {


    }
  };
});
