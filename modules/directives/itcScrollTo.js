(function ()
{
    'use strict';

    function itcScrollTo()
    {
        return {
            restrict: 'A',
            compile: function ()
            {
                return function (scope, element)
                {
                    element.find('a').smoothScroll({offset: -100});
                    angular.forEach(element.find('a'), function (field)
                    {
                        jQuery(field).click(function (event)
                        {
                            event.preventDefault();
                        });
                    });
                };
            }
        }
    }

    angular.module('pl.itcrowd.directives').directive('itcScrollTo', itcScrollTo);
})();

