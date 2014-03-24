/**
 *  Directive for performing html input validation over http.
 *
 *  Usage:  <input ng-http-validator="[validator_name]" holder-id="[id]">
 *  Warning message display example: <span ng-show="[form_name].[input_name].$error.[validator_name]">[some_message]</span>

 *  [validator_name] string  will be used to construct url so it can have no spaces, special characters etc. and you need to have a rest service listening
 *  under such url. For example <input ng-http-validator="unique_email"> will call server method under (...)/api/validate/unique_email?value=[input_value].
 *  For multi-word validator name it's important not to use "-" as Angular has some problems with parsing them. Use "_" instead.
 */
/*global doubleEscapedContextPath*/
(function ()
{
    'use strict';

    function itcHttpValidator($http, $timeout)
    {
        var checking = null;
        return {
            require: '^ngModel',
            scope: {
                holderId: '='
            },
            link: function (scope, element, attrs, controller)
            {
                //noinspection JSValidateTypes
                scope.$parent.$watch(attrs.ngModel, function ()
                {
                    if (!checking && element.val() !== '') {
                        checking = $timeout(function ()
                        {
                            var param;
                            if (scope.holderId != null) {
                                param = '&id=' + scope.holderId;
                            } else {
                                param = '';
                            }
                            $http.post(doubleEscapedContextPath + '/api/validate/' + attrs.itcHttpValidator, 'value=' + element.val() + param,
                                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function (valid)
                                    {
                                        //noinspection JSUnresolvedVariable
                                        controller.$setValidity(attrs.itcHttpValidator, valid === 'true');
                                        checking = null;
                                    }).error(function ()
                                    {
                                        checking = null;
                                    });
                        }, 500);
                    }
                    if (element.val() === '') {
                        //noinspection JSUnresolvedVariable
                        controller.$setValidity(attrs.itcHttpValidator, true);
                    }
                });
            }
        };
    }

    //noinspection JSValidateTypes
    angular.module('restbase.directives').directive('itcHttpValidator', ['$http', '$timeout', itcHttpValidator]);
})();
