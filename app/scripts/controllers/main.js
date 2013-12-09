'use strict';

angular.module('angularjsItcUtilsApp').controller('MainCtrl', function ($scope)
        {
            $scope.credentials = {email: null, password: null, passwordConfirmation: null};
            $scope.awesomeThings = [
                'HTML5 Boilerplate', 'AngularJS', 'Karma'
            ];
        });
