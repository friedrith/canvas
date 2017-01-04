app.directive("passwordValidator", function($rootScope) {
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    templateUrl: 'app/components/password-validator/password-validator.html',
    scope: { password: '=', min: '@', strength : '=' },
    link: function(scope, element, attrs, ngModel) {

        scope.wrongMax = 50;
        scope.mediumMax = 70;

        // none = -1
        // very weak = 0
        // weak = 1
        // ok = 2
        // strong = 3
        // very strong = 4

        scope.strength = -1;
        scope.label = '';

        scope.$watch('password', function(newValue, oldValue) {
            if (scope.password != undefined) {


                // scope.$apply(function () {

                    var score = scope.password.length / 12 * 100;

                    if (scope.password.match(/[0-9]/)) {
                        score += 30;
                    }

                    if (scope.password.match(/[A-Z]/)) {
                        score += 30;
                    }

                    if (scope.password.match(/[\!\?\#\&\{\[\(\@\]\)\}\=\*\$]/)) {
                        score += 30;
                    }



                    /*if (scope.password.length == 0) {
                        scope.strength = -1;
                    } else*/ if (score < 25) {
                        scope.strength = 0
                    } else if (score >= 25 && score < 67) {
                        scope.strength = 1;
                    } else if (score >= 67 && score < 100) {
                        scope.strength = 2;
                    } else if (score >= 100 && score < 150) {
                        scope.strength = 3;
                    } else {
                        scope.strength = 4;
                    }


                // });
            }
        }, true);
    }
  };
});
