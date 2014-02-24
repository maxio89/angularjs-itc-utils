(function ()
{
    'use strict';

    function itcEquals()
    {
        return {
            restrict: 'A',
            require: '^ngModel',
            link: function (scope, elem, attrs, ctrl)
            {
                var validate = function ()
                {
                    //get the model value of the first input
                    //noinspection JSUnresolvedVariable
                    var val1 = scope.$eval(attrs.itcEquals);

                    //get the model value of the second input
                    var val2 = scope.$eval(attrs.ngModel);

                    return val1 === val2;
                };
                scope.$watch(validate, function (validity)
                {
                    ctrl.$setValidity('equals', validity);
                });
            }
        };
    }

    function itcLessThan()
    {
        return {
            restrict: 'A',
            require: '^ngModel',
            link: function (scope, elem, attrs, ctrl)
            {
                var validate = function ()
                {

                    //get the model value of the first input
                    var val1 = scope.$eval(attrs.itcLessThan);

                    //get the model value of the second input
                    var val2 = scope.$eval(attrs.ngModel);

                    return val2 < val1;
                };
                scope.$watch(validate, function (validity)
                {
                    ctrl.$setValidity('lessthan', validity);
                });
            }
        };
    }

    angular.module('pl.itcrowd.directives').directive('itcEquals', itcEquals);
    angular.module('pl.itcrowd.directives').directive('itcLessThan', itcLessThan);
})();
