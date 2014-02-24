(function ()
{
    'use strict';

    function itcConfirmation()
    {
        return {
            priority: 100,
            restrict: 'A',
            link: {
                pre: function (scope, element, attrs)
                {
                    element.bind('click touchstart', function (e)
                    {
                        //noinspection JSUnresolvedVariable
                        var message = attrs.itcConfirmation || 'Are you sure?';
                        if (message && !window.confirm(message)) {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                        }
                    });
                }
            }
        };
    }

    angular.module('pl.itcrowd.directives').directive('itcConfirmation', itcConfirmation);
})();
