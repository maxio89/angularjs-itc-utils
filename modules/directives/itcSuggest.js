(function ()
{
    'use strict';

    function itcSuggest($timeout)
    {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, iElement, iAttrs)
            {
                //noinspection JSUnresolvedVariable,JSValidateTypes
                iElement.autocomplete({
                    source: scope[iAttrs.itcSuggest],
                    select: function (event, ui)
                    {
                        $timeout(function ()
                        {
                            iElement.val('');
                            //noinspection JSUnresolvedVariable
                            var suggestSelect = scope[iAttrs.suggestSelect];
                            if (suggestSelect instanceof Function) {
                                suggestSelect(ui.item);
                            } else if (null != iAttrs.suggestSelect) {
                                //noinspection JSUnresolvedVariable
                                throw new Error('Method ' + iAttrs.suggestSelect + ' not found in scope');
                            }
                        }, 0);
                        return false;
                    }
                });
            }
        };
    }

    //noinspection JSValidateTypes
    angular.module('restbase.directives').directive('itcSuggest', ['$timeout', itcSuggest]);
})();
