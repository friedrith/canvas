// https://docs.angularjs.org/guide/forms
// https://scotch.io/tutorials/angularjs-form-validation
// var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i;

/*
var EMAIL_REGEXP_1 = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+$/;

var EMAIL_REGEXP_2 = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@$/;*/

var EMAIL_REGEXP = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+(|@(|[a-zA-Z0-9_-]+(|\.(|[a-zA-Z]+))))$/;

app
.directive('naturalEmail', function(user, $location) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl ) {

            if (ctrl && ctrl.$validators.email) {

                // this will overwrite the default Angular email validator
                ctrl.$validators.email = function(modelValue) {
                    return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
                };
            }

        }
    };
});
