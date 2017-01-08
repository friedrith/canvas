app.directive("header", function(user) {
  return {
    restrict: "A",
    replace: true,
    transclude: true,
    templateUrl: '/app/components/header/header.html',
    link: function(scope, element, attrs, ngModel) {


    }
  };
});
