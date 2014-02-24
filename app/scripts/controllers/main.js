'use strict';

angular.module('angularjsItcUtils').controller('MainCtrl', function ($scope)
{
    $scope.awesomeThings = [
        'HTML5 Boilerplate', 'AngularJS', 'Karma'
    ];

    $scope.credentials = {email: null, password: null, passwordConfirmation: null};
    $scope.credentials2 = {email: null, password: null, passwordConfirmation: null};
    $scope.credentials3 = {email: null, password: null, passwordConfirmation: null};

    $scope.register = function ()
    {
        $scope.registered = true;
    };

    $scope.tryAgain = function ()
    {
        $scope.registered = false;
        $scope.credentials = {email: null, password: null, passwordConfirmation: null};
        $scope.credentials2 = {email: null, password: null, passwordConfirmation: null};
        $scope.credentials3 = {email: null, password: null, passwordConfirmation: null};
        $scope.registerForm.$setPristine();
        $scope.registerForm2.$setPristine();
        $scope.registerForm3.$setPristine();
    };
});
