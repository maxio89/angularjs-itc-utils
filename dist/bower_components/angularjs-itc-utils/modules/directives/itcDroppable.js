(function ()
{
    'use strict';

    function itcDroppable()
    {
        return {
            restrict: 'C',
            transclude: false,
            scope: false,
            link: function (scope, elm)
            {
                elm.droppable({
                    drop: function (event, ui)
                    {
                        var draggable = angular.element(ui.draggable).scope();
                        if (scope.onBeforeDrop(draggable) !== false) {
                            scope.onDrop(draggable);
                        }
                    }
                });
                scope.$on('$destroy', function ()
                {
                    try {
                        elm.droppable('destroy');
                    } catch (e) {
                    }
                });
            },
            replace: false
        };
    }

    angular.module('pl.itcrowd.directives').directive('itcDroppable', itcDroppable);
})();
