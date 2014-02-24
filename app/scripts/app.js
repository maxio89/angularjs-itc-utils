'use strict';

angular.module('angularjsItcUtils', [
            'ngResource', 'ngRoute', 'pl.itcrowd.directives', 'pl.itcrowd.services', 'pl.itcrowd.constants'
        ]).config(function ($routeProvider)
{
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    }).otherwise({
        redirectTo: '/'
    });
});
