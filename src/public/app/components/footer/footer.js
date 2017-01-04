app.directive("footer", function(user) {
  return {
    restrict: "A",
    replace: true,
    transclude: true,
    templateUrl: 'app/components/footer/footer.html',
    link: function(scope, element, attrs, ngModel) {


    }
  };
});
