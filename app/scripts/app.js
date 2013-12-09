'use strict';

angular.module('angularjsItcUtilsApp', [
            'ngResource', 'ngRoute'
        ]).config(function ($routeProvider)
        {
            $routeProvider.when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl'
                    }).otherwise({
                        redirectTo: '/'
                    });
        });
