(function ()
{
    'use strict';

    function itcForceReload($location, $route)
    {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs)
            {
                element.bind('click', function ()
                {
                    scope.$apply(function ()
                    {
                        if ($location.path() === attrs.href) {
                            $route.reload();
                        }
                    });
                });
            }
        };
    }

    angular.module('pl.itcrowd.directives').directive('itcForceReload', ['$location', '$route', itcForceReload]);
})();