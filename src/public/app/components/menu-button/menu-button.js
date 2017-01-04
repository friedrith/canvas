app.directive("menuButton", function() {
  return {
    restrict: "A",
    replace: true,
    transclude: true,
    templateUrl: 'app/components/menu-button/menu-button.html',
    link: function(scope, element, attrs, ngModel) {
        console.log('menu-button')
    }
  };
});
