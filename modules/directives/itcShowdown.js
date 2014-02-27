(function ()
{
    'use strict';

    function itcShowdown($showdown)
    {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, iElement, attrs)
            {
                //noinspection JSUnresolvedVariable
                var content = attrs.itcShowdown;
                if (null == content || content.length < 1) {
                    content = iElement.html();
                    iElement.html($showdown.makeHtml(content));
                } else {
                    scope.$watch(content, function (newValue)
                    {
                        if (null != newValue) {
                            iElement.html($showdown.makeHtml(newValue));
                        } else {
                            iElement.html('');
                        }
                    }, true);
                }
            }
        };
    }

    //noinspection JSValidateTypes
    angular.module('pl.itcrowd.directives').directive('itcShowdown', ['$showdown', itcShowdown]);
})();
