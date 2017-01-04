'use strict';
app.controller('SignUpCtrl', function($scope, $location, $timeout, user) {

    $scope.user = user;
    $scope.email = '';
    // $scope.password = '';

    $scope.signIn = function ()  {
        $location.path('/sign-in');
    };

    // 'none', 'free', 'used'
    $scope.emailState = 'none' ;

    $scope.submitForm = function(isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
            // alert('our form is amazing');
            user.signUp($scope.email, $scope.password, function (success){
                console.log('callback');
                if (success) {
                    $location.path('/canvas/value-proposition/new');
                } else {
                    console.log('fail');
                }
            });
        }

    };

    var lastEmailChecked = '';

    $scope.checkEmail = function (valid, email) {
        if (valid) {
            lastEmailChecked = email;
            $scope.user.checkEmail(email, function (free) {
                console.log('checkEmail callback');
                if (free) {
                    $scope.emailState = 'free';
                } else {
                    $scope.emailState = 'used';
                }
            });
        }
    };

    $scope.emailUpdated = function (email) {
        if(email != lastEmailChecked) {
            $scope.emailState = 'none';
        }
    };

});
