(function ()
{
    'use strict';

    function itcClearFileupload()
    {
        return {
            restrict: 'A',
            link: function (scope, elem)
            {
                elem.bind('click', function ()
                {
                    $(':file').val('');
                });
            }
        };
    }

    angular.module('pl.itcrowd.directives').directive('itcClearFileupload', itcClearFileupload);
})();
