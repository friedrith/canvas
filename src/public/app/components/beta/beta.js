app.directive("beta", function(user) {
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    templateUrl: 'app/components/beta/beta.html',
    link: function(scope, element, attrs, ngModel) {


    }
  };
});
