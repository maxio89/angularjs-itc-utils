(function ()
{
    'use strict';

    function itcStopEventPropagation()
    {
        return {
            restrict: 'A',
            link: function (scope, element, attr)
            {
                element.bind(attr.itcStopEventPropagation, function (e)
                {
                    e.stopPropagation();
                });
            }
        };
    }

    angular.module('pl.itcrowd.directives').directive('itcStopEventPropagation', itcStopEventPropagation);
})();
