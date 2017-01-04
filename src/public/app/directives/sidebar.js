app
.directive('sidebar', function(user, $location) {
    return {
        link: function (scope, element, attrs) {

            angular.element(element).sidebar('setting', 'transition', 'auto');

            scope.sidebar = function (mode) {
                angular.element(element).sidebar(mode);
            };

            scope.user = user;

            scope.gotoGallery = function () {
                $location.path('/gallery');
                scope.sidebar('hide');
            };

            scope.gotoList = function () {
                $location.path('/list');
                scope.sidebar('hide');
            };

        }
    };
});
