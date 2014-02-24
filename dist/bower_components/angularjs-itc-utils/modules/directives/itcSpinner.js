/*global Spinner*/
(function ()
{
    'use strict';

    function itcSpinner()
    {
        return {
            restrict: 'A',
            link: function (scope, element, attrs)
            {
                var spinner;
                var start = function ()
                {
                    var height = element.height(), opts = {
                        length: Math.round(height / 8),
                        radius: Math.round(height / 5),
                        width: Math.round(height / 10),
                        color: element.css('color'),
                        className: 'spinner'
                    };
                    attrs.$set('disabled', true);
                    spinner = new Spinner(opts).spin(element[0]);
                };

                scope.$watch(attrs.itcSpinner, function (newVal)
                {
                    if (newVal) {
                        start();
                    } else if (spinner) {
                        attrs.$set('disabled', false);
                        spinner.stop();
                    }
                });
            }
        };
    }

    angular.module('pl.itcrowd.directives').directive('itcSpinner', ['$timeout', itcSpinner]);
})();
