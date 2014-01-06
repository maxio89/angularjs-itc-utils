'use strict';

angular.module('angularjsItcUtilsApp', [
            'ngResource', 'ngRoute', 'itcValidate'
        ]).config(function ($routeProvider)
        {
            $routeProvider.when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl'
                    }).otherwise({
                        redirectTo: '/'
                    });
        });
