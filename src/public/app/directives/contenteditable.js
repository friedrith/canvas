app.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });

    //   console.log(attrs);
      if (attrs.hasOwnProperty('inline')) {
          element.bind("keypress", function(event) {
            //   console.log('keypress');
              if (event.keyCode == 13) {
                  event.preventDefault();
                  event.stopPropagation();
                  return false;
              }
          });
      }
    }
  };
});
