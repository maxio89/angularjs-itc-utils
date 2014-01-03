'use strict';

angular.module('itcValidate', []).directive('itcEquals',function ()
{
    return {
        restrict: 'A',
        require: '^ngModel',
        link: function (scope, elem, attrs, ctrl)
        {
            var validate = function ()
            {

                //get the model value of the first input
                var val1 = scope.$eval(attrs.itcEquals);

                //get the model value of the second input
//                var val2 = ctrl.$viewValue;
                var val2 = scope.$eval(attrs.ngModel);

                return val1 === val2;
            };
            scope.$watch(validate, function (validity)
            {
                ctrl.$setValidity("equals", validity);
            });
        }
    };
}).directive('itcUnique', ['$resource', function ($resource)
        {
            return {
                restrict: 'A',
                require: '^ngModel',
                link: function (scope, elem, attrs, ctrl)
                {
                    elem.on('blur', function ()
                    {
                        scope.$apply(function ()
                        {
                            $resource('/api/user/unique').get({value: scope.$eval(attrs.ngModel)}, function (data)
                            {
                                ctrl.$setValidity('unique', data);
                            });
                        });
                    });
                }
            }
        }
        ]);


