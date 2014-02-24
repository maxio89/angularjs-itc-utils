(function ()
{
    'use strict';

    function itcHeadTitle()
    {
        return {
            restrict: 'E',
            scope: {
                value: '@'
            },
            link: function (scope)
            {
                scope.$watch('value', function ()
                {
                    var title = jQuery('head title');
                    if (0 === title.size()) {
                        title = jQuery('<title></title>');
                        jQuery('head').append(title);
                    }
                    title.html(scope.value);
                });
            }
        };
    }

    angular.module('pl.itcrowd.directives').directive('itcHeadTitle', itcHeadTitle);
})();
