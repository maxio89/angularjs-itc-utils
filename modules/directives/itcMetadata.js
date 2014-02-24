(function ()
{
    'use strict';

    function itcMetadata()
    {
        return {
            restrict: 'E',
            scope: {
                name: '@',
                content: '@'
            },
            link: function (scope)
            {
                scope.$watch('content', function ()
                {
                    var meta = jQuery('meta[name=' + scope.name + ']');
                    if (0 === meta.size()) {
                        meta = jQuery('<meta name="' + scope.name + '">');
                        jQuery('head').append(meta);
                    }
                    meta.attr('content', scope.content);
                });

            }
        };
    }

    angular.module('pl.itcrowd.directives').directive('itcMetadata', itcMetadata);
})();
