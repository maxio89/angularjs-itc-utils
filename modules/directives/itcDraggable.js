(function ()
{
    'use strict';

    function itcDraggable()
    {
        return {
            restrict: 'C',
            transclude: false,
            scope: false,
            link: function (scope, elm)
            {
                elm.draggable({
                    revert: true
                });
                scope.$on('$destroy', function ()
                {
                    try {
                        elm.draggable('destroy');
                    } catch (e) {
                    }
                });
            },
            replace: false
        };
    }

    angular.module('pl.itcrowd.directives').directive('itcDraggable', itcDraggable);
})();
